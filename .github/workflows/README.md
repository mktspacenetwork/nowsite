# Deploy automático via GitHub Actions

Este workflow (`deploy.yml`) faz **build e deploy automático** do site para o servidor de produção sempre que houver um push na branch `main` (ou execução manual via "Run workflow").

## Como funciona

1. O runner do GitHub faz checkout do repositório.
2. Instala dependências e executa `npm run build`.
3. Envia o conteúdo de `dist/` para o servidor via `rsync` sobre SSH (com `--delete`, ou seja, arquivos antigos são removidos do destino).
4. No servidor: ajusta permissões (`www-data:www-data`, `755`) e recarrega o nginx.

## Secrets necessários

Cadastre em **Settings → Secrets and variables → Actions → New repository secret**:

| Secret              | Valor                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| `SSH_HOST`          | Hostname público (DNS) ou IP do servidor de produção (ex.: `deploy.seudominio.com.br`)                  |
| `SSH_PORT`          | Porta SSH do servidor (no servidor atual: `6422`)                                                       |
| `SSH_USER`          | Usuário SSH com permissão de escrever em `/var/www/nowsite` e recarregar nginx (atualmente `root`)      |
| `SSH_PRIVATE_KEY`   | Conteúdo da chave **privada** Ed25519 gerada no servidor (`~/.ssh/github_actions_deploy`)               |
| `SSH_KNOWN_HOSTS`   | Saída de `ssh-keyscan -p <PORT> -H <SSH_HOST>` executado em uma máquina confiável                       |
| `DEPLOY_PATH`       | Caminho de destino no servidor: `/var/www/nowsite`                                                       |

## Como obter cada secret

### 1. `SSH_HOST` e `SSH_PORT`
Use o hostname/IP **público** do servidor e a porta em que o `sshd` está exposto (ver `/etc/ssh/sshd_config`). Neste servidor o SSH escuta em `0.0.0.0:6422`. Se o servidor está atrás de NAT/Cloudflare, garanta que essa porta esteja acessível pela internet (ou exponha via outro mecanismo, ex. Cloudflare Tunnel + Access).

### 2. `SSH_USER`
Usuário com permissão para escrever em `/var/www/nowsite`, fazer `chown www-data` e `systemctl reload nginx`. Para simplificar, usamos `root`; recomenda-se criar um usuário dedicado com `sudo` sem senha para esses comandos específicos em produção.

### 3. `SSH_PRIVATE_KEY`
Foi gerada uma chave dedicada em `~/.ssh/github_actions_deploy` (Ed25519). Copie o **conteúdo inteiro** do arquivo (incluindo as linhas `-----BEGIN ...-----` e `-----END ...-----`) e cole no secret:

```bash
cat ~/.ssh/github_actions_deploy
```

A chave pública já foi adicionada ao `~/.ssh/authorized_keys` do `root` no servidor.

### 4. `SSH_KNOWN_HOSTS`
Gere assim (substitua host e porta):

```bash
ssh-keyscan -p 6422 -H <SSH_HOST_PUBLICO> 2>/dev/null
```

Cole **todas as linhas retornadas** no secret. Isso evita avisos de "host fingerprint" e protege contra MITM.

### 5. `DEPLOY_PATH`
Caminho absoluto no servidor onde o nginx serve os arquivos. Neste projeto: `/var/www/nowsite`.

## Disparando o workflow manualmente

Após o push, vá em **Actions → Deploy to Production → Run workflow** para forçar um deploy sem precisar de novo commit.

## Substituindo o `deploy.sh`

O script `deploy.sh` continua válido para execução manual no servidor, mas a partir da configuração deste workflow ele deixa de ser necessário no fluxo normal — todo push para `main` já dispara o deploy.
