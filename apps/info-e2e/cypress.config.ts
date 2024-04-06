import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  e2e: nxE2EPreset(__dirname),
});
