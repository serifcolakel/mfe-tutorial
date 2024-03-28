import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'info',
  exposes: {
    './InfoContainer': './src/app/app',
  },
};

export default config;
