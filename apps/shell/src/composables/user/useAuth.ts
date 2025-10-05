import { UserLevelEnum } from '@/graphql/graphql';
import axios from 'axios';

export const useAuth = () => {
  const handleAuthRedirect = () => {
    const config = useRuntimeConfig();

    axios
      .post('/api/v4/graphql/out', {
        query: `
        query Connect($redirect: String) {
          Connect(redirect:$redirect)
       }
  `,
        variables: {
          redirect: config.public.redirect_url,
        },
      })
      .then(response => {
        const connect = response.data.data.Connect;
        window.location.replace(connect);

        return response;
      })
      .catch(() => {});
  };
  const isSilverLevelDown = computed(() => {
    const user = useAuthStore();

    return (
      user.userAuth.level === UserLevelEnum.Blue ||
      user.userAuth.level === UserLevelEnum.New ||
      user.userAuth.level === UserLevelEnum.Basic
    );
  });
  const isBlueLevel = computed(() => {
    const user = useAuthStore();

    return (
      user.userAuth.level === UserLevelEnum.Blue || user.userAuth.level === UserLevelEnum.Basic
    );
  });
  const canUserCreateTerminal = computed(() => {
    const user = useAuthStore();
    if (user.userAuth.level !== UserLevelEnum.New) {
      return true;
    }

    return false;
  });
  const addTerminalUrl = () => {
    if (canUserCreateTerminal.value) {
      return '/panel/terminal/add';
    }

    return '/panel/onboarding';
  };

  return {
    addTerminalUrl,
    canUserCreateTerminal,
    handleAuthRedirect,
    isBlueLevel,
    isSilverLevelDown,
  };
};
