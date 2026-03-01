# ca-component-lib

Biblioteca de componentes React baseada em MUI (Material-UI), com TypeScript, Rollup, testes com React Testing Library e Storybook.

## Stack

- **React 19**
- **TypeScript**
- **MUI (Material-UI)** – componentes base
- **Rollup** – build da biblioteca
- **React Testing Library (RTL)** – testes
- **Jest** – runner de testes
- **Storybook** – documentação e desenvolvimento dos componentes

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Build da biblioteca
npm run build

# Testes
npm test

# Storybook (dev)
npm run storybook

# Build do Storybook (estático)
npm run build-storybook
```

## Uso em um projeto (ex.: CRA)

A biblioteca é compatível com Create React App e outros bundlers. Após o build:

```bash
npm run build
```

Em outro projeto:

```bash
npm install /caminho/para/ca-component-lib
# ou publique no npm e instale pelo nome do pacote
```

```tsx
import { Button } from 'ca-component-lib';

function App() {
  return (
    <Button variant="contained" color="primary">
      Clique
    </Button>
  );
}
```

Certifique-se de que o projeto consumidor tenha as **peerDependencies** instaladas: `react`, `react-dom`, `@mui/material`, `@emotion/react`, `@emotion/styled`.

## Estrutura

```
src/
  Button/
    Button.tsx
    Button.types.ts
    Button.stories.tsx
    __tests__/
      Button.test.tsx
    index.ts
  index.ts
```

## Scripts

| Script              | Descrição                    |
|---------------------|-----------------------------|
| `npm run build`     | Gera `dist/` (CJS + ESM)   |
| `npm test`          | Roda testes com Jest/RTL   |
| `npm run storybook` | Abre Storybook na porta 6006 |
| `npm run build-storybook` | Gera build estático do Storybook |
