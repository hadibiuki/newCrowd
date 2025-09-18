import { computed } from 'vue';

import { useCookies } from './useCookies';

function useFromAppRoute() {
  const { getCookie } = useCookies();
  const isFromApp = computed(() => getCookie('from_app'));

  return {
    isFromApp,
  };
}

export default useFromAppRoute;
