export default defineNuxtRouteMiddleware(async to => {
  const { canUserCreateTerminal } = useAuth();
  const { handleRef } = useRedirectRef();
  const ALLOWED_ROUTES = ['/panel/onboarding', '/panel/ticket', '/panel/user', '/panel/referral'];
  const ref = to.query?.ref;
  if (ref && typeof ref === 'string') {
    handleRef(ref);
  }

  if (to.meta.public) {
    return;
  }
  if (canUserCreateTerminal.value) {
    ALLOWED_ROUTES.push('/panel/terminal');
  }
});
