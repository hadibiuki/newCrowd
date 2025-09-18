<template>
  <div class="root" dir="rtl">
    <ui-Modal
      :text="$t('_common.slug.reconcileAccounts')"
      close-icon
      header
      class="lg:max-w-[700px] !max-h-[544px] min-h-[544px]"
      @close="toggleModal"
    >
      <template #body>
        <ui-TextField
          ref="searchRef"
          v-model="searchText"
          :placeholder="$t('reconcilation.reconcileDetail.search_placeholder')"
          :label="false"
          :after-icon="searchText ? 'DeleteFill' : ''"
          auto-focus
          before-icon="Search"
          name="accountSearch"
          class="mb-md"
          @button-action="handleClear"
          @input="handleSearch"
        />
        <ReconciliationWagesEmptyGrid v-if="!loading && data?.length === 0" />
        <template v-else>
          <ReconciliationWagesLgGrid
            v-if="!md"
            :data="wages"
            :loading="loading"
            :search-text="searchText"
          />
          <ReconciliationWagesMdGrid
            v-else
            :data="wages"
            :loading="loading"
            :search-text="searchText"
          />
        </template>
        <div ref="sentinel"></div>
      </template>
    </ui-Modal>
  </div>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash';
import { RECONCILIATION_WAGES_PAGE_SIZE } from '~/consts/reconciliation';
import { ReconciliationWageTypeEnum } from '~/graphql/graphql';

const t = useI18n();
const { toEnNumber } = useInput();
const { numberFormat } = useMath();
const toggleModal = inject<(() => void | undefined) | undefined>('toggleReconciliationWages');
const { activeTerminal } = useTerminalQuery();
const searchRef = ref();
const searchText = ref('');
const sentinel = ref();
const { md } = useSize();
// let observer: IntersectionObserver | null = null;
const limit = ref(RECONCILIATION_WAGES_PAGE_SIZE);
const { useReconciliationWages } = useReconciliationWageQuery();
const { data, loading, refetch, pagination } = useReconciliationWages();
const hasMore = computed(() => limit.value < pagination.value?.total);
const wages = computed(
  () =>
    data.value?.map(item => ({
      ...item,
      link:
        item?.type && item?.type_id
          ? wageTypeLink(item.type, item.type_id as unknown as ReconciliationWageTypeEnum)
          : undefined,
      label: item?.type ? wageTypeLabel(item.type) : undefined,
      formatted_amount: formattedAmount(item?.amount, item?.fee),
      is_default: activeTerminal?.value?.preferred_bank_account_id === item?.bank_account?.id,
    }))
);
const handleClear = () => {
  searchText.value = '';
  refetch({
    limit: limit.value,
    iban: undefined,
    holder_name: undefined,
  });
  focusHandler();
};
const focusHandler = () => {
  nextTick(() => {
    searchRef.value.inputRef.focus();
  });
};
const handleSearch = debounce(() => {
  const detectedField = detectBankField(searchText.value);

  refetch({
    iban: detectedField.iban,
    holder_name: detectedField.holder_name,
    limit: limit.value,
  });
}, 500);
const detectBankField = (value: string) => {
  const trimmed = value.trim();
  const normalized = toEnNumber(trimmed);
  const upper = normalized.toUpperCase();
  const isIban = /^IR[0-9]+$/.test(upper) || /^[0-9]+$/.test(upper.replace(/\s+/g, ''));

  return {
    iban: isIban ? trimmed : undefined,
    holder_name: !isIban ? trimmed : undefined,
  };
};
useIntersectionObserver({
  target: sentinel,
  callback: () => {
    if (!hasMore.value) {
      return;
    }

    limit.value += RECONCILIATION_WAGES_PAGE_SIZE;
    const detectedField = detectBankField(searchText.value);
    refetch({
      iban: detectedField.iban,
      holder_name: detectedField.holder_name,
      limit: limit.value,
    });
  },
});
const formattedAmount = (amount: string, fee: string) =>
  `${numberFormat(parseFloat(amount) - parseFloat(fee))} ${t('_common.currency.rial')}`;
const wageTypeLink = (type: string, typeId: ReconciliationWageTypeEnum) => {
  const domain = encodeURIComponent(activeTerminal.value?.domain as string);
  switch (type) {
    case ReconciliationWageTypeEnum.Refund:
      return `/panel/${domain}/session/${typeId}`;
    case ReconciliationWageTypeEnum.Payout:
      return `/panel/${domain}/payout?url_code=${typeId}`;
    case ReconciliationWageTypeEnum.InstantPayout:
      return `/panel/${domain}/instant-payout?url_code=${typeId}`;

    default:
      return '';
  }
};
const wageTypeLabel = (type: string) => {
  switch (type) {
    case ReconciliationWageTypeEnum.Refund:
      return t('_session.show.time_line.refund');
    case ReconciliationWageTypeEnum.Payout:
      return t('_common.page_title.payout');
    case ReconciliationWageTypeEnum.InstantPayout:
      return t('_common.page_title.instant_payout');

    default:
      return '';
  }
};
</script>
