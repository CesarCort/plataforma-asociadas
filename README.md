# WIM Perú - Plataforma de Gestión

Plataforma web para la gestión de membresías, eventos y beneficios de WIM Perú (Women in Mining).

## 🚀 Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- React Router DOM

## ⚙️ Requisitos

- Node.js 16.x o superior
- npm 8.x o superior

## 🛠️ Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd plataforma
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── ui/            # Componentes de UI (shadcn)
│   ├── layout/        # Componentes de layout
│   └── lib/           # Utilidades y helpers
├── layouts/           # Layouts de la aplicación
├── pages/             # Páginas de la aplicación
│   ├── auth/          # Páginas de autenticación
│   ├── dashboard/     # Páginas del dashboard
│   └── settings/      # Páginas de configuración
└── App.tsx            # Componente principal y rutas
```

## 🎨 Estilos y Componentes

El proyecto utiliza shadcn/ui para componentes base. Para instalar nuevos componentes:

```bash
npx shadcn-ui@latest add [nombre-componente]
o
npx shadcn add [nombre-componente]
```

## 🔄 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run lint`: Ejecuta el linter
- `npm run preview`: Previsualiza la build de producción

## 📝 Convenciones

- Usar rutas relativas para importaciones
- Seguir la estructura de componentes de shadcn/ui
- Mantener consistencia con las variables CSS definidas
- Utilizar Tailwind para estilos
