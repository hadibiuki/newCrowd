<template>
  <div dir="rtl" class="w-full lg:w-[21rem] bg-surface md:shadow-elevation-100 max-h-[70vh]">
    <div class="">
      <template v-if="loading">
        <SharedTerminalSkeleton v-for="i in 2" :key="i" dir="ltr" />
      </template>
      <div
        v-else-if="!loading && !userAuth.accounts.length"
        class="flex flex-col items-center px-md py-xl"
      >
        <ui-Illustration name="Placeholder" class="mb-xl" />
        <p class="font-medium text-body-400-b1 mb-sm">{{ $t('_empty.terminal.title') }}</p>
        <p class="text-body-400-b2 text-text-soft hidden">{{ $t('_empty.terminal.caption') }}</p>
      </div>
      <!-- list of terminals -->
      <div v-else dir="rtl" class="overflow-auto lg:max-h-[calc(70vh-56px)]">
        <div
          v-for="i in userAuth.accounts"
          :key="i?.id"
          dir="rtl"
          class="hover:bg-surface-hover rounded-sm active:bg-surface-pressed focus-visible:border focus-visible:border-interactive-focus m-xs cursor-pointer"
          @click="handleChangeTerminal(i)"
        >
          <!--  -->
          <div class="rounded-sm flex gap-sm justify-between items-start px-xs pt-xs">
            <div class="flex gap-sm truncate">
              <SharedTerminalLogo :logo="i?.have_logo ? i?.logo : undefined" />
              <div class="flex flex-col gap-2xs truncate">
                <div class="text-body-400-b2 font-medium text-text truncate">{{ i?.fullName }}</div>
                <div class="text-caption-400-c1 text-text-soft">
                  {{ i?.type === 1 ? 'حقوقی' : 'حقیقی' }}
                </div>
                <ui-Status
                  v-if="i?.isMainOwner && i?.type == 1"
                  text="مالک"
                  type="positive"
                  class="mt-2xs"
                />
                <ui-Status
                  v-if="!i.isMainOwner && i.type == 1"
                  text="اپراتور"
                  type="positive"
                  class="mt-2xs"
                />
              </div>
            </div>
            <ui-Icon
              v-if="i?.isLoginAccount"
              name="CheckMarkCircleFill"
              class="my-auto text-primary"
            />
          </div>
          <!-- badges -->
          <div class="flex justify-start pr-[60px] pb-md mt-sm">
            <div v-if="Number(i?.pin)">
              <ui-Divider type="vertical" :height="24" class="mx-sm" />
            </div>
            <div>
              <ui-Icon
                v-if="Number(i?.pin)"
                name="PinFill"
                class="w-md h-md text-zarin-dark !text-heading-600-h3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- new terminal -->
    <div
      v-if="isRealAccount"
      class="border-t border-t-border-divider p-xs sticky bottom-0 bg-surface"
    >
      <div>
        <ui-Button
          text="ارتقاء حساب به حقوقی"
          type="tertiary"
          block
          after-icon="Plus"
          @click="$router.push(addTerminalUrl())"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();
const { userAuth } = storeToRefs(authStore);
const { addTerminalUrl } = useAuth();
const router = useRouter();
const emits = defineEmits(['close']);
const loading = ref(false);
const handleChangeTerminal = (data: object) => {
  const isLegual = data?.type === 1;
  // setActiveTerminal(currentTerminal as TerminalType);
  const isMainOwner = data?.isMainOwner;
  isMainOwner ? localStorage.setItem('isMainOwner', true) : localStorage.removeItem('isMainOwner');
  isLegual ? localStorage.setItem('isLegual', data.id) : localStorage.removeItem('isLegual');
  router.go(0);
  emits('close');
  // router.push('/');
};
const isRealAccount = computed(() => {
  console.log({ userAuth: userAuth.value.accounts });
  if (!userAuth.value || !userAuth.value.accounts) {
    return false;
  }
  const realAccound = userAuth.value.accounts.filter(el => el.isLoginAccount)[0];
  if (realAccound.type !== 2) {
    return false;
  }
  const idOwner = userAuth.value.accounts.filter(el => el.isMainOwner);
  if (idOwner.length) {
    return false;
  }

  return true;
});
</script>
