# Relatório de Segurança - NOW Soluções

## Resumo Executivo

Este documento descreve todas as medidas de segurança implementadas no site da NOW Soluções para garantir uma aplicação web segura e protegida contra ameaças comuns.

---

## 1. Segurança do Nginx

### 1.1 Headers de Segurança Implementados

✅ **X-Frame-Options**: SAMEORIGIN
- Previne clickjacking ao bloquear incorporação do site em iframes de outros domínios

✅ **X-Content-Type-Options**: nosniff
- Previne MIME-sniffing, forçando o navegador a respeitar o Content-Type declarado

✅ **X-XSS-Protection**: 1; mode=block
- Ativa proteção XSS do navegador

✅ **Referrer-Policy**: strict-origin-when-cross-origin
- Controla informações de referência enviadas para outros sites

✅ **Permissions-Policy**: geolocation=(), microphone=(), camera=()
- Desabilita acesso a recursos sensíveis (geolocalização, microfone, câmera)

✅ **Content-Security-Policy (CSP)**
- Define fontes confiáveis para scripts, estilos, imagens e conexões
- Bloqueia execução de scripts inline não autorizados
- Política configurada: 
  - Scripts: apenas do próprio site e serviços necessários (Formspree, Google Maps)
  - Estilos: próprio site + Google Fonts
  - Imagens: próprio site + HTTPS em geral
  - Formulários: apenas para próprio site e Formspree

### 1.2 Ocultação de Informações do Servidor

✅ **server_tokens off**
- Esconde a versão do Nginx em headers e páginas de erro

### 1.3 Rate Limiting (Limitação de Taxa)

✅ **Zonas de Rate Limiting Configuradas**
- Zona geral: 10 requisições/segundo por IP
- Burst de 20 requisições permitido
- Proteção contra:
  - Ataques DDoS
  - Brute force
  - Web scraping agressivo
  - Bots maliciosos

### 1.4 Proteção de Arquivos Sensíveis

✅ **Bloqueio de arquivos ocultos** (.git, .env, .htaccess)
✅ **Bloqueio de arquivos de configuração** (package.json, tsconfig.json)
✅ **Bloqueio de paths comuns de scanners** (wp-admin, phpmyadmin, xmlrpc.php)
- Retorna código 444 (conexão fechada sem resposta) para dificultar enumeração

### 1.5 Compressão Gzip

✅ **Gzip habilitado** para texto, CSS, JavaScript, JSON
- Reduz tamanho de transferência em ~70%
- Melhora performance sem comprometer segurança

### 1.6 Cache de Assets Estáticos

✅ **Cache de 1 ano** para arquivos estáticos (JS, CSS, imagens, fonts)
- Melhora performance
- Headers de segurança também aplicados em assets

---

## 2. Segurança da Aplicação

### 2.1 Sanitização de Inputs

✅ **DOMPurify instalado e configurado**
- Biblioteca: dompurify v3.x + @types/dompurify
- Aplicado no formulário de contato (Contato.tsx)
- Remove todos os tags HTML dos inputs do usuário
- Previne ataques XSS (Cross-Site Scripting)

### 2.2 Validação de Formulários

✅ **Validação em tempo real e no submit**

**Campo Nome:**
- Mínimo: 2 caracteres
- Máximo: 100 caracteres
- Caracteres permitidos: letras (incluindo acentos), espaços, apóstrofos, hífens
- Regex: /^[a-zA-ZÀ-ÿ\s'-]+$/

**Campo Email:**
- Formato válido de email (regex)
- Máximo: 254 caracteres (limite RFC 5321)

**Campo Assunto:**
- Mínimo: 3 caracteres
- Máximo: 200 caracteres

**Campo Mensagem:**
- Mínimo: 10 caracteres
- Máximo: 5000 caracteres

✅ **Atributos HTML maxLength** aplicados em todos os inputs
✅ **Feedback visual** de erros de validação ao usuário
✅ **Prevenção de submit** com dados inválidos

### 2.3 Hospedagem Local de Assets

✅ **Todas as imagens servidas localmente**
- Anteriormente: ibb.co (externo, não confiável)
- Atual: /var/www/nowsite/images/ (controle total)
- Benefícios:
  - Eliminação de dependências externas
  - Sem rastreamento de terceiros
  - Performance melhorada
  - Maior disponibilidade

---

## 3. Fail2ban - Proteção Ativa

### 3.1 Instalação e Configuração

✅ **Fail2ban 1.0.2 instalado**
- Monitora logs do Nginx em tempo real
- Bane automaticamente IPs com comportamento suspeito

### 3.2 Jail Ativo: nginx-limit-req

**Parâmetros:**
- **maxretry**: 3 tentativas
- **findtime**: 60 segundos
- **bantime**: 600 segundos (10 minutos)
- **logpath**: /var/log/nginx/error.log

**Proteção contra:**
- Excesso de requisições (rate limiting violations)
- Tentativas de bypass de limitações
- Comportamento anômalo de bots

### 3.3 Status

```bash
# Verificar status do Fail2ban
fail2ban-client status

# Ver detalhes do jail nginx
fail2ban-client status nginx-limit-req

# Ver IPs banidos atualmente
fail2ban-client get nginx-limit-req banned
```

---

## 4. Preparação para HTTPS/SSL

### 4.1 Documentação Criada

✅ **Arquivo**: /root/nowsite/nginx-ssl-config.txt
- Configuração completa de SSL/TLS
- Instruções de instalação do Certbot (Let's Encrypt)
- Configuração de redirect HTTP → HTTPS
- Headers HSTS (HTTP Strict Transport Security)
- OCSP Stapling
- Protocolos modernos: TLS 1.2 e 1.3
- Ciphers seguros

### 4.2 Passos para Ativar HTTPS (quando tiver domínio)

```bash
# 1. Instalar Certbot
apt update
apt install certbot python3-certbot-nginx

# 2. Obter certificado (substituir domínio)
certbot --nginx -d seu-dominio.com -d www.seu-dominio.com

# 3. Certbot configura automaticamente o Nginx
# 4. Renovação automática já configurada

# 5. Testar renovação
certbot renew --dry-run
```

---

## 5. Arquivos de Configuração Principais

### 5.1 Nginx

**Localização**: /etc/nginx/sites-available/nowsite
**Características**:
- Rate limiting zones
- Security headers completos
- CSP configurado
- Proteção de arquivos sensíveis
- Bloqueio de scanners

### 5.2 Fail2ban

**Localização**: /etc/fail2ban/jail.local
**Características**:
- Configuração customizada
- Jail nginx-limit-req ativo
- Tempos de ban e janelas configurados

**Desabilitado**: /etc/fail2ban/jail.d/custom.local
- SSH jail desabilitado (sem arquivo de log)

---

## 6. Script de Deploy Atualizado

**Localização**: /root/nowsite/deploy.sh

```bash
#!/bin/bash
cd /root/nowsite
npm run build
rm -rf /var/www/nowsite/*
cp -r dist/* /var/www/nowsite/
chown -R www-data:www-data /var/www/nowsite
systemctl reload nginx
echo "Deploy concluído com sucesso!"
```

**Uso**: `bash /root/nowsite/deploy.sh`

---

## 7. Checklist de Segurança

### ✅ Implementado

- [x] Headers de segurança HTTP (CSP, X-Frame-Options, etc.)
- [x] Rate limiting no Nginx
- [x] Sanitização de inputs com DOMPurify
- [x] Validação de formulários (cliente)
- [x] Proteção de arquivos sensíveis
- [x] Fail2ban configurado e ativo
- [x] Ocultação de versão do servidor
- [x] Bloqueio de scanners de vulnerabilidades
- [x] Hospedagem local de assets
- [x] Configuração SSL/TLS preparada

### ⏳ Recomendações Futuras

- [ ] Implementar HTTPS com Let's Encrypt (requer domínio)
- [ ] Configurar HSTS preload
- [ ] Implementar validação server-side no backend do Formspree
- [ ] Adicionar CAPTCHA ao formulário (se houver spam)
- [ ] Configurar logs de auditoria centralizados
- [ ] Implementar Web Application Firewall (WAF) como Cloudflare
- [ ] Realizar pentesting profissional
- [ ] Configurar backup automático
- [ ] Monitoramento de disponibilidade (uptime monitoring)
- [ ] Implementar CORS policy específica (se adicionar API)

---

## 8. Monitoramento e Manutenção

### 8.1 Logs para Monitorar

```bash
# Logs do Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Logs do Fail2ban
tail -f /var/log/fail2ban.log

# Status do Fail2ban
fail2ban-client status nginx-limit-req
```

### 8.2 Comandos Úteis

```bash
# Recarregar configuração do Nginx
systemctl reload nginx

# Testar configuração do Nginx
nginx -t

# Ver IPs banidos
fail2ban-client status nginx-limit-req

# Desbanir IP manualmente
fail2ban-client set nginx-limit-req unbanip <IP>

# Verificar headers de segurança
curl -I http://10.70.60.10
```

---

## 9. Resumo de Tecnologias de Segurança

| Camada | Tecnologia | Função |
|--------|-----------|--------|
| Servidor Web | Nginx 1.22.1 | Proxy reverso + security headers |
| Rate Limiting | Nginx limit_req | Proteção contra DDoS/brute force |
| Firewall Aplicação | Fail2ban 1.0.2 | Bloqueio automático de IPs maliciosos |
| Sanitização | DOMPurify 3.x | Limpeza de inputs XSS |
| Validação | Custom React | Validação client-side robusta |
| Headers | CSP + 5 outros | Proteção contra XSS, clickjacking, etc. |
| Assets | Local hosting | Eliminação de dependências externas |
| Preparação TLS | Certbot ready | Pronto para HTTPS com Let's Encrypt |

---

## 10. Contato para Suporte

Em caso de incidentes de segurança ou dúvidas:
- Email: contato@nowsolucoes.com.br
- Telefone: (11) 5283-5040
- Endereço: Rua Antônio Nápoli, 229 - São Paulo/SP

---

**Documento gerado em**: 13/11/2025
**Versão**: 1.0
**Status**: ✅ Todas as medidas implementadas e ativas
