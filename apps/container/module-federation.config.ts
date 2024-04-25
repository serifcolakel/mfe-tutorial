import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'container',
  remotes: ['info'],
  shared: (name, defaultConfig) => {
    // "react-hook-form": "^7.51.3"
    if (name.includes('react-hook-form')) {
      return {
        singleton: true,
        eager: true,
        requiredVersion: '^7.51.3',
      };
    }

    // "@hookform/resolvers": "^3.3.4"
    if (name.includes('@hookform/resolvers')) {
      return {
        ...defaultConfig,
        strictVersion: false,
        requiredVersion: '^3.3.4',
      };
    }

    // "zod": "^3.22.5"
    if (name.includes('zod')) {
      return {
        singleton: true,
        eager: true,
        requiredVersion: '^3.22.5',
      };
    }

    // react 18.2.0
    if (name.includes('react')) {
      return {
        singleton: true,
        eager: true,
        requiredVersion: '^18.2.0',
      };
    }

    // react-dom 18.2.0
    if (name.includes('react-dom')) {
      return {
        singleton: true,
        eager: true,
        requiredVersion: '^18.2.0',
      };
    }

    // "react-redux": "^9.1.1",
    if (name.includes('react-redux')) {
      return {
        singleton: true,
        eager: true,
        requiredVersion: '^9.1.1',
      };
    }

    // "@reduxjs/toolkit": "^2.2.3",
    if (name.includes('@reduxjs/toolkit')) {
      return {
        singleton: true,
        eager: true,
        requiredVersion: '^2.2.3',
      };
    }

    // @radix-ui/react-toast (required ^1.1.5)
    if (name.includes('@radix-ui/react-toast')) {
      return {
        singleton: true,
        eager: true,
        requiredVersion: '^1.1.5',
      };
    }

    // @radix-ui/react-slot (required ^1.0.2)
    if (name.includes('@radix-ui/react-slot')) {
      return {
        singleton: true,
        eager: true,
        requiredVersion: '^1.0.2',
      };
    }

    return false;
  },
};

export default config;
