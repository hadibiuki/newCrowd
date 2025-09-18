import { GrowthBook } from '@growthbook/growthbook';

export default defineNuxtPlugin(async nuxtApp => {
  const config = useRuntimeConfig();
  const growthbook = new GrowthBook({
    apiHost: config.public.growthbook_url as string,
    clientKey: config.public.growthbook_key as string,
    enableDevMode: config.public.growthbook_dev_mode_enable as boolean,
  });

  await growthbook.init({ streaming: true });

  nuxtApp.provide('growthbook', growthbook);
});
