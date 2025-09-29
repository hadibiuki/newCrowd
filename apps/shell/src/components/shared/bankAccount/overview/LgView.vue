<template>
  <ui-Modal
    close-icon
    :text="$t('_bank_account.title')"
    class="w-full lib-view lg:max-w-[992px] max-h-[700px] min-h-[65vh]"
    main-class="select-bank-account"
    @close="closeModal"
  >
    <template #body>
      <div class="grid grid-cols-[265px_1fr] h-full">
        <!-- sidebar -->
        <div class="relative border-l border-border-soft overflow-x-hidden overflow-y-auto">
          <div class="w-[265px] space-y-md px-md py-md border-l border-border-soft">
            <ui-TextField
              v-if="!showCheckAccount"
              ref="searchRef"
              v-model="store.searchText"
              :placeholder="$t('_form.search.title')"
              :after-icon="store.searchText ? 'DeleteFill' : ''"
              :label="false"
              auto-focus
              before-icon="Search"
              name="accountSearch"
              class="search-input"
              @button-action="handleClear"
              @input="handleSearch"
            />
            <div dir="ltr">
              <ui-NavLink
                v-for="i in navLinkValue"
                :key="i.label"
                :label="i.label"
                :active="i.active"
              >
              </ui-NavLink>
            </div>
          </div>
        </div>
        <!-- content -->
        <div class="overflow-auto pt-md pb-2xl px-2xl relative">
          <!-- header -->
          <div v-if="accountList" class="flex justify-between items-center mb-md h-[72px]">
            <span class="font-bold flex items-center">
              {{ selectedLabel }}
            </span>
            <ui-Button before-icon="Plus" type="light" :text="buttonText" @click="addAccount" />
          </div>
          <!-- empty state & no result -->
          <div
            v-if="showEmptyState"
            class="border border-border-soft px-md py-2xl rounded-sm max-w-[648px]"
          >
            <ui-EmptyState
              v-if="_isEmpty(store.searchText)"
              :title="
                linkValue === BankAccountTypeEnumCustom.Share
                  ? $t('_empty.partner.title')
                  : $t('_empty.bank_account.title')
              "
              :description="
                linkValue === BankAccountTypeEnumCustom.Share
                  ? $t('_empty.partner.caption')
                  : $t('_empty.bank_account.caption')
              "
              vector="StakedBankCards"
            />

            <ui-EmptyState
              v-else
              :title="$t('_common.empty.titleNoResult')"
              :description="$t('_common.empty.descriptionNoResult')"
              vector="NoResult"
            >
              <template #action>
                <div class="flex justify-center">
                  <ui-Button
                    after-icon="Trash"
                    :text="$t('_common.buttons.removeFilters')"
                    type="secondary"
                    @click="handleClear"
                  />
                </div>
              </template>
            </ui-EmptyState>
          </div>
          <!-- table -->
          <div v-if="loading || (filteredData?.length && accountList)" class="flex flex-col gap-md">
            <ui-Table
              :loading="loading"
              :columns="columns"
              :items="filteredData"
              :is-pointer="false"
              @hover-row="handleHoverRow"
              @click-row="clickRow"
            >
              <!-- iban template -->
              <template #item-iban="{ shebaNumber, bankInformation, holderName }">
                <div class="flex items-center gap-sm">
                  <div
                    v-if="bankInformation?.english_name"
                    class="h-[40px] w-[40px] border border-border-soft bg-surface-soft rounded-md p-xs"
                  >
                    <ui-BankLogo :name="bankInformation.english_name.charAt(0).toUpperCase() + bankInformation.english_name.slice(1)" class="w-[24px] h-[24px]" />
                  </div>
                  <ui-Avatar v-else shape="square" type="Box" />
                  <div class="flex flex-col gap-2xs">
                    <span class="font-Mono">{{ shebaNumber }}</span>
                    <span class="text-caption-400-c1 text-text-soft">{{ holderName }}</span>
                  </div>
                </div>
              </template>
              <!-- slug column template -->
              <template #item-slug="{ bankInformation }">
                <div class="flex items-center gap-sm">
                  <span v-if="bankInformation.name">
                    {{ replace(bankInformation.name, 'بانک', '') }}
                  </span>
                </div>
              </template>
              <template #item-status="{ status }">
                <div class="flex items-center gap-md">
                  <ui-Status
                    :text="getStatusInfo(status).text"
                    :type="getStatusInfo(status).type"
                  />
                </div>
              </template>
              <!-- amount header template -->
              <template #column-amount="header">
                <ui-Skeleton :loading="loading" :width="40" class="mt-2xs">
                  <div class="h-fit flex -mt-2xs md:w-5xl lg:w-6xl xl:w-full">
                    <span class="truncate text-text">{{ header.label }}</span>
                    <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs" />
                  </div>
                </ui-Skeleton>
              </template>

              <!-- loading template -->
              <template #loadingSkeleton>
                <div v-for="index in 8" :key="index" class="loading">
                  <div
                    class="grid border-t border-t-border-divider"
                    style="grid-template-columns: 50% 25% 25%"
                  >
                    <div class="my-auto">
                      <div class="flex items-center gap-sm px-md py-md">
                        <ui-Skeleton :width="40" :height="40" radius="sm" />
                        <div class="flex flex-col">
                          <ui-Skeleton :width="200" class="pb-2xs" />
                          <ui-Skeleton :width="80" />
                        </div>
                      </div>
                    </div>
                    <div class="my-auto">
                      <ui-Skeleton :width="60" class="px-md py-md" />
                    </div>
                    <div class="my-auto">
                      <ui-Skeleton :width="60" class="px-md py-md" />
                    </div>
                  </div>
                </div>
              </template>
            </ui-Table>
          </div>

          <SharedBankAccountOverviewCheck
            v-if="showCheckAccount"
            :loading-check="loadingCheck"
            :nav-link="linkValue"
            :show-alert-checking="showAlertChecking"
            @submit="onSubmit"
          />
        </div>
      </div>
    </template>
  </ui-Modal>
</template>

<script setup lang="ts">
import { debounce, replace } from 'lodash';
import { BankAccountTypeEnumCustom } from '@/types/bankAccountCustomTypes';
import { BankAccountTypeEnum } from '@/graphql/graphql';
import {
  addBankAccountApi,
  getBankAccountsApi,
  setCartAsLegualDefaultApi,
} from '~/restApi/bancAccount';
import { BankAccountStatusEnum } from '~/composables/bank/useBankAccountStatus';
const bankAccountListStoe = useBankAccountList();
type step = 'list' | 'check' | 'add';
export interface Props {
  selectable?: boolean;
  isShare?: boolean;
  selectedBankAccount: BankAccount | undefined;
}

const store = useBankAccountStore();
const emit = defineEmits(['close', 'select']);
const closeModal = () => {
  emit('close');
};
const { $notify } = useNuxtApp();
const t = useI18n();
const { columns } = useBankAccountColumns();
const { getStatusInfo } = useBankAccountStatus();
const isCardPan = ref();
const { schema } = useBankSchema({ isCardPan });
const { errors, meta } = useForm({
  validationSchema: schema,
});
const loading = ref(false)
const props = withDefaults(defineProps<Props>(), {});
const { isShare, selectedBankAccount } = toRefs(props);
const showAlertChecking = ref(false);
const disableSubmitButton = ref(false);
const selectedIban = ref();
const selectedBank = ref();
const hoverId = ref();
const showCheckAccount = ref();
const accountList = ref(true);
const lastStep = ref<step>();
const isUserBankAccount = inject('isUserBankAccount');
const linkValue = ref(
  isShare.value ? BankAccountTypeEnumCustom.All : BankAccountTypeEnumCustom.Personal
);
const config = useRuntimeConfig();
const currentPage = ref(config.public.page);
const searchRef = ref();
const data = ref([]);
const originData = ref([]);
onMounted(() => {
  data.value = bankAccountListStoe.get || [];
  originData.value = bankAccountListStoe.get || [];
  if (selectedBankAccount.value) {
    selectedBank.value = selectedBankAccount.value;
  } else {
    selectedBank.value = store.selectedBankaccount;
  }
  selectedIban.value = selectedBank.value?.id;
  disableSubmitButton.value = true;
});
const goBackToStepOne = () => {
  resetStates();
  switch (lastStep.value) {
    case 'check':
      nextTick(() => {
        showCheckAccount.value = true;
      });
      lastStep.value = undefined;
      break;
    default:
      accountList.value = true;
      break;
  }
};
const handleSearch = debounce(() => {
  currentPage.value = 1;
  data.value = originData.value.filter(
    item =>
      item.shebaNumber.includes(store.searchText) || item.cardNumber.includes(store.searchText)
  );
}, 500);
const filteredData = computed(() => data?.value);
const accountLength = computed(() => {
  const personalLength =
    data?.value &&
    _filter(
      data?.value,
      (item: { type: BankAccountTypeEnum }) => item.type === BankAccountTypeEnumCustom.Personal
    ).length;
  const shareLength =
    data?.value &&
    _filter(
      data?.value,
      (item: { type: BankAccountTypeEnum }) => item.type === BankAccountTypeEnumCustom.Share
    ).length;

  return {
    [BankAccountTypeEnumCustom.All]: data?.value,
    [BankAccountTypeEnumCustom.Personal]: personalLength,
    [BankAccountTypeEnumCustom.Share]: shareLength,
  };
});
const navLinkValue = computed(() => [
  {
    label: t('_bank_account.all'),
    title: t('_bank_account.title'),
    meta: `(${accountLength.value[BankAccountTypeEnumCustom.All]})`,
    active: linkValue.value === BankAccountTypeEnumCustom.All,
    value: BankAccountTypeEnumCustom.All,
  },
]);
const handleClear = () => {
  store.searchText = '';
  data.value = originData.value;
  focusHandler();
};
const focusHandler = () => {
  nextTick(() => {
    searchRef.value.inputRef.focus();
  });
};
const selectedLabel = computed(() => {
  if (store.searchText) {
    return t('_common.slug.search_for', { data: store.searchText });
  }

  return navLinkValue.value.find(i => i.value === linkValue.value)?.title;
});
const resetStates = () => {
  showCheckAccount.value = false;
};
const addAccount = () => {
  resetStates();
  accountList.value = false;
  showCheckAccount.value = true;
};
const loadingCheck = ref(false);
const onSubmit = (pan: any) => {
  loadingCheck.value = true;
  isCardPan.value = pan;
  // eslint-disable-next-line promise/catch-or-return
  addBankAccountApi(
    {
      cardNumber: isCardPan.value,
    },
    false
  )
    // eslint-disable-next-line promise/always-return
    .then(() => {
      showCheckAccount.value = false;
      lastStep.value = 'check';
      accountList.value = true;

      // eslint-disable-next-line promise/catch-or-return, promise/no-nesting
      getBankAccountsApi({}, false).then(res => {
        // eslint-disable-next-line promise/always-return
        data.value = res?.data?.items || [];
        bankAccountListStoe.fill(data.value.items);
      });
    })
    .catch((err: Error) => {
      $notify({
        isRead: false,
        message: err?.details?.meta?.errorMessage || err?.message,
        type: 'error',
      });
      showAlertChecking.value = true;
    })
    .finally(() => {
      loadingCheck.value = false;
    });
};
const clickRow = (item: BankAccount) => {
  if (item.status !== BankAccountStatusEnum.ACTIVE || isUserBankAccount) {
    return;
  }
  selectedBank.value = item;
  setCartAsLegualDefaultApi(item.id);
  emit('select', selectedBank.value);
  store.selectedBankaccount = selectedBank.value;
};
const buttonText = computed(() => t('_bank_account.add'));
const showEmptyState = computed(
  () => !filteredData.value?.length && !showCheckAccount.value && !loading.value
);
const handleHoverRow = (event: Event, row: BankAccount) =>
  event.type === 'mouseenter' ? (hoverId.value = row.id) : (hoverId.value = null);
provide('loading', loading);
provide('goBackToStepOne', goBackToStepOne);
provide('form_errors', errors);
provide('form_meta', meta);
</script>

<style lang="scss" scoped>
.lib-view {
  &__body {
    @apply space-y-md overflow-hidden;
  }
  .input__inner__icon--after {
    @apply cursor-pointer text-text-soft;
  }
  .modal__body__slot {
    @apply relative;
  }
  .modal__footer {
    @apply z-10 bg-surface;
  }
  .input__inner--default {
    @apply border-border-divider;
  }
}
:deep(.pin__color) {
  i {
    @apply text-zarin;
    @apply fill-zarin;
  }
}
.search-input {
  input {
    @apply py-2xs pr-0 #{!important};
  }
  .input__inner__icon--before {
    @apply my-2xs ml-2xs;
  }
  .input__inner__icon--after {
    @apply my-2xs ml-2xs;
  }
}
.select-bank-account {
  @apply overflow-hidden;
}
:deep(.modal__body__slot) {
  @apply p-0;
}
</style>
