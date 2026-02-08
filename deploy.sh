#!/bin/bash

# Script de despliegue para FitTrack en Ubuntu
# Uso: ./deploy.sh

echo "🚀 Desplegando FitTrack..."

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📦 Instalando dependencias...${NC}"
    npm install
fi

# Build de producción
echo -e "${BLUE}🔨 Construyendo aplicación...${NC}"
npm run build

# Verificar si el build fue exitoso
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build completado exitosamente${NC}"
    
    # Iniciar servidor de preview
    echo -e "${BLUE}🌐 Iniciando servidor en puerto 3000...${NC}"
    echo -e "${GREEN}La aplicación estará disponible en:${NC}"
    echo -e "${GREEN}  - http://localhost:3000${NC}"
    echo -e "${GREEN}  - http://$(hostname -I | awk '{print $1}'):3000${NC}"
    echo ""
    echo -e "${BLUE}Presiona Ctrl+C para detener el servidor${NC}"
    
    npm run preview
else
    echo -e "\033[0;31m❌ Error en el build${NC}"
    exit 1
fi
