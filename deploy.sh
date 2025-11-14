#!/bin/bash
# Script de deploy para Now Soluções

set -e

echo "🚀 Iniciando deploy do Now Soluções..."

# Navegar para o diretório do projeto
cd /root/nowsite

# Instalar dependências (incluindo Tailwind CSS)
echo "📦 Instalando dependências..."
npm install

# Fazer build do projeto
echo "🔨 Fazendo build do projeto..."
npm run build

# Copiar arquivos para o diretório do nginx
echo "📁 Copiando arquivos para /var/www/nowsite..."
rm -rf /var/www/nowsite/*
cp -r dist/* /var/www/nowsite/

# Ajustar permissões
echo "🔒 Ajustando permissões..."
chown -R www-data:www-data /var/www/nowsite
chmod -R 755 /var/www/nowsite

# Recarregar nginx
echo "🔄 Recarregando nginx..."
nginx -t && systemctl reload nginx

echo "✅ Deploy concluído com sucesso!"
echo "🌐 Site disponível em: http://$(hostname -I | awk '{print $1}')"
