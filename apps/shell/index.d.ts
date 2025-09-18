import { GrowthBook } from '@growthbook/growthbook';

/* eslint-disable */
interface PluginsInjections {
  $notify(data: NotificationType): void;
  $t(msg: string): string;
  $growthbook: GrowthBook;
}

declare module '#app' {
  interface NuxtApp extends PluginsInjections {}
}

declare module 'nuxt/dist/app/nuxt' {
  interface NuxtApp extends PluginsInjections {}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends PluginsInjections {}
}
export {};
