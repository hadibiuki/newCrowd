<template>
  <div class="flex flex-col w-full gap-md" dir="rtl">
    <div class="grid items-start grid-cols-12 gap-md">
      <ui-Card class="col-span-full xl:col-span-8 h-full">
        <template #header>
          <div class="flex justify-between items-center h-[42px]">
            <ui-skeleton :loading="mainLoading" :height="20" :width="100">
              <span class="text-heading-600-h2">
                {{ $t('transactions.last_chance_to_invest') }}
              </span>
            </ui-skeleton>
            <ui-Button
              :text="$t('product.details.showAll')"
              variant="outlined"
              type="neutral"
              size="medium"
              :loading="mainLoading"
              @click="navigateRoute('session')"
            />
          </div>
        </template>
        <template #main>
          <div class="grid grid-cols-2 rounded-sm mt-xl gap-xs">
            <SharedProductCard v-for="project in projects" :key="project.id" :project="project" />
          </div>
        </template>
      </ui-Card>
      <!--  -->
      <div class="col-span-full xl:col-span-4 h-full">
        <ui-Card class="mb-md">
          <template #header>
            <div class="flex justify-between items-center h-[42px]">
              <ui-skeleton :loading="mainLoading" :height="20" :width="100">
                <span class="text-heading-600-h2">
                  {{ $t('transactions.asset') }}
                </span>
              </ui-skeleton>
            </div>
          </template>
          <template #main>
            <div class="flex flex-col gap-xl h-full">
              <div
                class="flex flex-col justify-center items-center p-md gap-xs border border-border-divider rounded-sm mt-xl h-[144px]"
              >
                <ui-skeleton :loading="mainLoading" :width="64">
                  <span class="text-text-soft text-body-400-b3">
                    {{ $t('transactions.withdraw_some') }}
                  </span>
                </ui-skeleton>
                <ui-skeleton :loading="mainLoading" :width="168" :height="20">
                  <span class="text-display-700-d4 flex items-center">
                    <span>{{ numberFormat(whithdraw?.withdrawableAmount ?? 0) }}</span>
                    <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
                  </span>
                </ui-skeleton>
                <ui-skeleton :loading="mainLoading" :width="64">
                  <ui-Button
                    v-if="hasPermission"
                    :text="$t('transactions.withdrawal')"
                    variant="text"
                    type="neutral"
                    :loading="mainLoading"
                    @click="navigateRoute('reconciliation')"
                  />
                </ui-skeleton>
              </div>
            </div>
          </template>
        </ui-Card>
        <ui-Card class="">
          <template #header>
            <div class="flex justify-between items-center h-[42px]">
              <ui-skeleton :loading="mainLoading" :height="20" :width="100">
                <span class="text-heading-600-h2">
                  {{ $t('transactions.performance_summary') }}
                </span>
              </ui-skeleton>
            </div>
          </template>
          <template #main>
            <div class="flex flex-col h-full border border-border-divider rounded-sm mt-xl">
              <div class="flex flex-col justify-center items-center p-xs gap-xs py-sm">
                <ui-skeleton :loading="mainLoading" :width="64">
                  <span class="text-text-soft text-body-400-b3">
                    {{ $t('transactions.withdraw_some') }}
                  </span>
                </ui-skeleton>
                <ui-skeleton :loading="mainLoading" :width="168" :height="20">
                  <span class="text-display-700-d4 flex items-center">
                    <span>{{ summery?.investmentCount ?? 0 }}</span>
                  </span>
                </ui-skeleton>
              </div>
              <div
                class="flex flex-col justify-center items-center gap-xs border-t border-border-divider py-sm"
              >
                <ui-skeleton :loading="mainLoading" :width="64">
                  <span class="text-text-soft text-body-400-b3">
                    {{ $t('transactions.withdraw_some') }}
                  </span>
                </ui-skeleton>
                <ui-skeleton :loading="mainLoading" :width="168" :height="20">
                  <span class="text-display-700-d4 flex items-center">
                    <span>{{ numberFormat(summery?.totalInvestmentAmount ?? 0) }}</span>
                    <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
                  </span>
                </ui-skeleton>
              </div>
              <div
                class="flex flex-col justify-center items-center gap-xs border-t border-border-divider py-sm"
              >
                <ui-skeleton :loading="mainLoading" :width="64">
                  <span class="text-text-soft text-body-400-b3">
                    {{ $t('transactions.withdraw_some') }}
                  </span>
                </ui-skeleton>
                <ui-skeleton :loading="mainLoading" :width="168" :height="20">
                  <span class="text-display-700-d4 flex items-center">
                    <span>{{ numberFormat(summery?.totalProfit ?? 0) }}</span>
                    <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
                  </span>
                </ui-skeleton>
              </div>
            </div>
          </template>
        </ui-Card>
      </div>
      <!--  -->
    </div>
    <div class="w-full">
      <ui-Card>
        <template #header>
          <div class="flex justify-between items-center mb-xl">
            <ui-skeleton :loading="mainLoading" :height="20">
              <span class="text-heading-600-h2">
                {{ $t('product.details.latelyTransactions') }}
              </span>
            </ui-skeleton>
            <ui-Button
              :text="$t('product.details.showAll')"
              variant="outlined"
              type="neutral"
              size="medium"
              :loading="mainLoading"
              @click="navigateRoute('session')"
            />
          </div>
        </template>
        <template #main>
          <DashboardBaseLgGrid v-if="!md" :loading="mainLoading" />
          <DashboardBaseMdGrid v-else :loading="mainLoading" />
        </template>
      </ui-Card>
    </div>
  </div>
  <sessionBaseModal
    :show-template-modal="store.showModal"
    :platforms="platforms"
    @close="store.showModal = false"
  />
</template>
<script lang="ts" setup>
import { ReconciliationType, TerminalPermissionEnum } from '@/graphql/graphql';
import { getUserBalanceApi } from '~/restApi/balance';
import { getUserPaymentsSummeryApi } from '~/restApi/payment';
import { getAllProjects } from '~/restApi/project';
import { getAllPlatformsApi } from '~/restApi/transactions';

export interface Date {
  formatValue: string;
}
const t = useI18n();
const store = useSessionStore();
const { hasPermission } = usePermissionValidate(TerminalPermissionEnum.Reconcile);
const router = useRouter();
const { md } = useSize();
const domain = useTerminalStore().currentDomain;
const { numberFormat } = useMath();
const navigateRoute = (page: 'session' | 'reconciliation') => {
  router.push('/panel/' + domain + `/${page}`);
};
const clicked = (item?: ReconciliationType) => {
  router.push(`/panel/${domain}/reconciliation/${item?.id}`);
};
const mainLoading = computed(
  () => projectLoading.value || store.loading || summeryLoading.value || whithdrawLoading.value
);
store.dashboardLoading = mainLoading;

const platforms = ref([]);
const projects = ref([]);
const projectLoading = ref(true);
const whithdraw = ref({});
const whithdrawLoading = ref(false);
const summery = ref({});
const summeryLoading = ref(false);
onMounted(() => {
  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  getAllProjects({ pageSize: 2, pageNumber: 1, internalStatus: 2 })
    // eslint-disable-next-line promise/always-return
    .then(res => {
      projects.value = res.data.items;
    })
    .finally(() => {
      projectLoading.value = false;
    });
  // eslint-disable-next-line promise/catch-or-return
  getAllPlatformsApi().then(res => {
    // eslint-disable-next-line promise/always-return
    if (res && res.data) {
      platforms.value = res?.data?.items;
    }
  });

  // eslint-disable-next-line promise/catch-or-return
  getUserBalanceApi()
    // eslint-disable-next-line promise/always-return
    .then(res => {
      whithdraw.value = res.data;
    })
    .finally(() => {
      whithdrawLoading.value = false;
    });

  // eslint-disable-next-line promise/catch-or-return
  getUserPaymentsSummeryApi()
    // eslint-disable-next-line promise/always-return
    .then(res => {
      summery.value = res.data;
    })
    .finally(() => {
      summeryLoading.value = false;
    });
});
</script>
<style lang="scss" scoped>
:deep(.input__inner--default) {
  @apply h-[44px];

  div {
    @apply flex items-center;
  }
}
:deep(.root__row__rows) {
  @apply py-sm;
}
</style>
