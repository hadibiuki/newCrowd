import * as Sentry from '@sentry/nuxt';
import { useRuntimeConfig } from '#imports';

Sentry.init({
  dsn: '',
  // dsn: 'https://e770a1d0ae36747ae8df4d4c7637e79b@sentry.zarinpal.com/39',
  environment: useRuntimeConfig().public.sandbox_name,
  integrations: [Sentry.browserTracingIntegration()],
  release: useRuntimeConfig().public.version,
  tracesSampleRate: 0.01,
});
