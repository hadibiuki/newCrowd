import { defineStore } from 'pinia';

export const useSessionStore = defineStore('sessionStore', () => {
  const dashboardLoading = ref();
  const data = ref();
  const detailesData = ref();
  const loading = ref();
  const filter = ref('');
  const refetch = ref();
  const sessionType = ref();
  const showModal = ref(false);
  const pagination = ref({
    page: 1,
    pageSize: 10,
    total: 10,
    totalPages: 1,
  });

  return {
    dashboardLoading,
    data,
    detailesData,
    filter,
    loading,
    pagination,
    refetch,
    sessionType,
    showModal,
  };
});
