# Creating Nx Workspace with Eslint, Prettier and Husky Configuration

# Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Nx Console Extension for VSCode](#nx-console-extension-for-vscode)
- [Chapter 2: Setting up Eslint, Prettier and Husky Configuration](#chapter-2-setting-up-eslint-prettier-and-husky-configuration)

# Introduction

This is a simple example of how to create a micro front end application using Nx and React. This example is based on the following concepts:

- Nx Workspace
- React
- Micro Front End
- Module Federation
- Webpack 5
- Data Layer (API and State Management)
- Shared UI Components (form example MUI, Ant Design, Chakra, Shadcn etc.)

# Getting Started

To get started, you need to create `nx-workspace` and then create a new React application with `pnpm`. You can do this by running the following commands:

🔗 See `pnpm` documentation. [Download](https://pnpm.io/installation)

```bash
pnpx create-nx-workspace
```

Creating Nx Workspace steps like below:

- Where would you like to create your workspace? : `mfe-tutorial`

  - `mfe-tutorial`

- Which stack do you want to use? : **I choose** `React`

  - `None`: Configures a TypeScript/JavaScript project with minimal structure. (default)
  - `React`: Configures a React application with your framework of choice. ✅
  - `Vue`: Configures a Vue application with your framework of choice.
  - `Angular`: Configures a Angular application with modern tooling.
  - `Node`: Configures a Node API application with your framework of choice.

- What framework would you like to use? : **I choose** `None`

  - `None` I only want react and react-dom in my workspace. ✅
  - `Next.js` [ https://nextjs.org/ ]
  - `Remix` [ https://remix.run/ ]
  - `Expo` [ https://expo.io/ ]
  - `React Native` [ https://reactnative.dev/ ]

- Integrated monorepo, or standalone project? : **I choose** `Int. Monorepo`

  - `Int. Monorepo` Nx creates a monorepo that contains multiple projects. ✅
  - `Standalone` Nx creates a single project and makes it fast.

- Application name : `mfe-tutorial`

  - `mfe-tutorial`

- Which bundler would you like to use? : **I choose** `Webpack`

  - `Vite` [ https://vitejs.dev/ ]
  - `Webpack` [ https://webpack.js.org/ ] ✅
  - `Rspack` [ https://www.rspack.dev/ ]

- Test runner to use for end to end (E2E) tests : **I choose** `Playwright`

  - `None` .
  - `Cypress` [ https://www.cypress.io/ ]
  - `Playwright` [ https://playwright.dev/ ] ✅

- Default stylesheet format : **I choose** `Tailwind CSS`

  - CSS
  - SASS(.scss) [ https://sass-lang.com ]
  - LESS [ https://lesscss.org ]
  - tailwind [ https://tailwindcss.com ] ✅
  - styled-components [ https://styled-components.com ]
  - emotion [ https://emotion.sh ]
  - styled-jsx [ https://www.npmjs.com/package/styled-jsx ]

- Do you want Nx Cloud to make your CI fast? : **I choose** `Yes, configure Nx Cloud for GitHub Actions`
  - Yes, enable Nx Cloud
  - Yes, configure Nx Cloud for GitHub Actions
  - Yes, configure Nx Cloud for Circle CI
  - Skip for now

🎉 Congratulations! You have successfully created your Nx workspace.

# Nx Console Extension for VSCode

Nx Console is a Visual Studio Code extension used for developing projects created with Nx Workspace. With this extension, tasks such as development, testing, and building projects can be easily performed.

You can install the [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) extension in Visual Studio Code or search for "Nx Console" in VS Code and install it.

# Setting up Eslint, Prettier and Husky Configuration

- First, you need to install the following packages:

```bash
pnpm add -D eslint-config-airbnb eslint-config-airbnb-typescript eslint-plugin-prettier eslint-plugin-simple-import-sort
```

Package installation steps like below:

- `eslint-config-airbnb` : Airbnb's ESLint config.
- `eslint-config-airbnb-typescript` : Airbnb's ESLint config for TypeScript.
- `eslint-plugin-prettier` : ESLint plugin for Prettier formatting.
- `eslint-plugin-simple-import-sort` : ESLint plugin for sorting imports.

- Modify the `.eslintrc.json` file as follows:

```json
{
  "root": true,
  "ignorePatterns": ["**/*"],
  "plugins": ["@nx", "react", "@typescript-eslint", "prettier", "simple-import-sort", "import"],
  "extends": ["airbnb", "airbnb-typescript", "airbnb/hooks", "plugin:@typescript-eslint/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.base.json"
  },
  "rules": {
    "simple-import-sort/imports": "error",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "react/react-in-jsx-scope": "off",
    "linebreak-style": "error",
    "react/jsx-props-no-spreading": "off",
    "no-console": "error",
    "no-var": "error",
    "react/jsx-sort-props": [
      "error",
      {
        "shorthandFirst": true
      }
    ],
    "@typescript-eslint/no-floating-promises": "off",
    "react/jsx-one-expression-per-line": "off",
    "spaced-comment": ["error", "always"],
    "eqeqeq": ["error", "smart"],
    "no-else-return": "error",
    "no-empty-function": "error",
    "react/require-default-props": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "max-len": [
      "error",
      {
        "code": 120
      }
    ],
    "consistent-return": "off",
    "array-callback-return": "warn",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/no-loss-of-precision": "off",
    "react/button-has-type": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
    "@typescript-eslint/no-misused-promises": [
      2,
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": "return"
      },
      {
        "blankLine": "always",
        "prev": ["const", "let", "import"],
        "next": "*"
      },
      {
        "blankLine": "any",
        "prev": ["import"],
        "next": ["import"]
      },
      {
        "blankLine": "never",
        "prev": ["const", "let"],
        "next": ["const", "let"]
      },
      {
        "blankLine": "always",
        "prev": ["multiline-const", "multiline-let"],
        "next": ["*"]
      },
      {
        "blankLine": "always",
        "prev": ["*"],
        "next": ["multiline-const", "multiline-let"]
      },
      {
        "blankLine": "always",
        "prev": ["*"],
        "next": ["if", "switch", "for", "while", "try", "function", "class"]
      },
      {
        "blankLine": "always",
        "prev": ["if", "switch", "for", "while", "try", "function", "class"],
        "next": ["*"]
      },
      {
        "blankLine": "never",
        "prev": ["case"],
        "next": ["case"]
      }
    ],
    "object-curly-spacing": [
      "error",
      "always",
      {
        "objectsInObjects": true,
        "arraysInObjects": true
      }
    ],
    "array-bracket-spacing": [
      "error",
      "always",
      {
        "objectsInArrays": true,
        "arraysInArrays": false
      }
    ]
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "simple-import-sort/imports": [
          "error",
          {
            "groups": [
              // Add internal packages showing on top, You can add "react-hook-form", "react-query" etc.
              ["^@nx", "^react", "^\\w"],
              // npm packages
              // Anything that starts with a letter (or digit or underscore), or `@` followed by a letter.
              // ["^\\w"],
              // Internal packages.
              ["^@store(/.*|$)"],
              ["^@components(/.*|$)"],
              ["^@ui(/.*|$)"],
              ["^@lib(/.*|$)"],
              ["^@pages(/.*|$)"],
              ["^@routes(/.*|$)"],
              ["^@layouts(/.*|$)"],
              ["^@utils(/.*|$)"],
              ["^@assets(/.*|$)"],
              ["^@helpers(/.*|$)"],
              ["^@hooks(/.*|$)"],
              ["^@providers(/.*|$)"],
              ["^@services(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"]
            ]
          }
        ],
        "@nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "*",
                "onlyDependOnLibsWithTags": ["*"]
              }
            ]
          }
        ]
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "extends": ["plugin:@nx/typescript"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "extends": ["plugin:@nx/javascript"],
      "rules": {}
    },
    {
      "files": ["*.spec.ts", "*.spec.tsx", "*.spec.js", "*.spec.jsx"],
      "env": {
        "jest": true
      },
      "rules": {}
    }
  ]
}
```

- Now, you can add VSCode Settings for Eslint auto fix and format on save. Add the following settings to `.vscode/settings.json` or `.vscode/settings.json` file.

```json
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit",
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.format.enable": true
```

- Add the `lint` script to the `package.json` file.

```json
{
  "scripts": {
    "lint": "pnpm exec nx run-many --target=lint --all"
  }
}
```

- Add the `husky` package for pre-commit hooks.

```bash
pnpm add --save-dev husky
```

- Run the following command to create a new `husky` configuration file.

```bash
pnpm exec husky init
```

- Modify the `.husky/pre-commit` file as follows:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm run lint
```

🎉 Congratulations! You have successfully set up Eslint, Prettier and Husky configuration with Nx Workspace.
