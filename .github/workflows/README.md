# Deploy automático via GitHub Actions (self-hosted runner)

Este workflow (`deploy.yml`) faz **build e deploy automático** do site sempre que houver um push na branch `main` (ou execução manual via "Run workflow"). Ele roda em um **self-hosted runner** instalado no próprio servidor de produção, então:

- **Não exige portas abertas** no servidor (o runner só faz conexões de saída para o GitHub).
- **Não exige Secrets** de SSH/chaves.
- **Build acontece no próprio servidor**, com acesso direto a `/var/www/nowsite` e ao `systemctl`.

## Como funciona

1. Push na `main` → GitHub agenda o job → o runner local pega o job.
2. `actions/checkout@v4` clona o repo em `/opt/actions-runner/_work/nowsite/nowsite`.
3. `actions/setup-node@v4` provisiona o Node.js 20 (com cache de `npm`).
4. `npm ci` e `npm run build`.
5. `rsync -a --delete dist/ /var/www/nowsite/`, ajusta `chown www-data:www-data` e `chmod 755`.
6. `nginx -t && systemctl reload nginx`.

## Onde o runner está instalado

- **Diretório**: `/opt/actions-runner`
- **Serviço systemd**: `actions.runner.mktspacenetwork-nowsite.nowsite-prod.service`
- **Nome no GitHub**: `nowsite-prod` (labels: `self-hosted`, `linux`, `x64`, `nowsite-prod`)

### Comandos úteis para administrar o runner

```bash
# Status do serviço
systemctl status actions.runner.mktspacenetwork-nowsite.nowsite-prod.service

# Reiniciar o runner
systemctl restart actions.runner.mktspacenetwork-nowsite.nowsite-prod.service

# Ver logs em tempo real
journalctl -u actions.runner.mktspacenetwork-nowsite.nowsite-prod.service -f

# Logs do runner (worker)
ls /opt/actions-runner/_diag/
```

### Reinstalar / remover o runner

Para desregistrar e remover (rodando como `root`):

```bash
cd /opt/actions-runner
./svc.sh stop
./svc.sh uninstall
# Gere um remove-token em: Settings > Actions > Runners > nowsite-prod > ... > Remove
RUNNER_ALLOW_RUNASROOT=1 ./config.sh remove --token <REMOVE_TOKEN>
```

## Disparando o workflow manualmente

Vá em **Actions → Deploy to Production → Run workflow** para forçar um deploy sem precisar de um novo commit.

## Substituindo o `deploy.sh`

O script `deploy.sh` continua válido para deploy manual no servidor, mas a partir desta automação ele não é mais necessário no fluxo normal — todo push para `main` já dispara o deploy.

## Segurança

- **Não habilite este runner para receber jobs de pull requests externos** (forks). Self-hosted runners executam código arbitrário com privilégios de root neste servidor. Mantenha o repositório privado e/ou desative builds de PRs vindos de forks.
- O runner está configurado para rodar como `root` (`RUNNER_ALLOW_RUNASROOT=1`) porque o deploy precisa escrever em `/var/www`, fazer `chown www-data` e `systemctl reload nginx`. Em ambientes mais sensíveis, considere criar um usuário dedicado com `sudoers` restrito a esses comandos.
