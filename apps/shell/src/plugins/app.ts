import { AxiosError } from 'axios';

import { getUserProfileInformationApi } from '~/restApi/profile';
const { handleAuthRedirect } = useAuth();
export default defineNuxtPlugin(async () => {
  const route = useRoute();
  const authStore = useAuthStore();
  authStore.setSpaLoading(true);
  await getUserProfileInformationApi()
    // eslint-disable-next-line promise/always-return
    .then(response => {
      authStore.setSpaLoading(false);
      authStore.setUserAuth(response.data);
    })
    .catch((err: AxiosError) => {
      if (err?.response?.status === 401 && !route.meta.public) {
        handleAuthRedirect();
      }
    });
});
