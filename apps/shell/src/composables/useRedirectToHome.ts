export const useRedirectToHome = () => {
  // eslint-disable-next-line no-constant-condition
  const homeUrl = computed(() => (true ? `/panel/dashboard` : '/panel/overview'));

  return { homeUrl };
};
