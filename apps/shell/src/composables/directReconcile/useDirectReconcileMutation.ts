import { i18n } from '@/locale/i18n';

const mutationCandidateDirectReconcile = () => {
  const { called, error, loading, mutate, onDone, onError } = useMutation(
    CandidateDirectReconcileSchema
  );
  onError(error => {
    const { t } = i18n.global;
    const { $notify } = useNuxtApp();
    errorHandler(error, err =>
      $notify({
        isRead: false,
        message: t('_validation.' + err?.validation?.[0]?.rule, {
          _field_: t(`_validation.name.${err?.validation?.[0]?.input}`),
          max: err?.validation?.[0]?.params?.[0],
          min: err?.validation?.[0]?.params?.[0],
          name: t(`_validation.name.${err?.validation?.[0]?.input}`),
        }),
        type: 'error',
      })
    );
  });

  return { called, error, loading, mutate, onDone, onError };
};
export const useDirectReconcileMutation = () => ({
  mutationCandidateDirectReconcile,
});
