const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Confiar no proxy do Nginx
app.set('trust proxy', 1);

// Segurança
app.use(helmet());
app.use(cors({
  origin: [
    'http://10.70.60.10', 
    'http://localhost:5173',
    'https://nowsolucoes.com.br',
    'https://www.nowsolucoes.com.br',
    'http://nowsolucoes.com.br',
    'http://www.nowsolucoes.com.br'
  ],
  methods: ['POST', 'GET'],
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));

// Rate limiting - máximo 5 envios por IP a cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 requisições
  message: { error: 'Muitas requisições. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Configurar transporter MailGrid
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true para porta 465, false para 587/25
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2'
  }
});

// Validar configuração ao iniciar
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erro na configuração SMTP:', error);
  } else {
    console.log('✅ Servidor SMTP pronto para enviar emails');
  }
});

// Função de validação
const validateFormData = (data) => {
  const errors = [];
  
  if (!data.nome || data.nome.trim().length < 3) {
    errors.push('Nome deve ter pelo menos 3 caracteres');
  }
  
  if (data.nome && data.nome.length > 100) {
    errors.push('Nome muito longo');
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Email inválido');
  }
  
  if (data.email && data.email.length > 254) {
    errors.push('Email muito longo');
  }
  
  const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  if (!data.telefone || !telefoneRegex.test(data.telefone)) {
    errors.push('Telefone inválido. Use o formato: (11) 98765-4321');
  }
  
  if (!data.mensagem || data.mensagem.trim().length < 10) {
    errors.push('Mensagem deve ter pelo menos 10 caracteres');
  }
  
  if (data.mensagem && data.mensagem.length > 5000) {
    errors.push('Mensagem muito longa');
  }
  
  return errors;
};

// Sanitizar dados (remover HTML/scripts)
const sanitize = (text) => {
  if (!text) return '';
  return text
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

// Endpoint de contato
app.post('/api/contato', limiter, async (req, res) => {
  try {
    const { nome, email, telefone, mensagem } = req.body;
    
    // Validar dados
    const errors = validateFormData(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }
    
    // Sanitizar dados
    const sanitizedData = {
      nome: sanitize(nome),
      email: sanitize(email),
      telefone: sanitize(telefone),
      mensagem: sanitize(mensagem)
    };
    
    // Configurar email
    const mailOptions = {
      from: `"${sanitizedData.nome}" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_TO,
      replyTo: sanitizedData.email,
      subject: `[Site NOW] Novo contato de ${sanitizedData.nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #3979aa; border-bottom: 2px solid #3979aa; padding-bottom: 10px;">
            Novo Contato - Site NOW Soluções
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Nome:</strong> ${sanitizedData.nome}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
            <p style="margin: 10px 0;"><strong>Telefone:</strong> ${sanitizedData.telefone}</p>
          </div>
          
          <div style="background-color: #f6f7f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Mensagem:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap;">${sanitizedData.mensagem}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
            <p>Email enviado automaticamente pelo site NOW Soluções</p>
            <p>Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
            <p>IP: ${req.ip || req.connection.remoteAddress}</p>
          </div>
        </div>
      `,
      text: `
Novo Contato - Site NOW Soluções

Nome: ${sanitizedData.nome}
Email: ${sanitizedData.email}
Telefone: ${sanitizedData.telefone}

Mensagem:
${sanitizedData.mensagem}

---
Email enviado automaticamente pelo site NOW Soluções
Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
IP: ${req.ip || req.connection.remoteAddress}
      `
    };
    
    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado:', {
      messageId: info.messageId,
      nome: sanitizedData.nome,
      email: sanitizedData.email,
      timestamp: new Date().toISOString()
    });
    
    res.json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso!' 
    });
    
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    res.status(500).json({ 
      error: 'Erro ao enviar mensagem. Tente novamente.' 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Backend rodando em http://127.0.0.1:${PORT}`);
  console.log(`📧 Emails serão enviados via ${process.env.SMTP_HOST}`);
  console.log(`📬 Destino: ${process.env.EMAIL_TO}`);
});
