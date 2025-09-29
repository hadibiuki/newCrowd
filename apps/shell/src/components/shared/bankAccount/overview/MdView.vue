<template>
  <ui-Modal
    close-icon
    :text="$t('_bank_account.title')"
    class="w-full lib-view h-full lg:max-w-[992px] lg:max-h-[700px]"
    @close="closeModal"
  >
    <template #body>
      <div v-if="accountList" class="flex justify-between mb-xl">
        <span class="font-bold flex items-center">
          {{ selectedLabel }}
        </span>
        <ui-Button
          v-if="windowSize >= 400"
          before-icon="Plus"
          type="light"
          :text="buttonText"
          @click="addAccount"
        />
        <ui-Button v-else icon="Plus" type="light" @click="addAccount" />
      </div>
      <div class="lib-view__body">
        <ui-TextField
          v-if="!showCheckAccount && !showAddAccount"
          ref="searchRef"
          v-model="store.searchText"
          :placeholder="$t('_form.search.title')"
          :label="false"
          :after-icon="store.searchText ? 'DeleteFill' : ''"
          auto-focus
          before-icon="Search"
          name="accountSearch"
          class="search-input"
          @button-action="handleClear"
          @input="handleSearch"
        />
        <template v-if="accountList">
          <SharedBankAccountOverviewTabs
            :link-value="linkValue"
            :selected-bank-account="selectedBankAccount"
            :tabs="navLinkValue"
            :data="data"
            @clear="handleClear"
            @select="clickRow"
          />
        </template>

        <SharedBankAccountOverviewCheck
          v-if="showCheckAccount"
          :loading-check="loadingCheck"
          :nav-link="linkValue"
          :show-alert-checking="showAlertChecking"
          @submit="onSubmit"
        />
      </div>
    </template>
  </ui-Modal>
</template>

<script setup lang="ts">
import { debounce } from 'lodash';
import { BankAccountTypeEnumCustom } from '@/types/bankAccountCustomTypes';
import { addBankAccountApi, getBankAccountsApi, setCartAsLegualDefaultApi } from '~/restApi/bancAccount';
const bankAccountListStoe = useBankAccountList();
const { $notify } = useNuxtApp();
type step = 'list' | 'check' | 'add';
export interface Props {
  selectable?: boolean;
  isShare?: boolean;
  selectedBankAccount: BankAccount | undefined;
}
const store = useBankAccountStore();
const accountList = ref(true);
const showCheckAccount = ref();
const showAddAccount = ref();
const isCardPan = ref();
const selectedIban = ref();
const selectedBank = ref();
const showAlertChecking = ref(false);
const lastStep = ref<step>();
const config = useRuntimeConfig();
const currentPage = ref(config.public.page);
const t = useI18n();
const props = withDefaults(defineProps<Props>(), {});
const { isShare, selectedBankAccount } = toRefs(props);
const linkValue = ref(
  isShare.value ? BankAccountTypeEnumCustom.All : BankAccountTypeEnumCustom.Personal
);
const addAccount = () => {
  resetStates();
  accountList.value = false;
  showCheckAccount.value = true;
};
const disableSubmitButton = ref(false);
const searchRef = ref();
const emit = defineEmits(['close', 'select', 'bankAccountData']);
const closeModal = () => {
  emit('close');
};
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

const resetStates = () => {
  showCheckAccount.value = false;
  showAddAccount.value = false;
};
const focusHandler = () => {
  nextTick(() => {
    searchRef.value.inputRef.focus();
  });
};
const handleSearch = debounce(() => {
  currentPage.value = 1;
  data.value = originData.value.filter(
    item =>
      item.shebaNumber.includes(store.searchText) || item.cardNumber.includes(store.searchText)
  );
}, 500);
const handleClear = () => {
  store.searchText = '';
  data.value = originData.value;
  focusHandler();
};
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
const { windowSize } = useSize();
const loadingCheck = ref(false)
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
const selectedLabel = computed(
  () => navLinkValue.value.find(i => i.value === linkValue.value)?.title
);
const buttonText = computed(() => t('_bank_account.add'));
const clickRow = (item: BankAccount) => {
  if (item.status !== BankAccountStatusEnum.ACTIVE) {
    return;
  }
  selectedBank.value = item;
  setCartAsLegualDefaultApi(item.id);
  emit('select', selectedBank.value);
  store.selectedBankaccount = selectedBank.value;
};
provide('goBackToStepOne', goBackToStepOne);
</script>

<style lang="scss" scoped>
.lib-view {
  &__body {
    @apply space-y-md;
  }
  .modal__body {
    @apply relative h-[calc(100vh-56px)] lg:h-[69.5vh];
  }
  .modal__body__slot {
    @apply relative lg:h-full;
  }
  .modal__footer {
    @apply z-10 bg-surface;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
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
</style>
