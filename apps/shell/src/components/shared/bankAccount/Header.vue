<template dir="rtl">
  <div>
    <div
      class="border border-border mt-xl rounded-[6px]"
      :class="[
        disabled || (!isUserBankAccount && loading) ? 'cursor-not-allowed' : 'cursor-pointer',
        isUserBankAccount ? 'px-md py-lg' : 'pt-sm pb-md px-sm',
        bankValue?.id || isUserBankAccount ? 'border-solid' : 'border-dashed',
        disabled ? 'bg-surface-soft' : 'hover:bg-border-soft bg-transparent',
      ]"
      dir="rtl"
      @click="showBankAccountModal"
    >
      <div
        v-if="!isUserBankAccount"
        class="text-caption-400-c1 font-medium text-right mb-sm"
        :class="[disabled ? 'text-text-disabled' : 'text-text-soft']"
      >
        <ui-Skeleton :loading="loading" :width="56">
          {{ $t('_form.add_payout.bank_account_settlement_title') }}
        </ui-Skeleton>
      </div>
      <div class="flex justify-between">
        <div class="flex sm:flex-row flex-col gap-sm sm:items-center items-start">
          <template v-if="!isUserBankAccount">
            <ui-Skeleton v-if="loading" :width="56" :height="40" radius="sm" />
            <div v-else class="relative" :class="[disabled ? 'opacity-60' : 'opacity-100']">
              <template v-if="bankValue?.bankInformation?.logo_path">
                <ui-Illustration
                  name="BankAccount"
                  class="w-[56px] h-[40px] border border-white-40 rounded-sm"
                  :style="{
                    opacity: '0.15',
                    backgroundColor:
                      bankColors[
                        (bankValue.bankName.charAt(0) +
                          bankValue.bankName.slice(1).toLowerCase()) as keyof typeof bankColors
                      ],
                  }"
                />
                <ui-BankLogo
                  class="w-[14px] h-[14px] absolute right-[5px] top-2xs"
                  :name="bankValue.bankName.charAt(0) + bankValue.bankName.slice(1).toLowerCase()"
                />
              </template>
              <ui-Illustration v-else name="EmptyBank" class="w-[56px] h-[40px]" />
            </div>
            <div v-if="loading" class="flex flex-col">
              <ui-Skeleton :width="104" :height="12" />
            </div>
            <div v-else>
              <div
                v-if="!bankValue?.id"
                class="text-text-soft text-body-400-b3 font-medium text-right"
              >
                {{ $t('_form.settings.select_bank_account') }}
              </div>
              <div v-else class="flex flex-col gap-2xs">
                <span
                  class="font-Mono text-body-400-b2 max-w-[220px] break-words break-all sm:max-w-none"
                  :class="[disabled ? 'text-text-disabled' : 'text-text']"
                >
                  {{ formatIban(bankValue?.shebaNumber as string) }}
                </span>
                <span
                  class="text-caption-400-c1"
                  :class="[disabled ? 'text-text-disabled' : 'text-text-soft']"
                >
                  {{ bankValue?.holderName }} |
                  {{ bankValue?.bankInformation.name }}
                </span>
              </div>
            </div>
          </template>
          <div v-else class="flex items-center">
            <ui-Illustration name="WalletBankCards" class="w-[64px] h-[64px]" />
            <div class="flex flex-col gap-xs pr-md">
              <p>{{ $t('_bank_account.title') }}</p>
              <p class="text-body-400-b2 font-normal text-text-soft">
                {{ $t('_bank_account.subTitle_user') }}
              </p>
            </div>
          </div>
        </div>
        <div v-if="!disabled" class="flex items-center">
          <ui-Skeleton v-if="!isUserBankAccount && loading" :width="24" :height="24" />
          <ui-Icon v-else name="AngleLeft" />
        </div>
      </div>
    </div>
    <SharedBankAccountOverview
      v-if="showBankAccount"
      v-model:lg="lg"
      :selected-bank-account="selectedBankAccount"
      :selectable="true"
      :is-share="isShare"
      @close="toggleModal"
      @select="selectedBank"
      @bank-account-data="onUpdateBankAccount"
    />
  </div>
</template>
<script setup lang="ts">
import { colors } from '../../../../tailwind.config';
import { useBankQuery } from '@/composables/bank/useBankQuery';
import { BankAccount } from '@/graphql/graphql';
import { getBankInfoByNameApi } from '~/restApi/bancAccount';

const bankColors = colors?.colors.bank;
const showBankAccount = ref<boolean>(false);
export interface Props {
  isShare?: boolean;
  disabled?: boolean;
  isUserBankAccount?: boolean;
  loading?: boolean;
  selectedBankAccount: BankAccount | undefined;
  showDirectReconcileBanks?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  isShare: true,
  selectedBankAccount: undefined,
  isUserBankAccount: false,
  showDirectReconcileBanks: false,
});
const { selectedBankAccount, loading, isUserBankAccount, disabled, showDirectReconcileBanks } =
  toRefs(props);
const emit = defineEmits(['bankAccountData', 'select', 'close']);
const bancAccountChangeHandler = () => {
  showBankAccount.value = false;
  if (!selectedBankAccount.value) {
    nextTick(() => {
      bankValue.value = store.selectedBankaccount as unknown as BankAccount;
    });
    store.selectedBankAccountId = bankValue.value?.id;
  }
  if (selectedBankAccount.value) {
    nextTick(() => {
      bankValue.value = selectedBankAccount.value;
    });
    store.selectedBankAccountId = bankValue.value?.id;
  }
};
onMounted(() => {
  bancAccountChangeHandler();
});
const bankValue = ref<BankAccount>();
const toggleModal = () => {
  showBankAccount.value = !showBankAccount.value;
};
const store = useBankAccountStore();
const selectedBank = (item: BankAccount) => {
  bankValue.value = item;
  store.selectedBankAccountId = bankValue.value.id;
  emit('select', bankValue.value);
  showBankAccount.value = false;
};
const { useBankAccount } = useBankQuery();
const { data } = useBankAccount();
const { lg, windowSize } = useSize();
const onUpdateBankAccount = (bankAccountList: BankAccount[]) => {
  emit('bankAccountData', bankAccountList);
};

watch(
  () => selectedBankAccount.value,
  () => {
    bancAccountChangeHandler();
  }
);
const formatIban = (iban: string) => {
  if (windowSize.value < 485) {
    return iban;
  }

  return iban.replace(
    /^(IR)(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})(\d{4})(\d{2})$/,
    '$1 - $2 $3 $4 $5 $6 $7 $8'
  );
};
const showBankAccountModal = () => {
  if (disabled.value) {
    return;
  }
  showBankAccount.value = true;
};

provide('toggleModal', toggleModal);
provide('data', data);
provide('isUserBankAccount', isUserBankAccount.value);
provide('showDirectReconcileBanks', showDirectReconcileBanks);
</script>
