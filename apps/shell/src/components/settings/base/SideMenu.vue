<template>
  <div class="w-full lg:w-[292px]">
    <template v-for="item in menus" :key="item.section">
      <p
        v-if="item.title && !loading && item.subMenu.length"
        dir="rtl"
        class="text-text-soft text-body-400-b3 p-sm pt-0"
      >
        {{ item.title }}
      </p>
      <ui-Card v-if="item.subMenu.length" class="mb-sm !p-sm">
        <template #main>
          <div v-if="loading">
            <ui-NavLink v-for="sub in 2" :key="sub" :icon="sub" :label="sub" :loading="loading" />
          </div>
          <div v-else>
            <NuxtLink
              v-for="sub in item.subMenu"
              :key="sub.value"
              :to="(!sub.disabled && { path: 'settings', query: { menu: sub.value } }) || undefined"
            >
              <ui-NavLink
                :icon="sub.icon"
                :label="sub.title"
                :active="route.query.menu === sub.value"
                :disabled="sub.disabled"
                @click="emits('action')"
              />
            </NuxtLink>
          </div>
        </template>
      </ui-Card>
    </template>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

enum Menu {
  TerminalSettings = 'TerminalSettings',
  Account = 'Account',
  Fee = 'Fee',
  Contact = 'Contact',
  TechnicalSetting = 'TechnicalSetting',
  Service = 'Service',
  Permission = 'Permission',
  Ayan = 'userAyan',
  Zarin_Link = 'ZarinLink',
  DirectReconcile = 'DirectReconcile',
}
enum SectionTypes {
  Info,
  Account,
  Support,
  Permission,
  Ayan,
}
interface Props {
  loading?: boolean;
  isOwner: boolean;
  hasZarinGates: boolean;
  status: string;
}
interface SubMenu {
  title: string;
  icon: string;
  value?: Menu;
  disabled: boolean;
}

interface MenuItem {
  section: SectionTypes;
  title?: string;
  subMenu: SubMenu[];
}
const props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits(['action']);
const { loading, isOwner, hasZarinGates } = toRefs(props);
const route = useRoute();
const menu: MenuItem[] = [
  {
    section: SectionTypes.Info,
    subMenu: [
      {
        title: 'مشخصات حساب',
        icon: 'DocumentText',
        value: undefined,
        disabled: false,
      },
    ],
  },
  {
    section: SectionTypes.Account,
    subMenu: [
      {
        title: 'حساب‌های بانکی حقوقی',
        icon: 'CreditCardUser-1',
        value: Menu.Account,
        disabled: false,
      },
    ],
  },
  {
    section: SectionTypes.Support,
    subMenu: [
      {
        title: 'اپراتورها',
        icon: 'Phone',
        value: Menu.Contact,
        disabled: false,
      },
    ],
  },
];
const menus = computed<MenuItem[]>(() => {
  let filteredMenu = [...menu];
  if (!isOwner.value) {
    filteredMenu = filteredMenu.filter(
      item => item.section !== SectionTypes.Permission && item.section !== SectionTypes.Ayan
    );
  }
  if (!hasZarinGates.value) {
    filteredMenu = filteredMenu.map(item => {
      if (item.section === SectionTypes.Support) {
        return {
          ...item,
          subMenu: item.subMenu.filter(subItem => subItem.value !== Menu.Service),
        };
      }

      return item;
    });
  }
  let cleanedMenu = filteredMenu;
  if (authStore.profileVersion) {
    cleanedMenu = filteredMenu.map(section => ({
      ...section,
      subMenu: section.subMenu.filter(
        item =>
          item.value !== Menu.Fee && item.value !== Menu.Ayan && item.value !== Menu.Zarin_Link
      ),
    }));
  }

  return cleanedMenu;
});
</script>
