import { UserType } from '@/graphql/graphql';
// import { DataStatusType } from '@/graphql/graphql';
import { UserAnnouncementTypeCustom } from '@/types/userCustomTypes';
import { defineStore } from 'pinia';
const { getCookie, setCookie } = useCookies();
interface IUser {
  // address_count: number;
  avatar: string;
  // data_status?: DataStatusType;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  level: string;
  personal_link: {
    domain: string;
  };
  profile_version: string;
  referral_id: string;
  username: string;
}
interface INotification {
  body: string;
  id: string;
  isPersonal: boolean;
  isSeen?: boolean;
  title: string;
  type: string;
}

export const useAuthStore = defineStore(
  'authStore',
  () => {
    const isFirstTime = ref(true);
    const hasLogged = ref(true);
    const spaLoading = ref(true);
    const personal_link = ref<string>();
    const showLogOut = ref<boolean>(false);
    const profileVersion = ref<boolean>(false);
    const userAuth = ref({});
    const notifications = ref<INotification[]>([]);
    const announcements = ref<UserAnnouncementTypeCustom[]>([]);
    const version = ref<string>();
    const tourActive = ref(false);
    const directReconcileModal = ref(false);
    const directReconcile = ref<Record<string, boolean>>({});
    function setSpaLoading(value: boolean) {
      spaLoading.value = value;
    }

    function setProfileVersion(value: boolean) {
      profileVersion.value = value;
    }

    function setUserAuth(me: UserType) {
      userAuth.value = me;
    }

    function setDirectReconcile(terminalId: string) {
      directReconcile.value[terminalId] = false;
      setCookie('directReconcile', directReconcile.value, 150);
    }

    function showDirectReconcile(terminalId: string): boolean {
      const cookieValue = getCookie('directReconcile');

      if (!cookieValue) {
        return true;
      }

      try {
        const decoded = decodeURIComponent(cookieValue);
        const parsed = JSON.parse(decoded) as Record<string, boolean>;

        return parsed[terminalId] === undefined || parsed[terminalId] === true;
      } catch (e) {
        return true;
      }
    }

    function setDirectReconcileModal(value: boolean) {
      directReconcileModal.value = value;
    }

    return {
      announcements,
      directReconcile,
      directReconcileModal,
      hasLogged,
      isFirstTime,
      notifications,
      personal_link,
      profileVersion,
      setDirectReconcile,
      setDirectReconcileModal,
      setProfileVersion,
      setSpaLoading,
      setUserAuth,
      showDirectReconcile,
      showLogOut,
      spaLoading,
      tourActive,
      userAuth,
      version,
    };
  },
  {
    persist: {
      paths: [
        'announcements',
        'directReconcile',
        'directReconcileModal',
        'hasLogged',
        'isFirstTime',
        'personal_link',
        'showLogOut',
        'spaLoading',
        'userAuth',
        'version',
        'profile_version',
      ],
      storage: persistedState.localStorage,
    },
  }
);
