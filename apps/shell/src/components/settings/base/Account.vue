<template>
  <div class="mb-xl text-heading-600-h2 text-text" dir="rtl">حساب‌ اصلی</div>
  <div class="flex justify-between gap-md" dir="rtl">
    <div class="text-text-soft text-body-400-b3 font-medium text-right">
      تنظیمات حساب‌های بانکی و حساب اصلی
    </div>
  </div>
  <SharedBankAccountHeader
    :is-share="false"
    :loading="false"
    :selected-bank-account="selectedBankAccount"
    :is-legual="true"
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
  const res = await getBankAccountsApi({}, true);
  data.value = res?.data?.items || [];
  useBankAccountListStore.fill(data.value);
  const selected = data.value.filter(item => item.isDefaultWithdraw)[0];
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
  init();
};
const bankAccount = (list: BankAccount[]) => {
  bankAccountList.value = list;
};
</script>
