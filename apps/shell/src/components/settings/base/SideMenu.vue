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
import {
  TerminalFlagEnum,
  Maybe,
  TerminalStatusEnum,
  TerminalPermissionEnum,
} from '@/graphql/graphql';

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
  flag: Maybe<TerminalFlagEnum>;
  loading?: boolean;
  isOwner: boolean;
  hasZarinGates: boolean;
  status: TerminalStatusEnum;
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
const { flag, loading, isOwner, hasZarinGates, status } = toRefs(props);
const { isCandidateDirectReconcile, isActiveDirectReconcile, hadActiveDirectReconcile } =
  useDirectReconcile();
const t = useI18n();
const route = useRoute();
const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.CardHolderInquiry);
const menu: MenuItem[] = [
  {
    section: SectionTypes.Info,
    subMenu: [
      {
        title: t('_common.slug.port_specifications'),
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
        title: t('_common.slug.account_period'),
        icon: 'CreditCardUser-1',
        value: Menu.Account,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
      {
        title: t('_common.slug.fee_settings'),
        icon: 'Switches',
        value: Menu.Fee,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
    ],
  },
  {
    section: SectionTypes.Support,
    subMenu: [
      {
        title: t('_common.slug.phone_support'),
        icon: 'Phone',
        value: Menu.Contact,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
      {
        title: t('_common.slug.technical_setting'),
        icon: 'Website',
        value: Menu.TechnicalSetting,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
      {
        title: t('_common.slug.service_payment'),
        icon: 'MenuBlockCheckmark',
        value: Menu.Service,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
    ],
  },
  {
    section: SectionTypes.Permission,
    subMenu: [
      {
        title: t('_common.slug.level'),
        icon: 'UserProfile',
        value: Menu.Permission,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
    ],
  },
  {
    section: SectionTypes.Ayan,
    title: t('_terminal.services'),
    subMenu: [
      {
        title: t('_terminal.chnType.ayan'),
        icon: 'UserAyan',
        value: Menu.Ayan,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
      {
        title: t('_common.links.zarin_link'),
        icon: 'PaymentLinksSetting',
        value: Menu.Zarin_Link,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
      {
        title: t('_common.page_title.direct_reconcile'),
        icon: 'ThunderLightningCircle',
        value: Menu.DirectReconcile,
        disabled: status.value === TerminalStatusEnum.Pending,
      },
    ],
  },
];
const menus = computed<MenuItem[]>(() => {
  let filteredMenu = [...menu];
  if (flag.value === TerminalFlagEnum.PersonalLink) {
    filteredMenu = filteredMenu.filter(item => item.section !== SectionTypes.Support);
  }
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
  if (
    (!isActiveDirectReconcile.value &&
      !isCandidateDirectReconcile.value &&
      !hadActiveDirectReconcile.value) ||
    (!isActiveDirectReconcile.value &&
      isCandidateDirectReconcile.value &&
      hadActiveDirectReconcile.value)
  ) {
    filteredMenu = filteredMenu.map(item => {
      if (item.section === SectionTypes.Ayan) {
        item.subMenu = item.subMenu.filter(subItem => subItem.value !== Menu.DirectReconcile);
      }

      return item;
    });
  }
  if (isActiveDirectReconcile.value) {
    filteredMenu = filteredMenu.map(item => {
      if (item.section === SectionTypes.Ayan) {
        item.subMenu = item.subMenu.filter(
          subItem => subItem.value !== Menu.Ayan && subItem.value !== Menu.Zarin_Link
        );
      }
      if (item.section === SectionTypes.Account) {
        item.subMenu = item.subMenu.filter(subItem => subItem.value !== Menu.Fee);
      }

      return item;
    });
  }
  if (!hasPermission.value) {
    filteredMenu = filteredMenu.map(item => {
      if (item.section === SectionTypes.Ayan) {
        item.subMenu = item.subMenu.filter(subItem => subItem.value !== Menu.Ayan);
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
