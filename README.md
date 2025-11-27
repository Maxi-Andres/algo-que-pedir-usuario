# Algo Que Pedir — Frontend Usuario

Este proyecto es el frontend del lado del usuario (cliente) para la aplicación **Algo Que Pedir**, un sistema similar a PedidosYa. Permite buscar locales, ver sus menús, realizar pedidos y navegar dentro de la plataforma. Está desarrollado con **React + TypeScript + Vite** y se comunica con un backend REST mediante **axios**.

---

## Tecnologías principales

* React + TypeScript
* Vite
* Axios
* React Router DOM
* Material UI y estilos propios
* ESLint

---

## Estructura del proyecto

```
src/
 ├── components/       Componentes reutilizables
 ├── pages/            Páginas principales
 ├── services/         Llamadas al backend
 ├── domain/           Tipos y modelos
 ├── customHooks/      Hooks propios
 └── main.tsx          Punto de entrada
```

---

## Relación con otros proyectos

Este frontend funciona junto al:

* Backend de Algo Que Pedir (API REST)
* Frontend del Local (interfaz para los comercios)

---

## Instalación y ejecución

Instalar dependencias:

```bash
npm install
```

Modo desarrollo:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Previsualización del build:

```bash
npm run preview
```

---

## Configuración de entorno

Crear un archivo `.env` con la URL del backend:

```
VITE_API_URL=http://localhost:9000
```

---


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```