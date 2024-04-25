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
