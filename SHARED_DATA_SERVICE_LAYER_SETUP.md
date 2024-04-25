# Shared Data-Layer Setup For Micro Frontend Application with Nx Workspace

This tutorial will guide you through setting up a shared `data-layer` for a `Micro Frontend Application` using Nx Workspace, React, and Axios. We will create a shared `data-layer` in the Nx Workspace that will be used by all the projects in the workspace. The shared `data-layer` will contain the service layer for fetching data from the API using Axios.

## Link for Final Implementation

The final implementation of the tutorial can be found in the following repository commits:

- [All Commits](https://github.com/serifcolakel/mfe-tutorial/pull/1/commits/83898b17ccbe6a72644a4989999d6d28d872075d)
- [Pull Request Link](https://github.com/serifcolakel/mfe-tutorial/pull/1)

> Live Demo: [Micro Frontend Application with Nx Workspace](https://relaxed-mochi-7581fa.netlify.app/)

## Prerequisites

Before we begin, make sure you have the following things set up:

- [Base Repository](https://javascript.plainenglish.io/creating-nx-workspace-with-eslint-prettier-and-husky-configuration-b5f4d2fcb914) for creating Nx Workspace with ESLint, Prettier, and Husky Configuration.
- [Building a Micro Frontend Architecture with Nx Workspace](https://medium.com/javascript-in-plain-english/building-a-micro-frontend-architecture-with-nx-workspace-c0fd9b6bf322) for creating a micro frontend architecture using Nx Workspace.
- [Shared Tailwind Setup For Micro Frontend Application with Nx Workspace](https://medium.com/javascript-in-plain-english/shared-tailwind-setup-for-micro-frontend-application-with-nx-workspace-0c02a3ca097d)
- [Shared UI Components For Micro Frontend Application with Nx Workspace](https://dev.to/serifcolakel/shared-ui-setup-for-micro-frontend-application-module-federation-with-react-with-nx-workspace-1p7c)
- [Nx Workspace](https://nx.dev/nx-api/react): Nx is a set of extensible dev tools for monorepos, which helps you develop like Google, Facebook, and Microsoft.
- [Nx Console](https://nx.dev/recipes/nx-console#nx-console): Nx Console is a Visual Studio Code extension that provides a UI for the Nx CLI.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
- [ESLint](https://eslint.org/): A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
- [Prettier](https://prettier.io/): An opinionated code formatter that enforces a consistent code style.
- [Netlify](https://www.netlify.com/): A platform that provides continuous deployment, serverless functions, and more.
- [Shadcn UI](https://ui.shadcn.com/docs): Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.

## Table of Contents

- [Create React Library](#create-react-library)
- [Add Environment Configuration For All Project With](#add-environment-configuration-for-all-project-with)
- [Create Service API Layer with Axios](#create-service-api-layer-with-axios)
- [Create Platzi Store Service](#create-platzi-store-service)
- [Usage of Platzi Store Service](#usage-of-platzi-store-service)
- [Create Product Page with Custom Hooks](#create-product-page-with-custom-hooks)

## Create React Library

First, we need to create a React library using the Nx Workspace. We will use the `@nx/react:library` generator to create the React library.

> With Script

```bash
pnpm exec nx generate @nx/react:library --name=data --bundler=vite --directory=apps/data --projectNameAndRootFormat=as-provided --no-interactive --dry-run
```

The Scripts are explained below:

- **--name** : The name of the library. In this case, we are naming it `data`.
- **--bundler** : The bundler to use for the library. In this case, we are using `vite`.
- **--directory** : The directory where the library will be created. In this case, we are creating it in the `apps/data` directory.
- **--projectNameAndRootFormat** : The format to use for the project name and root. In this case, we are using `as-provided`.
- **--no-interactive** : Disable interactive prompts.
- **--dry-run** : Show what will be generated without actually generating it.

> With Nx Console

![Nx Console](https://i.hizliresim.com/msgusy5.png)

> After creating the library, we can fix the all `eslint` and `prettier` issues in the `data` library.

## Add Environment Configuration For All Project With

https://nx.dev/recipes/react/use-environment-variables-in-react#using-environment-variables-in-react-applications
https://nx.dev/recipes/tips-n-tricks/define-environment-variables
Next, we need to add the environment configuration for all projects in the Nx Workspace. We will create following environment files in the root directory of the Nx Workspace:

- `.env.development` : Development environment configuration.
- `.env.production` : Production environment configuration.
- `.env.custom` : Custom environment configuration for dynamic configuration example.

You can follow the steps below to add the environment configuration:

- **Create Environment Files** : Create the following environment files in the root directory of the Nx Workspace:

```bash
touch .env.development .env.production .env.custom
```

- **Add Environment Variables** : Add the environment variables to the environment files. You can define different variables for each environment.

```bash
# .env.development
NX_BASE_PLATZI_STORE_SERVICE_URL=https://api.escuelajs.co/api/v1
NX_ACCESS_TOKEN_KEY=accessToken
NX_REFRESH_TOKEN_KEY=refreshToken
```

```bash
# .env.production
NX_BASE_PLATZI_STORE_SERVICE_URL=https://api.escuelajs.co/api/v1
NX_ACCESS_TOKEN_KEY=accessToken
NX_REFRESH_TOKEN_KEY=refreshToken
```

```bash
# .env.custom
NX_BASE_PLATZI_STORE_SERVICE_URL=https://api.escuelajs.co/api/v1
NX_ACCESS_TOKEN_KEY=accessToken
NX_REFRESH_TOKEN_KEY=refreshToken
```

By default, Nx will load any environment variables [Reference](https://nx.dev/recipes/tips-n-tricks/define-environment-variables).

By assigning distinct names to both configuration and mode, you can eliminate any potential conflicts that may arise during environment variable loading. Additionally, consider defining custom configurations in your Nx workspace, each with a corresponding mode option [Reference](https://nx.dev/recipes/react/use-environment-variables-in-react#using-environment-variables-in-react-applications).For example, you can create configurations like `development`, `production`, and `custom`, each with its respective mode set, like this:

```json
// nx.json
"configurations": {
  "development": {
    // ...rest of the configuration
    "mode": "development"
  },
  "production": {
    // ...rest of the configuration
    "mode": "production"
  },
  "custom": {
    // ...rest of the configuration
    "mode": "custom"
  }
}
```

Then we can update the application to use the environment variables based on the configuration and mode. We can use the `process.env` object to access the environment variables in the application.

```json
// apps/container/project.json
{
  "name": "container",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "apps/container/src",
  "projectType": "application",
  "targets": {
    "build": {
      // ...rest of the configuration
      "configurations": {
        // ...rest of the configuration
        "custom": {
          "optimization": true,
          "outputHashing": "all",
          "sourceMap": false,
          "namedChunks": false,
          "extractLicenses": true,
          "vendorChunk": false,
          "webpackConfig": "apps/container/webpack.config.prod.ts" // Or You can create custom webpack config for custom "apps/container/webpack.config.custom.ts"
        }
      }
    },
    "serve": {
      // ...rest of the configuration
      "configurations": {
        "development": {
          "buildTarget": "container:build:development"
        },
        "production": {
          "buildTarget": "container:build:production",
          "hmr": false
        },
        "custom": {
          "buildTarget": "container:build:custom",
          "hmr": false
        }
      }
    },
    // ...rest of the configuration
    "serve-static": {
      // ...rest of the configuration
      "configurations": {
        "development": {
          "buildTarget": "container:build:development"
        },
        "production": {
          "buildTarget": "container:build:production"
        },
        "custom": {
          "buildTarget": "container:build:custom"
        }
      }
    }
    // ...rest of the configuration
  },
  "tags": []
}
```

Same approach applied to the `info` repository.

```json
{
  "name": "info",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "apps/info/src",
  "projectType": "application",
  "targets": {
    "build": {
      // ...rest of the configuration
      "configurations": {
        // ...rest of the configuration
        "custom": {
          "optimization": true,
          "outputHashing": "all",
          "sourceMap": false,
          "namedChunks": false,
          "extractLicenses": true,
          "vendorChunk": false,
          "webpackConfig": "apps/info/webpack.config.prod.ts" // Or You can create custom webpack config for custom "apps/info/webpack.config.custom.ts"
        }
      }
    },
    "serve": {
      // ...rest of the configuration
      "configurations": {
        "development": {
          "buildTarget": "info:build:development"
        },
        "production": {
          "buildTarget": "info:build:production",
          "hmr": false
        },
        "custom": {
          "buildTarget": "info:build:custom",
          "hmr": false
        }
      }
    },
    // ...rest of the configuration
    "serve-static": {
      // ...rest of the configuration
      "configurations": {
        "development": {
          "buildTarget": "info:build:development"
        },
        "production": {
          "buildTarget": "info:build:production"
        },
        "custom": {
          "buildTarget": "info:build:custom"
        }
      }
    }
    // ...rest of the configuration
  },
  "tags": []
}
```

Last step we can access the `type-safe` and validate the environment variables in the `data` library. We can use `zod` for the validation.

```ts
// apps/data/src/common/enviroment.ts
import { z } from 'zod';

import { getEnvParams } from '../helpers/environment.helpers';

/**
 * @description The environment schema for the container app.
 */
const envSchema = z.object({
  // INFO (serif) : NX_* Custom Environment variables
  NX_BASE_PLATZI_STORE_SERVICE_URL: z.string(),
  NX_ACCESS_TOKEN_KEY: z.string(),
  NX_REFRESH_TOKEN_KEY: z.string(),

  // INFO (serif) : NX_* Base environment variables
  NX_CLI_SET: z.string(),
  NX_LOAD_DOT_ENV_FILES: z.string(),
  NX_WORKSPACE_ROOT: z.string(),
  NX_TERMINAL_OUTPUT_PATH: z.string(),
  NX_STREAM_OUTPUT: z.string(),
  NX_TASK_TARGET_PROJECT: z.string(),
  NX_TASK_TARGET_TARGET: z.string(),
  NX_TASK_TARGET_CONFIGURATION: z.string(),
  NX_TASK_HASH: z.string(),
});

function initEnvironment() {
  const [errors, env] = getEnvParams(
    process.env as Record<string, string>,
    envSchema
  );

  if (errors) {
    window.console.error(errors);

    throw new Error('Environment variables are not valid');
  }

  return env as z.infer<typeof envSchema>;
}

export { initEnvironment };
```

- **Create Environment Helpers** : Create the `environment.helpers.ts` file in the `apps/data/src/helpers` directory with the following content:

```ts
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';

/**
 * @description Gets the parameters from the environment variables.
 * @param {Record<string, string>} env The environment variables.
 * @param {z.ZodObject<any, any>} schema The schema.
 * @returns The errors and the data.
 */
export function getEnvParams(
  env: Record<string, string>,
  schema: z.ZodObject<any, any>
): [Record<string, string> | null, z.infer<typeof schema> | null] {
  const data: Record<string, unknown> = {};
  const errors: Record<string, string> = {};

  for (const key in schema.shape) {
    if (Object.prototype.hasOwnProperty.call(schema.shape, key)) {
      const value = env[key];

      if (value === undefined) {
        errors[key] = `ERROR (serif) : Missing required env var: ${key}`;
      } else {
        try {
          data[key] = (schema.shape[key] as z.ZodTypeAny)?.parse(value);
        } catch (error) {
          let message = 'INFO (serif) : Invalid env var';

          if (error instanceof z.ZodError) {
            message = `ERROR (serif) : ${error.errors[0].message}`;
          } else if (error instanceof Error) {
            message = `ERROR (serif) : ${error.message}`;
          }

          errors[key] = message;
        }
      }
    }
  }

  if (Object.keys(errors).length) {
    return [errors, null];
  }

  return [null, data as z.infer<typeof schema>];
}
```

- **Export the Environment Variables** : Export the environment variables from the `data` library.

```tsx
// apps/data/src/index.ts
export * from './common';
// ...rest of the code
```

- **Usage of Environment Variables** : Use the environment variables in the `data` library.

```tsx
// apps/data/src/common/index.ts
import { initEnvironment } from './environments';

export const ENV = initEnvironment();
```

🎉 Congirulations. You can use `ENV` object to all project. Example:

```tsx
import { ENV } from '@mfe-tutorial/data';

console.log(ENV.NX_BASE_PLATZI_STORE_SERVICE_URL);
```

## Create Service API Layer with Axios

Next, we need to create a service layer in the `data` library. The service layer will be responsible for fetching data from the API. We will create a `PlatziStoreService` class that will have methods to fetch data from the Platzi Store API.

- **Install Axios** : Install the `axios` package in the `data` library.

```bash
pnpm add axios
```

- **Create Service Apis** : Create the `apis` folder in the `apps/data/src` directory. Then create the `base.api.ts` file in the `apis` folder with the following content:

```ts
import axios from 'axios';

const api = axios;

api.defaults.headers.post['Content-Type'] = 'application/json';
api.defaults.headers.Accept = 'application/json';
api.defaults.withCredentials = false;
api.defaults.timeout = 1000 * 60 * 2; // Two minutes

export { api };
```

- **Write Platzi Store Api** : Write the `platzi.store.api.ts` file in the `apis` folder with the following content:

```ts
import { ENV } from '../common';
import {
  errorInterceptor,
  requestInterceptor,
  responseInterceptor,
} from '../lib/api.interceptors';
import { api } from './base.api';

export const platziStoreApi = api.create({
  baseURL: ENV.NX_BASE_PLATZI_STORE_SERVICE_URL,
});

platziStoreApi.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);

platziStoreApi.interceptors.response.use(responseInterceptor, errorInterceptor);
```

- **Write Services/Apis Helpers** : Write the `helpers` folder in the `apps/data/src` directory. Then Write the `service.helpers.ts` file in the `helpers` folder with the following content:

```ts
import { AxiosError } from 'axios';
import { ZodError } from 'zod';

import { BaseServiceResponse } from '../types';

/**
 * @description Handles the error response.
 * @param {unknown} error - Error
 * @param {string | undefined} message - Message
 * @returns {BaseServiceResponse<null>} The service response.
 * @example
 * const error = new Error('An error occurred.');
 * const result = handleErrorResponse(error);
 * console.log(result); // { data: null, message: 'An error occurred.', success: false }
 * @example
 * const error = new AxiosError('An error occurred.');
 * const result = handleErrorResponse(error);
 * console.log(result); // { data: null, message: 'An error occurred.', success: false }
 */
export const handleErrorResponse = <T>(
  error: unknown,
  message: string | undefined = 'Unknown error occurred.'
): BaseServiceResponse<T> => {
  let status: number | undefined;

  if (error instanceof Error) {
    message = error.message;
    status = 500;
  }

  if (error instanceof AxiosError) {
    message = error.message;
    status = error.response?.status;
  }

  if (error instanceof ZodError) {
    const paths = error.errors.map((err) => err.path[1]);
    const uniquePaths = [...new Set(paths)];

    message = `Error in fields: ${uniquePaths.join(', ')}`;

    status = 400;
  }

  return {
    data: null,
    message,
    success: false,
    status,
  };
};

/**
 * @description Formats the message of a service response.
 * @param {string} message The message to be formatted.
 * @param {string[]} replacerValues The strings to replace the placeholders in message.
 * @returns {string} The formatted message.
 * @example
 * const message = 'The {0} is {1}!';
 * const replace = ['answer', '42'];
 * const result = getServiceResponseMessage(message, replace);
 * console.log(result); // The answer is 42!
 */
export const getServiceResponseMessage = (
  message: string,
  replacerValues?: string[]
): string => {
  let result = message;

  if (replacerValues) {
    replacerValues.forEach((item, index) => {
      result = result.replace(`{${index}}`, item);
    });
  }

  return result;
};
```

- **Create Interceptors** : Create the `api.interceptors.ts` file in the `lib` folder with the following content:

```ts
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { ENV } from '../common';
import { handleErrorResponse } from '../helpers';

// TODO (serif) : handle request here
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(ENV.NX_ACCESS_TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

// TODO (serif) : handle response here
export const responseInterceptor = (response: AxiosResponse) => response;

// TODO (serif) : handle error response here
export const errorInterceptor = async (error: AxiosError) =>
  Promise.reject(handleErrorResponse(error));
```

- **Export Apis** : Export the APIs from the `apis/index.ts` file.

```ts
export { platziStoreApi } from './platzi.store.api';

export { api } from './base.api';
```

## Create Platzi Store Service

Next, we need to create a `PlatziStoreService` in the `data` library. The `services/platzi` will have methods to fetch data from the Platzi Store API.

- **Create Platzi Store Service Base Methods** : Create the `platzi` file in the `services` folder. Then write the following content in the `services/platzi/methods.ts` file:

```ts
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { platziStoreApi } from '../../apis';

/**
 * @description Sends a GET request to the specified URL of postApi.
 * @param {string} url The URL to send the request to.
 * @param {AxiosRequestConfig} config The config specific for this request (merged with this.defaults).
 * @returns {Promise<AxiosResponse<TResponse>>} A Promise that resolves to a AxiosResponse<TResponse>.
 */
async function get<TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<TResponse>> {
  const response = await platziStoreApi.get<TResponse>(url, config);

  return response;
}

/**
 * @description Sends a POST request to the specified URL of postApi.
 * @param {string} url The URL to send the request to.
 * @param {TRequest} data The data to be sent as the request body.
 * @param {AxiosRequestConfig} config The config specific for this request (merged with this.defaults).
 * @returns {Promise<AxiosResponse<TResponse>>} A Promise that resolves to a AxiosResponse<TResponse>.
 */
export const post = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<TResponse>> => {
  const response = await platziStoreApi.post<TResponse>(url, data, config);

  return response;
};

/**
 * @description Sends a PUT request to the specified URL of postApi.
 * @param {string} url The URL to send the request to.
 * @param {TRequest} data The data to be sent as the request body.
 * @param {AxiosRequestConfig} config The config specific for this request (merged with this.defaults).
 * @returns {Promise<AxiosResponse<TResponse>>} A Promise that resolves to a AxiosResponse<TResponse>.
 */
export const put = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<TResponse>> => {
  const response = await platziStoreApi.put<TResponse>(url, data, config);

  return response;
};

/**
 * @description Sends a PATCH request to the specified URL of postApi.
 * @param {string} url The URL to send the request to.
 * @param {TRequest} data The data to be sent as the request body.
 * @param {AxiosRequestConfig} config The config specific for this request (merged with this.defaults).
 * @returns {Promise<AxiosResponse<TResponse>>} A Promise that resolves to a AxiosResponse<TResponse>.
 */
export const patch = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<TResponse>> => {
  const response = await platziStoreApi.patch<TResponse>(url, data, config);

  return response;
};

/**
 * @description Sends a DELETE request to the specified URL of postApi.
 * @param {string} url The URL to send the request to.
 * @param {AxiosRequestConfig} config The config specific for this request (merged with this.defaults).
 * @returns {Promise<AxiosResponse<TResponse>>} A Promise that resolves to a AxiosResponse<TResponse>.
 */
export const remove = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<TResponse>> => {
  const response = await platziStoreApi.delete<TResponse>(url, config);

  return response;
};

const platziStoreApiMethods = {
  get,
  post,
  put,
  patch,
  remove,
};

export { platziStoreApiMethods };
```

This methods, base methods for the `PlatziStoreService`. We can use this methods in the other services.

- **Add Platzi Store Constants** : Add the Platzi Store constants in the `services/platzi/constants.ts` file:

```ts
/**
 * @description PRODUCTS paths for the PLATZI STORE API service
 */
export const PLATZI_STORE_PRODUCTS_PATHS = {
  PRODUCT: {
    GET_ALL: '/products',
    GET_SINGLE: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
  },
  AUTH: {
    LOGIN: '/auth/login',
    PROFILE: '/auth/profile',
    REFRESH_TOKEN: '/auth/refresh-token',
  },
};
```

This constants, base constants for the `PlatziStoreService`. We can use this constants in the other services.

- **Create Platzi Store Auth Services** : The `services/platzi/auth/` file with the following content:

> - `services/platzi/auth/types.ts` file: The types for the Platzi Store Auth services.

```ts
import { z } from 'zod';

import {
  loginRequestSchema,
  loginResponseSchema,
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
  userProfileResponseSchema,
} from './schemas';

export type LoginRequest = z.infer<typeof loginRequestSchema>;

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>;

export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
```

> - `services/platzi/auth/schemas.ts` file: The schemas for the Platzi Store Auth services.

```ts
import { z } from 'zod';

export const loginRequestSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export const userProfileResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.string(),
  avatar: z.string(),
});

export const refreshTokenRequestSchema = z.object({ refreshToken: z.string() });

export const refreshTokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
```

> - `services/platzi/auth/index.ts` file: The index file for the Platzi Store Auth services.

```ts
import { handleErrorResponse } from '../../../helpers';
import { BaseServiceResponse } from '../../../types';
import { PLATZI_STORE_PRODUCTS_PATHS } from '../contants';
import { platziStoreApiMethods as methods } from '../methods';
import {
  loginRequestSchema,
  loginResponseSchema,
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
  userProfileResponseSchema,
} from './schemas';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  UserProfileResponse,
} from './types';

/**
 * @description Logs a user in.
 * @param {LoginRequest} info The user to log in.
 * @returns {Promise<BaseServiceResponse<LoginResponse>>} A Promise that resolves to a LoginResponse.
 */
export const login = async (
  info: LoginRequest
): Promise<BaseServiceResponse<LoginResponse>> => {
  try {
    const infos = loginRequestSchema.parse(info);

    const response = await methods.post<LoginRequest, LoginResponse>(
      PLATZI_STORE_PRODUCTS_PATHS.AUTH.LOGIN,
      infos
    );

    const data = loginResponseSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

/**
 * @description Gets the user profile.
 * @returns {Promise<BaseServiceResponse<UserProfileResponse>>} A Promise that resolves to a UserProfileResponse.
 */
export const getUserProfile = async (): Promise<
  BaseServiceResponse<UserProfileResponse>
> => {
  try {
    const response = await methods.get<UserProfileResponse>(
      PLATZI_STORE_PRODUCTS_PATHS.AUTH.PROFILE
    );

    const data = userProfileResponseSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

/**
 * @description Refreshes the token.
 * @param {RefreshTokenRequest} refreshToken The refresh token.
 * @returns {Promise<BaseServiceResponse<RefreshTokenResponse>>} A Promise that resolves to a RefreshTokenResponse.
 */
export const refreshToken = async (
  token: RefreshTokenRequest
): Promise<BaseServiceResponse<RefreshTokenResponse>> => {
  try {
    const values = refreshTokenRequestSchema.parse(token);

    const response = await methods.post<
      RefreshTokenRequest,
      RefreshTokenResponse
    >(PLATZI_STORE_PRODUCTS_PATHS.AUTH.REFRESH_TOKEN, values);

    const data = refreshTokenResponseSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

export type {
  LoginRequest,
  LoginResponse,
  UserProfileResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
};

export {
  loginRequestSchema,
  loginResponseSchema,
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
  userProfileResponseSchema,
};
```

- **Create Platzi Store Products Services** : The `services/platzi/products/` file with the following content:

> - `services/platzi/products/types.ts` file: The types for the Platzi Store Products services.

```ts
import { z } from 'zod';

import {
  createProductRequestSchema,
  createProductResponseSchema,
  productSchema,
  updateProductRequestSchema,
  updateProductResponseSchema,
} from './schemas';

export type Product = z.infer<typeof productSchema>;

export type CreateProductRequest = z.infer<typeof createProductRequestSchema>;

export type CreateProductResponse = z.infer<typeof createProductResponseSchema>;

export type UpdateProductRequest = z.infer<typeof updateProductRequestSchema>;

export type UpdateProductResponse = z.infer<typeof updateProductResponseSchema>;

export type DeleteProductResponse = boolean;
```

> - `services/platzi/products/schemas.ts` file: The schemas for the Platzi Store Products services.

```ts
import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.object({ id: z.number(), name: z.string(), image: z.string() }),
  images: z.array(z.string()),
});

export const allProductsResponseSchema = z.array(productSchema);

export const createProductRequestSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  categoryId: z.number(),
  images: z.array(z.string()),
});

export const createProductResponseSchema = z.object({
  title: z.string(),
  price: z.number(),
  description: z.string(),
  images: z.array(z.string()),
  category: z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    creationAt: z.string(),
    updatedAt: z.string(),
  }),
  id: z.number(),
  creationAt: z.string(),
  updatedAt: z.string(),
});

export const updateProductRequestSchema = z.object({
  title: z.string(),
  price: z.number(),
});

export const updateProductResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  images: z.array(z.string()),
  creationAt: z.string(),
  updatedAt: z.string(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    creationAt: z.string(),
    updatedAt: z.string(),
  }),
});
```

> - `services/platzi/products/index.ts` file: The index file for the Platzi Store Products services.

```ts
import { handleErrorResponse } from '../../../helpers';
import { BaseServiceResponse } from '../../../types';
import { PLATZI_STORE_PRODUCTS_PATHS } from '../contants';
import { platziStoreApiMethods as methods } from '../methods';
import {
  allProductsResponseSchema,
  createProductRequestSchema,
  createProductResponseSchema,
  productSchema,
  updateProductRequestSchema,
  updateProductResponseSchema,
} from './schemas';
import {
  CreateProductRequest,
  CreateProductResponse,
  Product,
  UpdateProductRequest,
  UpdateProductResponse,
} from './types';

/**
 * @description Gets all products from the API.
 * @returns {Promise<BaseServiceResponse<Product[]>>} A Promise that resolves to an array of Post.
 */
export const getProducts = async (): Promise<
  BaseServiceResponse<Product[]>
> => {
  try {
    const response = await methods.get<Product[]>(
      PLATZI_STORE_PRODUCTS_PATHS.PRODUCT.GET_ALL,
      {
        params: {
          limit: 10,
          offset: 1,
        },
      }
    );

    const data = allProductsResponseSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

/**
 * @description Gets a single product from the API.
 * @param {string} id The product ID.
 * @returns {Promise<BaseServiceResponse<Product>>} A Promise that resolves to a Product.
 */
export const getProduct = async (
  id: string
): Promise<BaseServiceResponse<Product>> => {
  try {
    const response = await methods.get<Product>(
      PLATZI_STORE_PRODUCTS_PATHS.PRODUCT.GET_SINGLE.replace(':id', id)
    );

    const data = productSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

/**
 * @description Creates a new product.
 * @param {CreateProductRequest} product The product to create.
 * @returns {Promise<BaseServiceResponse<CreateProductResponse>>} A Promise that resolves to a Product.
 */
export const createProduct = async (
  product: CreateProductRequest
): Promise<BaseServiceResponse<CreateProductResponse>> => {
  try {
    const values = createProductRequestSchema.parse(product);

    const response = await methods.post<
      CreateProductRequest,
      CreateProductResponse
    >(PLATZI_STORE_PRODUCTS_PATHS.PRODUCT.CREATE, values);

    const data = createProductResponseSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

/**
 * @description Updates a product.
 * @param {string} id The product ID.
 * @param {UpdateProductRequest} product The product to update.
 * @returns {Promise<BaseServiceResponse<UpdateProductResponse>>} A Promise that resolves to a Product.
 */
export const updateProduct = async (
  id: string,
  product: UpdateProductRequest
): Promise<BaseServiceResponse<UpdateProductResponse>> => {
  try {
    const values = updateProductRequestSchema.parse(product);

    const response = await methods.put<
      UpdateProductRequest,
      UpdateProductResponse
    >(PLATZI_STORE_PRODUCTS_PATHS.PRODUCT.UPDATE.replace(':id', id), values);

    const data = updateProductResponseSchema.parse(response.data);

    return {
      data,
      message: response.statusText,
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

/**
 * @description Deletes a product.
 * @param {string} id The product ID.
 * @returns {Promise<BaseServiceResponse<boolean>>} A Promise that resolves to null.
 */
export const deleteProduct = async (
  id: string
): Promise<BaseServiceResponse<boolean>> => {
  try {
    const res = await methods.remove<boolean>(
      PLATZI_STORE_PRODUCTS_PATHS.PRODUCT.DELETE.replace(':id', id)
    );

    return {
      data: res.data,
      message: 'Product deleted successfully.',
      success: true,
    };
  } catch (e) {
    return handleErrorResponse(e);
  }
};

export type {
  CreateProductRequest,
  CreateProductResponse,
  Product,
  UpdateProductRequest,
  UpdateProductResponse,
};

export {
  allProductsResponseSchema,
  createProductRequestSchema,
  createProductResponseSchema,
  productSchema,
  updateProductRequestSchema,
  updateProductResponseSchema,
};
```

- **Export Platzi Store Services** : Export the services from the `services/platzi/index.ts` file.

```ts
export * from './products';
export * from './auth';
export * from './methods';
export * from './constants';
```

- **Export Services** : Export the services from the `services/index.ts` file.

```ts
export * from './platzi';
```

- **Export Data** : Export the services from the `data` library in the `apps/data/src/index.ts` file.

```ts
// ...rest of the code
export * from './services';
```

## Usage of Platzi Store Service

You can use directly from the service function or you can create custom hook for services with `loading`, `error`, `data` states.

- **Create Custom Hook for Auth Service** : Create the `usePlatziStoreAuth` hook in the `apps/container/src/hooks/use-platzi-store-auth/index.ts` directory with the following content:

```ts
import { useState } from 'react';

import { ENV } from '../../common';
import { login, LoginRequest, refreshToken } from '../../services';

export function usePlatziStoreAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (info: LoginRequest) => {
    setLoading(true);

    const response = await login(info);

    const result = {
      success: false,
      message: 'Please check your email and password and try again.',
      title: 'Login Failed',
    };

    if (response.success && response.data) {
      localStorage.setItem(ENV.NX_ACCESS_TOKEN_KEY, response.data.access_token);
      localStorage.setItem(
        ENV.NX_REFRESH_TOKEN_KEY,
        response.data.refresh_token
      );

      result.success = true;
      result.message = 'You have successfully logged in!';
      result.title = 'Login Success';
    } else {
      setError('Please check your email and password and try again.');
    }

    setLoading(false);

    return result;
  };

  const handleRefreshToken = async () => {
    const token = localStorage.getItem(ENV.NX_REFRESH_TOKEN_KEY);

    if (token) {
      const response = await refreshToken({ refreshToken: token });

      if (response.success && response.data) {
        localStorage.setItem(
          ENV.NX_ACCESS_TOKEN_KEY,
          response.data.access_token
        );
        localStorage.setItem(
          ENV.NX_REFRESH_TOKEN_KEY,
          response.data.refresh_token
        );
      } else {
        setError(response.message);
      }
    }
  };

  const onResetError = () => setError(null);

  return {
    loading,
    error,
    handleRefreshToken,
    handleLogin,
    onResetError,
  };
}
```

- **Create Custom Hook for Products Service** : Create the `usePlatziStoreProducts` hook in the `apps/container/src/hooks/use-platzi-store-products/index.ts` directory with the following content:

```ts
import { useEffect, useState } from 'react';

import {
  createProduct,
  CreateProductRequest,
  deleteProduct,
  getProduct,
  getProducts,
  Product,
  updateProduct,
  UpdateProductRequest,
} from '../../services';

export type ProductError = {
  message: string;
  title: string;
};

export type Data =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; error: ProductError }
  | { status: 'hasData'; data: Product[]; message?: string }
  | { status: 'hasSingleData'; data: Product };

export default function usePlatziStoreProducts(fetchOnMount = true) {
  const [data, setData] = useState<Data>({ status: 'idle' });

  const fetchProducts = async (message?: string) => {
    if (data.status !== 'loading') {
      setData({ status: 'loading' });
    }

    const response = await getProducts();

    if (response.success && response.data) {
      setData({ status: 'hasData', data: response.data, message });
    } else {
      setData({
        status: 'error',
        error: {
          message: response.message,
          title: 'Products Fetch Failed',
        },
      });
    }
  };

  const fetchProduct = async (id: string) => {
    setData({ status: 'loading' });

    const response = await getProduct(id);

    if (response.success && response.data) {
      setData({ status: 'hasSingleData', data: response.data });
    } else {
      setData({
        status: 'error',
        error: {
          message: response.message,
          title: 'Product Fetch Failed',
        },
      });
    }
  };

  const create = async (
    product: CreateProductRequest,
    canGetProducts = true
  ) => {
    setData({ status: 'loading' });
    const response = await createProduct(product);

    if (response.success && response.data && canGetProducts) {
      await fetchProducts('Product created successfully! 🎉');
    } else {
      setData({
        status: 'error',
        error: {
          message: response.message,
          title: 'Product Creation Failed',
        },
      });
    }

    if (response.success && data.status === 'loading') {
      setData({ status: 'idle' });
    }
  };

  const update = async (
    id: string,
    product: UpdateProductRequest,
    canGetProducts = true
  ) => {
    setData({ status: 'loading' });
    const response = await updateProduct(id, product);

    if ((response.success && response.data, canGetProducts)) {
      await fetchProducts('Product updated successfully! 🎉');
    } else {
      setData({
        status: 'error',
        error: {
          message: response.message,
          title: 'Product Update Failed',
        },
      });
    }
  };

  const remove = async (id: string) => {
    setData({ status: 'loading' });
    const response = await deleteProduct(id);

    if (response.success && response.data) {
      await fetchProducts('Product deleted successfully! 🎉');
    } else {
      setData({
        status: 'error',
        error: {
          message: response.message,
          title: 'Product Deletion Failed',
        },
      });
    }

    if (response.success && data.status === 'loading') {
      setData({ status: 'idle' });
    }
  };

  const hasDataMessage = data.status === 'hasData' ? !!data.message : false;

  useEffect(() => {
    if (hasDataMessage) {
      const timeout = setTimeout(() => {
        setData((prev) => ({
          ...prev,
          message: undefined,
        }));
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [hasDataMessage]);

  useEffect(() => {
    if (fetchOnMount) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOnMount]);

  return {
    fetchProducts,
    fetchProduct,
    create,
    update,
    remove,
    data,
  };
}
```

- **Export Custom Hooks** : Export the custom hooks from the `apps/data/src/hooks/index.ts` file.

```ts
// ...rest of the code
export * from './use-platzi-store-auth';
export * from './use-platzi-store-products';
```

- **Usage of Custom Hooks** :

Use the custom hooks in the `apps/container/src/pages/login/hooks/use-login.ts` file.

```ts
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginRequest,
  loginRequestSchema,
  paths,
  usePlatziStoreAuth,
} from '@mfe-tutorial/data';
import { useToast } from '@mfe-tutorial/ui';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { error, handleLogin, loading } = usePlatziStoreAuth();

  const loginForm = useForm<LoginRequest>({
    defaultValues: {
      email: 'john@mail.com',
      password: 'changeme',
    },
    resolver: zodResolver(loginRequestSchema),
  });

  async function onSubmit(data: LoginRequest) {
    const result = await handleLogin(data);

    toast({
      title: result.title,
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    });

    if (result.success) {
      navigate(paths.info);
    }
  }

  return {
    loginForm,
    loading:
      loading ||
      loginForm.formState.isLoading ||
      loginForm.formState.isSubmitting,
    error,
    onSubmit,
  };
}
```

Render the `useLogin` hook in the `apps/container/src/pages/login/index.tsx` file.

```tsx
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  InputField,
} from '@mfe-tutorial/ui';

import useLogin from './hooks/use-login';

export default function LoginPage() {
  const { loginForm, onSubmit, loading, error, onResetError } = useLogin();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-y-4">
        <p className="text-2xl text-red-500">An error occurred!</p>
        <p className="text-red-500">{error}</p>
        <Button onClick={onResetError}>Retry</Button>
      </div>
    );
  }

  return (
    <Form {...loginForm}>
      <form
        className="flex flex-col items-center justify-center h-screen p-4 md:mx-auto"
        onSubmit={loginForm.handleSubmit(onSubmit)}
      >
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Please enter your email and password to login.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <InputField
              control={loginForm.control}
              label="Email"
              name="email"
              type="email"
            />
            <InputField
              control={loginForm.control}
              description="Must be at least 8 characters long."
              label="Password"
              name="password"
              type="password"
            />
          </CardContent>
          <CardFooter className="flex w-full">
            <Button className="w-full" loading={loading} type="submit">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
```

## Create Product Page with Custom Hooks

Create the `apps/info/src/app/app.tsx` file with the following content:

```tsx
import { Product } from '@mfe-tutorial/data';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Label,
} from '@mfe-tutorial/ui';
import { Loader, Plus, RefreshCcwIcon, Trash } from 'lucide-react';
import usePlatziStoreProducts from 'packages/data/src/hooks/use-platzi-store-products';

const getFormattedAmount = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

function ProductCarousel({ images }: { images: Product['images'] }) {
  return (
    <Carousel className="items-center justify-center w-full h-full">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image}>
            <img
              alt={image}
              className="object-cover w-full h-48 rounded-lg"
              src={image.replace(/[\\[\]",]/g, '')}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}

function ProductCard({
  product,
  children,
}: {
  product: Product;
  children?: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col justify-between w-full h-full">
      <CardHeader>
        <ProductCarousel images={product.images} />
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-x-4">
        <Label>Price</Label>
        <Label className="text-gray-500">
          {getFormattedAmount(product.price)}
        </Label>
      </CardContent>
      <CardFooter className="flex flex-col justify-between w-full gap-4 xl:flex-row">
        <Badge variant="default">{product.category.name}</Badge>
        {children}
      </CardFooter>
    </Card>
  );
}

function CreateProductButton({ callback }: { callback: () => void }) {
  return (
    <Button onClick={callback} tooltip="Create Product" variant="icon">
      <Plus className="text-white" />
    </Button>
  );
}

export function App() {
  const { create, data, fetchProduct, fetchProducts, remove, update } =
    usePlatziStoreProducts();

  if (data.status === 'loading') {
    return (
      <main className="flex flex-col items-center justify-center w-full h-screen gap-y-4">
        <Loader className="animate-spin" size="3rem" />
        Loading...
      </main>
    );
  }

  if (data.status === 'error') {
    return (
      <main className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-red-500">An error occurred!</p>
        <p className="text-red-500">{data.error.message}</p>
        <Button onClick={() => fetchProducts()} variant="destructive">
          <RefreshCcwIcon /> Retry
        </Button>
      </main>
    );
  }

  const renderContent = () => {
    if (data.status === 'hasData') {
      const { data: products, message } = data;

      return (
        <main className="flex flex-col items-center justify-center w-full h-full p-4">
          {message && (
            <Badge
              className="flex items-center justify-center w-full px-8 py-4 text-3xl"
              variant="default"
            >
              {message}
            </Badge>
          )}
          <ul className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product}>
                  <div className="space-x-4">
                    <Button
                      onClick={() => fetchProduct(String(product.id))}
                      variant="default"
                    >
                      <RefreshCcwIcon />
                    </Button>
                    <Button
                      onClick={async () => {
                        await remove(String(product.id));
                      }}
                      tooltip="Remove Product"
                      variant="destructive"
                    >
                      <Trash />
                    </Button>
                    <Button
                      onClick={async () => {
                        const updatedProduct = {
                          ...product,
                          title: `${product.title} Updated`,
                        };

                        await update(String(product.id), updatedProduct);
                      }}
                      tooltip="Update Product"
                      variant="icon"
                    >
                      <RefreshCcwIcon />
                    </Button>
                  </div>
                </ProductCard>
              </li>
            ))}
          </ul>
        </main>
      );
    }

    if (data.status === 'hasSingleData') {
      const { data: product } = data;

      return (
        <main className="flex flex-col items-center justify-center w-full h-full p-4 mx-auto md:w-1/2">
          <ProductCard product={product}>
            <Button onClick={() => fetchProducts()} variant="default">
              <RefreshCcwIcon /> Back
            </Button>
          </ProductCard>
        </main>
      );
    }

    return (
      <main className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-red-500">No products found!</p>
        <Button onClick={() => fetchProducts()}>
          <RefreshCcwIcon /> Retry
        </Button>
      </main>
    );
  };

  return (
    <div className="relative">
      <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-gray-300 border-b shadow-md">
        <h1 className="text-3xl font-bold text-primary">Platzi Store</h1>
        <CreateProductButton
          callback={async () => {
            const newProduct = {
              title: 'New Product',
              description: 'This is a new product.',
              price: 100,
              categoryId: 1,
              images: ['https://via.placeholder.com/300'],
            };

            await create(newProduct);
          }}
        />
      </header>
      {renderContent()}
    </div>
  );
}

export default App;
```

## Conclusion

In this tutorial, we learned how to set up a shared Data Layer for a Micro Frontend Application using Nx Workspace, React, and Tailwind CSS. We created a shared `services` library to manage the API services and a shared `hooks` library to manage the custom hooks for the services. We also created custom hooks for the `Platzi Store Auth` and `Platzi Store Products` services and used them in the `Login` and `Product` pages.

The shared Data Layer allows us to manage the API services and custom hooks in a single place and reuse them across multiple applications. This helps to keep the codebase clean, maintainable, and scalable. By following this approach, we can easily add new services, custom hooks, and features to our applications without duplicating code.

I hope you found this tutorial helpful and that you can now integrate Shadcn UI, a beautifully designed component library, into your projects. Happy coding! 🎉
