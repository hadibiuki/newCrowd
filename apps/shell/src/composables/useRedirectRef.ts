export function useRedirectRef() {
  const handleRef = (ref: string): void => {
    if (ref === 'direct_reconcile') {
      const authStore = useAuthStore();
      authStore.setDirectReconcileModal(true);
    }
  };

  return {
    handleRef,
  };
}
