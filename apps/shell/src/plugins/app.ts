import { TerminalType } from '@/graphql/graphql';
import { AxiosError } from 'axios';

import { getUserProfileInformationApi } from '~/restApi/profile';
const { handleAuthRedirect } = useAuth();
export default defineNuxtPlugin(async () => {
  const route = useRoute();
  const authStore = useAuthStore();
  const { fill } = useActiveTerminal();
  authStore.setSpaLoading(true);
  await getUserProfileInformationApi()
    .then(response => {
      authStore.setSpaLoading(false);
      authStore.setUserAuth(response.data);
      const terminals = response.data.data.Terminals as TerminalType[];
      fill(terminals as unknown as TerminalType[]);

      return terminals;
    })
    .catch((err: AxiosError) => {
      if (err?.response?.status === 401 && !route.meta.public) {
        handleAuthRedirect();
      }
    });
});
