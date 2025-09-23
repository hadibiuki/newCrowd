<template>
  <ui-Modal
    v-if="showTemplateModal"
    :text="t('transactions.withdraw_asset')"
    close-icon
    header
    width="600px"
    class="w-full lg:max-w-[530px] max-h-[800px]"
    @close="$emit('close')"
  >
    <template #body>
      <div class="flex-row items-center">
        <div
          class="flex w-full gap-xs flex-row main__item--detail border border-border-divider rounded-sm mb-md"
        >
          <span class="text-body-400-b3 text-text-soft main__item--heading mt-[4px] flex">
            {{ $t('transactions.withdraw_some') }}
          </span>
          <div class="text-display-700-d4 flex items-center">
            <span class="leading-none">{{ numberFormat(whithdraw?.withdrawableAmount ?? 0) }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
          </div>
        </div>
        <span class="text-caption-400-c1 text-text-soft mb-md flex">{{ $t('transactions.amount_assets') }}</span>
        <div class="mb-md flex gap-md pl-[1px]" dir="ltr">
          <ui-RadioCard
            v-model="item"
            :disabled="loadingCheck"
            :tabindex="1"
            val="some"
            name="status"
            with-details
            @click="changeOptionStatusHandler"
          >
            <div class="flex flex-col rtl">
              <span class="text-body-500-b2 font-bold flex mb-xs">{{
                $t('transactions.desired_amount')
              }}</span>
              <span class="text-caption-400-c1 text-text-soft">{{
                $t('transactions.some_assets')
              }}</span>
            </div>
          </ui-RadioCard>
          <ui-RadioCard
            v-model="item"
            :disabled="loadingCheck"
            :tabindex="2"
            val="total"
            name="status"
            with-details
            @click="changeOptionStatusHandler"
          >
            <div class="flex flex-col rtl">
              <span class="text-body-500-b2 font-bold flex mb-xs">{{ $t('transactions.total_assets') }}</span>
              <span class="text-caption-400-c1 text-text-soft">{{ whithdraw?.withdrawableAmount ?? 0 }} ریال</span>
            </div>
          </ui-RadioCard>
        </div>
        <div class="mb-md flex flex-col" v-if="item === 'some'">
          <ui-TextField
            v-model="amount"
            amount
            :unit="t('_common.currency.rial')"
            :disabled="loadingCheck"
            :loading="loadingCheck"
            is-number
            :placeholder="t('transactions.amount_assets')"
            :helper="{
              type: 'info',
              message: `مبلغ برداشت می‌تواند برابر با کل موجودی دارایی (${numberFormat(whithdraw.withdrawableAmount || 0)} ریال) یا کمتر باشد`,
            }"
            @update:model-value="updateAmountHandler"
          />
        </div>
        <div class="mb-lg">
          <span class="text-body-400-b3 font-bold">خلاصه عملیات</span>
          <ui-Summary class="summery-bank" :items="summaryItems" />
        </div>
        <ui-Select
          :data="shebaItems"
          class="w-full h-3xl mb-md"
          after-icon="AngleDown"
          name="dropDown"
          :placeholder="$t('transactions.choose_cart')"
          :disabled="loadingCheck"
          @selected-item="selectedShebaHandler"
        />
        <div class="ltr flex-col flex">
          <ui-Textarea
            class="w-full float-right"
            :max-length="500"
            :disabled="loadingCheck"
            name="content"
            v-model="description"
            :placeholder="$t('_common.table.description')"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end gap-xs w-full">
        <ui-Button
          type="secondary"
          size="medium"
          :disabled="loadingCheck"
          :text="$t('_common.buttons.cancel')"
          @click="$emit('close')"
        />
        <ui-Button
          :disabled="loadingCheck"
          :loading="loadingCheck"
          size="medium"
          :text="$t('transactions.withdrawal_cash')"
          @click="withdrawalHandler"
        />
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
const { numberFormat } = useMath();
const { snakeToCamel } = useSnakeToCamel();
const props = defineProps<{
  showTemplateModal: boolean;
  bankAccounts: Array;
  whithdraw: object;
  loadingCheck: boolean;
}>();
const emits = defineEmits(['close', 'requst']);
const t = useI18n();
const item = ref('total');
const shebaSelected = ref('');
const description = ref('');
const amount = ref(null);
// eslint-disable-next-line vue/no-setup-props-destructure
const withdrawalAmount = ref(props.whithdraw.withdrawableAmount);
const changeOptionStatusHandler = () => {
  if (item.value === 'total') {
    withdrawalAmount.value = props.whithdraw.withdrawableAmount;
    amount.value = null;
  } else {
    withdrawalAmount.value = 0;
  }
};
const summaryItems = computed(() => [
  {
    id: 1,
    title: `${numberFormat(withdrawalAmount.value) || 0} ریال`,
    value: 'مبلغ برداشت',
  },
]);
const shebaItems = computed(() => {
  const temp = props.bankAccounts.map(
    (item: { bankInformation: any; id: any; shebaNumber: any }) => ({
      id: item.id,
      title: `${item.shebaNumber}`,
      BankLogo: snakeToCamel('_' + item.bankInformation.english_name),
    })
  );

  return temp;
});

function selectedShebaHandler(e: { id: string }) {
  shebaSelected.value = e.id;
}
const updateAmountHandler = () => {
  withdrawalAmount.value = amount.value;
};
const withdrawalHandler = () => {
  const data = {
    BankAccountId: shebaSelected.value,
    Amount:
      item.value === 'total'
        ? props.whithdraw.withdrawableAmount
        : amount.value.replaceAll(',', ''),
    Description: description.value,
  };
  emits('requst', data);
};
</script>
<style lang="scss" scoped>
.main {
  @apply lg:flex-row flex-col gap-sm;
  direction: rtl;
  &__item--detail {
    @apply flex justify-between w-full gap-xs p-md  border-b border-border-divider;
  }
  &__item--heading {
    @apply text-body-400-b2 flex flex-col ml-[-1px] mb-[-1px]  min-w-[200px]  ml-[-1px] mb-[-1px]  gap-xs;
  }
}
.rtl {
  direction: rtl;
}

// .main__item--heading {
//   flex: 1 0 2%;
// }
</style>
