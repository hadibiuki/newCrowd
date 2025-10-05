export default defineNuxtRouteMiddleware(async (to: { meta: { fallbackRoute: unknown } }) => {
  const router = useRouter();

  return router.push(`/panel/${to.meta.fallbackRoute}`);
});
