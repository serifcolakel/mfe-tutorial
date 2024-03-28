import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'container',
  remotes: ['info'],
};

export default config;
