# Guia de Manutenção - NOW Soluções

## 🚀 Deploy Rápido

Para atualizar o site em produção após fazer alterações:

```bash
bash /root/nowsite/deploy.sh
```

Este script:
1. Compila o projeto React com Vite
2. Remove arquivos antigos de produção
3. Copia novos arquivos para /var/www/nowsite
4. Ajusta permissões
5. Recarrega o Nginx

---

## 📊 Monitoramento

### Ver Logs em Tempo Real

```bash
# Acessos ao site
tail -f /var/log/nginx/access.log

# Erros do Nginx
tail -f /var/log/nginx/error.log

# Atividade do Fail2ban
tail -f /var/log/fail2ban.log
```

### Verificar IPs Banidos

```bash
# Status geral do Fail2ban
fail2ban-client status

# Detalhes do jail nginx
fail2ban-client status nginx-limit-req

# Ver lista de IPs banidos
fail2ban-client get nginx-limit-req banned
```

### Desbanir um IP

```bash
fail2ban-client set nginx-limit-req unbanip 192.168.1.100
```

---

## 🔧 Nginx

### Testar Configuração

Sempre teste antes de recarregar:

```bash
nginx -t
```

### Recarregar Configuração

Após editar `/etc/nginx/sites-available/nowsite`:

```bash
systemctl reload nginx
```

### Reiniciar Nginx

Apenas se necessário:

```bash
systemctl restart nginx
```

### Ver Status

```bash
systemctl status nginx
```

---

## 🛡️ Fail2ban

### Reiniciar Fail2ban

```bash
systemctl restart fail2ban
```

### Ver Status

```bash
systemctl status fail2ban
```

### Configuração

Editar: `/etc/fail2ban/jail.local`

Após editar, reinicie o serviço.

---

## 🔐 Segurança

### Verificar Headers HTTP

```bash
curl -I http://10.70.60.10
```

Deve mostrar:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy
- Content-Security-Policy

### Testar Rate Limiting

```bash
# Fazer múltiplas requisições rapidamente
for i in {1..30}; do curl -I http://10.70.60.10; done
```

Após 20 requisições, você deve receber erro 503.

---

## 📝 Desenvolvimento

### Instalar Dependências

```bash
cd /root/nowsite
npm install
```

### Rodar em Desenvolvimento

```bash
npm run dev
```

Site ficará disponível em http://localhost:5173

### Build de Produção

```bash
npm run build
```

Arquivos gerados em `/root/nowsite/dist/`

---

## 🌐 HTTPS (Quando tiver domínio)

### 1. Instalar Certbot

```bash
apt update
apt install certbot python3-certbot-nginx
```

### 2. Obter Certificado SSL

Substitua `seu-dominio.com`:

```bash
certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

### 3. Renovação Automática

O Certbot configura automaticamente. Testar:

```bash
certbot renew --dry-run
```

### 4. Verificar Certificados

```bash
certbot certificates
```

---

## 📂 Estrutura de Diretórios

```
/root/nowsite/              # Código fonte
├── components/             # Componentes React
├── hooks/                  # Hooks customizados
├── public/                 # Assets públicos
│   └── images/             # Imagens do site
├── dist/                   # Build de produção (gerado)
├── deploy.sh               # Script de deploy
├── SECURITY-REPORT.md      # Relatório de segurança
└── nginx-ssl-config.txt    # Config SSL de referência

/var/www/nowsite/           # Site em produção
├── index.html
├── assets/
│   ├── index-*.js
│   └── index-*.css
└── images/

/etc/nginx/
├── nginx.conf              # Configuração principal
└── sites-available/
    └── nowsite             # Config do site

/etc/fail2ban/
├── jail.local              # Configuração customizada
└── jail.d/
    └── custom.local        # Desabilitar jails não usados
```

---

## 🆘 Solução de Problemas

### Site não carrega

```bash
# Verificar se Nginx está rodando
systemctl status nginx

# Ver logs de erro
tail -f /var/log/nginx/error.log

# Testar configuração
nginx -t

# Reiniciar se necessário
systemctl restart nginx
```

### Imagens não aparecem

```bash
# Verificar permissões
ls -la /var/www/nowsite/images/

# Corrigir permissões
chown -R www-data:www-data /var/www/nowsite
chmod -R 755 /var/www/nowsite
```

### Formulário de contato não funciona

1. Verificar console do navegador (F12)
2. Ver se há erros de CSP
3. Confirmar que Formspree está acessível
4. Verificar logs do Nginx

### Erro 503 (Service Unavailable)

Provavelmente rate limiting ativo:

```bash
# Ver se IP foi banido
fail2ban-client status nginx-limit-req

# Desbanir se necessário
fail2ban-client set nginx-limit-req unbanip SEU_IP
```

### Fail2ban não inicia

```bash
# Ver erro específico
journalctl -xeu fail2ban.service

# Testar configuração
fail2ban-client -vvv start

# Verificar se logs existem
ls -la /var/log/nginx/
```

---

## 📦 Backup

### Backup Manual

```bash
# Criar backup do código e configurações
tar -czf nowsite-backup-$(date +%Y%m%d).tar.gz \
  /root/nowsite \
  /etc/nginx/sites-available/nowsite \
  /etc/fail2ban/jail.local \
  /var/www/nowsite

# Mover para local seguro
mv nowsite-backup-*.tar.gz /root/backups/
```

### Restaurar Backup

```bash
tar -xzf nowsite-backup-YYYYMMDD.tar.gz -C /
systemctl reload nginx
systemctl restart fail2ban
```

---

## 📈 Performance

### Ver Tamanho dos Arquivos

```bash
ls -lh /var/www/nowsite/assets/
```

### Testar Compressão Gzip

```bash
curl -H "Accept-Encoding: gzip" -I http://10.70.60.10/assets/index-*.js
```

Deve mostrar `Content-Encoding: gzip`

### Cache do Navegador

Arquivos estáticos têm cache de 1 ano:

```bash
curl -I http://10.70.60.10/assets/index-*.js | grep Cache-Control
```

Deve mostrar: `Cache-Control: public, immutable`

---

## 🔄 Atualizações

### Atualizar Node.js

```bash
# Versão atual
node --version

# Atualizar via NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs
```

### Atualizar Dependências do Projeto

```bash
cd /root/nowsite
npm update
npm audit fix
```

### Atualizar Sistema

```bash
apt update
apt upgrade -y
```

---

## 📞 Suporte

**Email**: contato@nowsolucoes.com.br  
**Telefone**: (11) 5283-5040  
**Endereço**: Rua Antônio Nápoli, 229 - São Paulo/SP

---

## 📚 Recursos Úteis

- [Documentação Nginx](https://nginx.org/en/docs/)
- [Fail2ban Wiki](https://github.com/fail2ban/fail2ban/wiki)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Let's Encrypt](https://letsencrypt.org/)
- [OWASP Security Practices](https://owasp.org/)

---

**Última atualização**: 13/11/2025
