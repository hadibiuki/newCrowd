<template>
  <div class="mb-xl text-heading-600-h2 text-text" dir="rtl">
    {{ $t('_common.slug.account_period') }}
  </div>
  <div class="flex justify-between gap-md" dir="rtl">
    <div class="text-text-soft text-body-400-b3 font-medium text-right">
      {{ $t('_helper.settings.period_description') }}
    </div>
  </div>
  <SharedBankAccountHeader
    :is-share="false"
    :loading="false"
    :selected-bank-account="selectedBankAccount"
    @select="onSelectBankAccount"
    @bank-account-data="bankAccount"
  />
</template>
<script setup lang="ts">
import { getBankAccountsApi } from '~/restApi/bancAccount';

const useBankAccountListStore = useBankAccountList();
const data = ref([]);
onMounted(() => {
  init();
});
const init = async () => {
  const res = await getBankAccountsApi();
  data.value = res?.data?.items || [];
  useBankAccountListStore.fill(data.value);
  const selected = data.value.filter(item =>item.isDefaultWithdraw)[0]
  selectedBankAccount.value = selected;
};
const disableSubmit = ref<boolean>(true);
const showCancel = ref(false);
const selectedBankAccount = ref<BankAccount>();
const bankAccountList = ref();
const onSelectBankAccount = (bankAccount: unknown) => {
  if (bankAccount && bankAccount.id !== selectedBankAccount.value?.id) {
    showCancel.value = true;
    disableSubmit.value = false;
    selectedBankAccount.value = bankAccount;
  }
  init()
};
const bankAccount = (list: BankAccount[]) => {
  bankAccountList.value = list;
};
</script>
