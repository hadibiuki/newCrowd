import type { Query } from '@/graphql/graphql';

export const useFaqQuery = () => {
  const { loading, onError, onResult, result } = useQuery<Query>(FaqSchema);

  onError(error => {
    errorHandler(error);
  });

  return {
    data: result,
    loading,
    onResult,
  };
};
