<template>
  <ui-Card dir="rtl">
    <template #header>
      <div class="flex justify-between">
        <ui-Skeleton v-if="loading" :width="100" :height="24" />
        <span v-else class="text-heading-600-h2">{{ $t('_referral.income_statistics') }}</span>
        <ui-Skeleton v-if="loading" :width="120" :height="24" />
        <ui-DatePicker
          v-else
          after-icon="Calendar"
          :model-value="dateInput"
          :disabled="loading"
          :loading="false"
          :steps="['year', 'month']"
          name="calender"
          max
          :placeholder="$t('_common.filters.date')"
          @selected-item="dateHandler"
        />
      </div>
    </template>
    <template #main>
      <div class="grid grid-cols-3 border border-border-divider rounded-sm mt-xl">
        <div class="col-span-3 lg:col-span-1 flex flex-col justify-center items-center p-md gap-sm">
          <ui-Skeleton v-if="loading" :width="80" :height="20" />
          <span v-else class="text-body-400-b3 text-text-soft">
            {{ $t('_common.balance_to_get') }}
          </span>
          <ui-Skeleton v-if="loading" :height="30" class="mt-md" />
          <span v-else class="flex gap-xs items-center">
            <span class="text-display-700-d3">{{ referralStatistics?.selectedMonthIncome }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs h-fit" />
          </span>
        </div>
        <div
          class="col-span-3 lg:col-span-1 flex flex-col justify-center items-center p-md gap-sm md:border-r border-r-0 border-t md:border-t-0 border-border-divider"
        >
          <ui-Skeleton v-if="loading" :width="80" :height="20" />
          <span v-else class="text-body-400-b3 text-text-soft">
            {{
              $t('_common.slug.statics_income_month', {
                month: `${calendar?.month} ${calendar?.year}`,
              })
            }}
          </span>
          <ui-Skeleton v-if="loading" :height="30" class="mt-md" />
          <span v-else class="flex gap-xs items-center">
            <span class="text-display-700-d3">{{
              referralStatistics?.filteredDateProfitAmount
            }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs h-fit" />
          </span>
        </div>
        <div
          class="col-span-3 lg:col-span-1 flex flex-col justify-center items-center p-md gap-sm md:border-r border-r-0 border-t md:border-t-0 border-border-divider"
        >
          <ui-Skeleton v-if="loading" :width="80" :height="20" />
          <span v-else class="text-body-400-b3 text-text-soft">
            {{ $t('_referral.total_total_income_from_the_beginning') }}
          </span>
          <ui-Skeleton v-if="loading" :height="30" class="mt-md" />
          <span v-else class="flex gap-xs items-center">
            <span class="text-display-700-d3">{{ referralStatistics?.wholeProfitAmount }}</span>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mx-xs h-fit" />
          </span>
        </div>
      </div>
      <ui-Divider class="my-xl" />
      <div class="bottom-controller lg:items-center items-start">
        <ui-Skeleton v-if="loading" :height="20" />
        <span v-else class="text-text-soft text-body-400-b3 flex gap-2xs items-center">
          <span> {{ $t('payout.last_income') }} </span>
        </span>
        <ui-Skeleton v-if="loading" :height="20" />
        <span v-if="!loading" class="flex gap-sm text-body-400-b2 items-center">
          <span class="text-heading-600-h3">
            {{ referralStatistics.lastProfitAmount }}
            <span>{{ $t('common.rial') }}</span>
          </span>
        </span>
        <span v-else-if="!lastInvoice">-</span>
        <ui-Skeleton v-if="loading" :height="20" />
      </div>
    </template>
  </ui-Card>
</template>
<script lang="ts" setup>
import { getUserReferralStatisticsApi } from '~/restApi/referral';

defineProps(['loading']);
export interface Date {
  formatValue: string;
  month: string;
  year: string;
}
interface Calendar {
  date: string;
  month: string;
  year: string;
  monthIncome: number;
  totalIncome: number | string;
}
const dateInput = ref<string>();
// const store = useReferralStore();
const calendar = ref<Calendar>({
  date: '',
  month: '',
  year: '',
  monthIncome: 0,
  totalIncome: 0,
});
const { toJalali } = useDate();
const { numberFormat } = useMath();
const dateHandler = (date: Date) => {
  dateInput.value = date.formatValue;
  calendar.value.month = date.month;
  calendar.value.year = date.year;
  getImcomeStaitstics(date.formatValue);
};
const lastInvoice = computed(() => {
  if (data.value && data.value.length) {
    return {
      amount: numberFormat(data.value[0]?.amount),
      date: toJalali(data.value[0]?.to_date),
    };
  }

  return undefined;
});

onMounted(() => {
  getImcomeStaitstics();
});
const data = ref([]);
const referralStatistics = ref({});
const getImcomeStaitstics = (filteredDate: string | null = null) => {
  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  getUserReferralStatisticsApi(filteredDate).then(res => {
    referralStatistics.value = res.data;
    // data.value = res.data
  });
};
</script>
<style lang="scss" scoped>
.point-divider {
  @apply w-2xs h-2xs rounded-circle;
}
.bottom-controller {
  @apply flex md:flex-row flex-col gap-xs justify-between p-md border border-border-divider rounded-sm;
}
</style>
