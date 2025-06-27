
# Project Requirements

## Frontend Framework
- React 18.3.1
- TypeScript
- Vite (Build tool)

## UI Framework & Styling
- Tailwind CSS
- Shadcn/UI Components
- Radix UI Primitives
- Lucide React Icons

## Routing & State Management
- React Router DOM 6.26.2
- TanStack React Query 5.56.2
- React Context API

## Form Handling
- React Hook Form 7.53.0
- Zod 3.23.8 (Schema validation)

## Additional Libraries
- Date-fns 3.6.0 (Date utilities)
- Sonner 1.5.0 (Toast notifications)
- Class Variance Authority 0.7.1 (CSS class utilities)
- Clsx 2.1.1 (Conditional CSS classes)
- Tailwind Merge 2.5.2 (Merge Tailwind classes)

## Development Dependencies
- ESLint (Code linting)
- PostCSS (CSS processing)
- TypeScript compiler

## Browser Support
- Modern browsers with ES6+ support
- Mobile responsive design

## Deployment
- Static site hosting compatible
- No server-side rendering required

## Environment Configuration
This project uses frontend-only configuration. No .env files are used.
For API keys and secrets, consider:
1. Using Supabase integration for secure backend services
2. Storing public API keys directly in code
3. Using localStorage for user-inputted credentials (not recommended for production)

## Installation
```bash
npm install
# or
yarn install
# or
bun install
```

## Development
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

## Build
```bash
npm run build
# or
yarn build
# or
bun build
```
