<template>
  <div class="scroll-display pt-md w-[255px] h-full menu-items" dir="rtl">
    <!-- list -->
    <div dir="ltr" class="pb-xs mx-md">
      <div v-for="item in list" :key="item.label" :ref="item.active ? item.name : undefined">
        <div v-if="item.children" class="mb-xs">
          <ui-NavLink
            :icon="item.icon"
            :label="
              store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE
                ? item.label
                : ''
            "
            :arrow="store.navigateState === Nav.EXPANDED ? true : false"
            :class="[activeRoute(item.name) ? '!bg-surface-primary' : '', 'justify-end flex']"
            :active="activeRoute(item.name)"
            :disabled="item.disabled"
            :status="item.status"
            :is-open="item.open"
            @click="item.open = !item.open"
          />
          <span v-if="item.open && store.navigateState">
            <div
              v-for="(child, index) in item.children"
              :key="child.name"
              :ref="child.active ? child.name : undefined"
            >
              <NuxtLink
                :to="{ path: `/panel/${child.name}` }"
                class="mb-xs block relative"
                :class="{
                  'active-item': activeRoute(child.name),
                  'mt-xs': index === 0,
                }"
              >
                <ui-NavLink
                  :icon="child.icon"
                  :label="
                    store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE
                      ? child.label
                      : ''
                  "
                  :arrow="false"
                  :class="[
                    activeRoute(child.name) ? '!bg-surface-primary' : '',
                    'justify-end flex',
                  ]"
                  :active="activeRoute(child.name)"
                  :status="child.status"
                />
              </NuxtLink>
            </div>
          </span>
        </div>
        <NuxtLink
          v-else
          :to="item.children ? undefined : { path: `/panel/${item.name}` }"
          class="mb-xs block relative"
          :class="{
            'active-item': activeRoute(item.name),
          }"
          @click.prevent="onClickMenuItem(item)"
        >
          <div class="flex justify-end">
            <ui-NavLink
              v-if="store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE"
              :icon="item.icon"
              :label="
                store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE
                  ? item.label
                  : ''
              "
              :arrow="false"
              :loading="terminalLoading"
              :class="[activeRoute(item.name) ? '!bg-surface-primary' : '', 'justify-end flex']"
              :active="activeRoute(item.name)"
              :disabled="item.disabled"
              :status="item.status"
            />
            <ui-Tooltip v-else :content="item.label" position="left">
              <ui-NavLink
                :icon="item.icon"
                :arrow="false"
                :loading="terminalLoading"
                :class="[activeRoute(item.name) ? '!bg-surface-primary' : '', 'justify-end flex']"
                :active="activeRoute(item.name)"
                :disabled="item.disabled"
                :status="item.status"
              />
              <template v-if="item.status">
                <ui-Status
                  class="h-fit absolute -left-2xs bottom-[35px] !p-0"
                  :type="item.status.type"
                  dot
                />
              </template>
            </ui-Tooltip>
          </div>
        </NuxtLink>
      </div>
    </div>
    <ui-Divider v-if="showDivider" class="mb-md mx-md" />
    <!-- footerList -->
    <div class="mx-md" dir="ltr">
      <template v-for="item in footerList" :key="item.label">
        <NuxtLink
          v-if="item.active"
          :to="{
            path: `/panel/${item.name}`,
          }"
          class="relative"
          :class="{ 'active-item': activeRoute(item.name) }"
          @click.prevent="store.toggleNavigatorInSidebar"
        >
          <div :ref="item.name" class="flex my-xs justify-end">
            <ui-NavLink
              v-if="store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE"
              :icon="item.icon"
              :label="
                store.navigateState === Nav.EXPANDED || store.menuState === Status.VISIBLE
                  ? item.label
                  : ''
              "
              :arrow="false"
              class=""
              :class="[activeRoute(item.name) ? '!bg-surface-primary' : '', 'justify-end flex']"
              :active="_includes(route.name, item.name)"
            />
            <ui-Tooltip v-else :content="item.label" position="left">
              <ui-NavLink
                :icon="item.icon"
                label=""
                :arrow="false"
                class=""
                :class="[activeRoute(item.name) ? '!bg-surface-primary' : '', 'justify-end flex']"
                :active="_includes(route.name, item.name)"
              />
            </ui-Tooltip>
          </div>
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TerminalPermissionEnum } from '@/graphql/graphql';
const store = useNavigateStore();
const t = useI18n();
const authStore = useAuthStore();
interface MenuItem {
  open: any;
  name: string;
  icon: string;
  label: string;
  active: boolean;
  disabled: boolean;
  permission?: TerminalPermissionEnum;
  status?: {
    type: string;
    text: string;
    isHorizontal: boolean;
  };
  children?: MenuItem[];
}
const route = useRoute();
const menuItems = ref([
  {
    name: 'dashboard',
    icon: 'GridLayout',
    label: t('_common.links.dashboard'),
    active: true,
    disabled: false,
  },
  {
    name: 'investWrapper',
    icon: 'Referral',
    label: 'سرمایه‌گذاری',
    active: true,
    disabled: false,
    open: false,
    children: [
      {
        name: 'investments',
        icon: '',
        label: 'فرصت‌های سرمایه‌گذاری',
        active: true,
        disabled: false,
      },
      {
        name: 'investments/history',
        icon: '',
        label: 'سوابق سرمایه‌گذاری',
        active: true,
        disabled: false,
      },
    ],
  },
  {
    name: 'session',
    icon: 'Transaction',
    label: t('_common.links.session'),
    active: true,
    disabled: false,
  },
  {
    name: 'referral',
    icon: 'Referral',
    label: t('_common.links.referral_code'),
    active: true,
    disabled: false,
  },
]);
const list = computed<MenuItem[]>(() => menuItems.value);
const footerList = computed(() => {
  if (authStore.userAuth && authStore.userAuth.type === 1) {
    return [
      {
        name: 'settings',
        icon: 'SettingsRound',
        permission: true,
        label: 'تنظیمات حساب حقوقی',
        active: true,
      },
    ];
  }
});
const activeRoute = (name: string) => {
  if (name === 'payout' || name === 'instant-payout') {
    return name === 'payout'
      ? _includes(route.name, 'payout') && !_includes(route.name, 'instant-payout')
      : _includes(route.name, 'instant-payout');
  } else if (name === 'dashboard') {
    return _includes(route.name, 'daily-records') || _includes(route.name, 'dashboard');
  } else if (name === 'investments/history' || name === 'history') {
    return _includes(route.name, 'investments/history') || _includes(route.name, 'history');
  } else {
    return _includes(route.name, name);
  }
};
const onClickMenuItem = (item: MenuItem) => {
  if (item.disabled) {
    return;
  }
  store.toggleNavigatorInSidebar();
};
</script>

<style lang="scss" scoped>
.scroll-display {
  @apply bg-surface overflow-scroll relative w-full;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
@keyframes itemTextContent {
  0% {
    width: 0;
  }
  30% {
    width: 0;
  }
  90% {
    width: 100%;
  }
}
.anime {
  animation-name: itemTextContent;
  animation-duration: 1s;
}
.active-item:before {
  content: '';
  width: 5px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  @apply absolute h-2xl bg-primary rounded-tl-xl rounded-bl-xl  right-[-16px] top-[4px];
}
</style>
