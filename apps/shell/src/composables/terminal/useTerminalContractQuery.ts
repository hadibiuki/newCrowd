import { ref } from 'vue';
const axios = useAxios();
import { ContractTemplateType, ContractTypeEnum, Query } from '~/graphql/graphql';

export const useTerminalContract = (route?: string) => {
  const data = ref<string | undefined>();
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const fetchContract = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.get(`/api${route}`);

      data.value = response as unknown as string;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    error,
    fetchContract,
    loading,
  };
};

export const useContractTemplatesQuery = (type: ContractTypeEnum) => {
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(ContractTemplatesSchema, {
    type,
  });

  onError(error => {
    errorHandler(error);
  });

  const filteredData = computed(() => {
    if (result.value?.ContractTemplates && _isArray(result.value?.ContractTemplates)) {
      return result.value.ContractTemplates[result.value.ContractTemplates.length - 1];
    }
    if (typeof result.value?.ContractTemplates === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData as Ref<ContractTemplateType | undefined>,
    loading,
    onResult,
    refetch,
  };
};
