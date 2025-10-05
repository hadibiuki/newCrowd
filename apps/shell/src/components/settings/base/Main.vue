<template>
  <div class="flex flex-col-reverse lg:flex-row justify-between gap-md">
    <ui-Card class="w-full h-full">
      <template #main>
        <SettingsBaseAccount v-if="route.query.menu === TerminalSettingsMenus.Account" />
        <SettingsBasePhoneNumber v-else-if="route.query.menu === TerminalSettingsMenus.Contact" />
        <SettingsBasePortspecifications v-else />
      </template>
    </ui-Card>

    <div ref="menuRef">
      <SettingsBaseSideMenu
        :loading="loading"
        :is-owner="isOwner"
        :has-zarin-gates="hasZarinGates"
        @action="smoothScrollToContainer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TopBarElementType } from '@zarinpal/ui/src/components/topbar/Topbar.vue';

enum TerminalSettingsMenus {
  TerminalSettings = 'TerminalSettings',
  Account = 'Account',
  Service = 'Service',
  Contact = 'Contact',
  TechnicalSetting = 'TechnicalSetting',
  Fee = 'Fee',
  UserAyan = 'userAyan',
  Permission = 'Permission',
  Zarin_Link = 'ZarinLink',
  DirectReconcile = 'DirectReconcile',
}
const { $notify } = useNuxtApp();
const { md } = useSize();
const route = useRoute();
const router = useRouter();
const t = useI18n();
const { data: userData, loading: userLoading } = useUserIdQuery();
const menuRef = ref();
const topBarRef = inject<Ref<TopBarElementType>>('topBarRef');
const redirectToTerminalSettings = () => {
  $notify({
    isRead: false,
    message: t('_common.permission.not_access_this_page'),
    type: 'error',
  });

  return router.push({
    query: { menu: undefined },
  });
};
const smoothScrollToContainer = () => {
  if (md.value && !!menuRef.value) {
    setTimeout(() => {
      scrollToItem();
    }, 0);
  }
};
const scrollToItem = () => {
  const scrollOffset = topBarRef?.value.calcTopBarHeight();
  const targetHeight = menuRef.value.getBoundingClientRect().height;
  window.scrollTo({
    top: targetHeight + scrollOffset,
    behavior: 'smooth',
  });
};
const isOwner = computed(() => userData.value?.id);
const loading = computed(() => userLoading.value);
onMounted(() => {
  smoothScrollToContainer();
});

watch(
  [() => route.query],
  () => {
    if (
      !isOwner.value &&
      [TerminalSettingsMenus.Permission, TerminalSettingsMenus.UserAyan].includes(
        route.query.menu as TerminalSettingsMenus
      )
    ) {
      redirectToTerminalSettings();
    }
  },
  { immediate: true }
);
</script>
