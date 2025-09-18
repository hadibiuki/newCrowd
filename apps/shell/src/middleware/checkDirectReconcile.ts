import { ReconcileTypeEnum } from '@/graphql/graphql';

export default defineNuxtRouteMiddleware(async to => {
  const { active } = useActiveTerminal();
  const router = useRouter();

  if (active?.reconcile_type === ReconcileTypeEnum.DirectReconcile) {
    return router.push(
      `/panel/${encodeURIComponent(active?.domain ?? '')}${to.meta.fallbackRoute}`
    );
  }
});
