# Backend NOW Soluções - Formulário de Contato

## 📧 Sistema de Envio de Emails

Backend Node.js seguro integrado com **MailGrid** para processamento do formulário de contato do site.

---

## 🔐 Segurança Implementada

### 1. **Rate Limiting**
- Máximo 5 envios por IP a cada 15 minutos
- Proteção contra spam e abuse

### 2. **Validação Server-Side**
- Nome: 3-100 caracteres, apenas letras
- Email: formato válido, máx 254 caracteres  
- Telefone: formato brasileiro (XX) XXXXX-XXXX
- Mensagem: 10-5000 caracteres

### 3. **Sanitização de Dados**
- Remoção de HTML/scripts maliciosos
- Proteção contra XSS e SQL Injection

### 4. **Headers de Segurança**
- Helmet.js para proteção de cabeçalhos HTTP
- CORS restrito ao domínio do site
- Limite de tamanho de requisição (1MB)

### 5. **Proxy Reverso Nginx**
- Requisições `/api/*` são proxiadas para backend
- Rate limiting adicional no Nginx
- Logs de todas as requisições

---

## ⚙️ Configuração

### Arquivo `.env`

```env
SMTP_HOST=grid145.mailgrid.com.br
SMTP_PORT=587
SMTP_USER=smtp1@spacenetwork.com.br
SMTP_PASS=dm37r7jt4m5ng
EMAIL_FROM=smtp1@spacenetwork.com.br
EMAIL_TO=contato@nowsolucoes.com.br
PORT=3001
NODE_ENV=production
```

**⚠️ IMPORTANTE**: Nunca commitar o arquivo `.env` no Git!

---

## 🚀 Comandos PM2

### Ver Status
```bash
pm2 status
pm2 list
```

### Ver Logs
```bash
pm2 logs nowsite-backend
pm2 logs nowsite-backend --lines 50
pm2 logs nowsite-backend --err  # Apenas erros
```

### Controlar Processo
```bash
pm2 restart nowsite-backend
pm2 stop nowsite-backend
pm2 start nowsite-backend
pm2 reload nowsite-backend  # Zero-downtime restart
```

### Monitoramento
```bash
pm2 monit  # Dashboard interativo
pm2 show nowsite-backend  # Detalhes do processo
```

### Salvar Estado
```bash
pm2 save  # Salvar lista de processos
pm2 resurrect  # Restaurar processos salvos
```

---

## 🧪 Testes

### 1. Health Check
```bash
curl http://10.70.60.10/api/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2025-11-14T12:00:00.000Z",
  "uptime": 123.456
}
```

### 2. Teste de Envio
```bash
curl -X POST http://10.70.60.10/api/contato \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "teste@example.com",
    "telefone": "(11) 98765-4321",
    "mensagem": "Mensagem de teste"
  }'
```

Resposta de sucesso:
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!"
}
```

Resposta de erro (validação):
```json
{
  "error": "Nome deve ter pelo menos 3 caracteres"
}
```

### 3. Teste de Rate Limiting
```bash
# Fazer 6 requisições rapidamente
for i in {1..6}; do
  curl -X POST http://10.70.60.10/api/contato \
    -H "Content-Type: application/json" \
    -d '{"nome":"Test","email":"test@test.com","telefone":"(11) 99999-9999","mensagem":"Test message"}';
done
```

A 6ª requisição deve retornar:
```json
{
  "error": "Muitas requisições. Tente novamente em 15 minutos."
}
```

---

## 📊 Monitoramento de Emails

### Ver Logs de Envio
```bash
pm2 logs nowsite-backend | grep "Email enviado"
```

### Estatísticas do MailGrid
- Limite: **1500 emails/hora**
- Velocidade: **14 emails/segundo**
- Acesse o painel do MailGrid para estatísticas detalhadas

---

## 🔧 Manutenção

### Atualizar Dependências
```bash
cd /root/nowsite/backend
npm update
pm2 restart nowsite-backend
```

### Verificar Vulnerabilidades
```bash
npm audit
npm audit fix
```

### Rotação de Logs
Os logs do PM2 ficam em:
- `/root/nowsite/backend/logs/out.log`
- `/root/nowsite/backend/logs/err.log`

Para limpar logs antigos:
```bash
pm2 flush  # Limpa todos os logs
```

### Backup do `.env`
```bash
cp /root/nowsite/backend/.env /root/nowsite/backend/.env.backup
```

---

## 🐛 Troubleshooting

### Backend não inicia
```bash
# Ver erros
pm2 logs nowsite-backend --err

# Testar manualmente
cd /root/nowsite/backend
node server.js
```

### Emails não chegam
1. Verificar credenciais SMTP no `.env`
2. Ver logs: `pm2 logs nowsite-backend`
3. Testar conexão SMTP:
```bash
telnet grid145.mailgrid.com.br 587
```

### Rate Limiting muito restritivo
Editar `/root/nowsite/backend/server.js`:
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,  // Aumentar limite
  // ...
});
```

Reiniciar: `pm2 restart nowsite-backend`

### Proxy Nginx não funciona
```bash
# Testar nginx
nginx -t

# Ver logs do nginx
tail -f /var/log/nginx/error.log

# Testar backend direto
curl http://127.0.0.1:3001/api/health
```

---

## 📈 Performance

### Recursos do Backend
- **Memória**: ~30-50 MB
- **CPU**: <5% em idle
- **Porta**: 3001 (interno)
- **Modo**: Single process (suficiente para o volume)

### Escalabilidade
Se precisar escalar no futuro:
```javascript
// ecosystem.config.js
{
  instances: 2,  // Múltiplas instâncias
  exec_mode: 'cluster',  // Modo cluster
}
```

---

## 🔄 Deploy Automático

### Opção 1: Script Manual
```bash
cd /root/nowsite/backend
git pull origin main
npm install
pm2 restart nowsite-backend
```

### Opção 2: GitHub Actions
Criar `.github/workflows/deploy.yml` para deploy automático no push.

---

## 📞 Suporte

**Email**: contato@nowsolucoes.com.br  
**Telefone**: (11) 5283-5040

---

## 📝 Changelog

### v1.0.0 - 2025-11-14
- ✅ Integração com MailGrid
- ✅ Rate limiting (5 req/15min)
- ✅ Validação server-side completa
- ✅ Sanitização de dados
- ✅ PM2 com auto-restart
- ✅ Proxy reverso Nginx
- ✅ Logs estruturados
- ✅ Máscara de telefone no frontend

---

**Última atualização**: 14/11/2025  
**Versão**: 1.0.0  
**Status**: ✅ Produção
