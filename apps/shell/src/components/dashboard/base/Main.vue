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
          <ui-skeleton :loading="mainLoading" :height="350" :width="0">
            <div class="grid grid-cols-2 rounded-sm mt-xl gap-xs" v-if="projects.length">
              <SharedProductCard v-for="project in projects" :key="project.id" :project="project" />
            </div>
            <div v-else class="flex jsutify-content items-center h-full">
              <ui-EmptyState
                :description="$t('transactions.no_invest_exist')"
                :title="$t('transactions.chance_to_invest')"
                vector="Placeholder"
              />
            </div>
          </ui-skeleton>
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
                    :text="$t('transactions.withdrawal')"
                    variant="text"
                    type="neutral"
                    :loading="mainLoading"
                    @click="openWalletModal"
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
                    {{ $t('transactions.number_of_invest') }}
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
                    {{ $t('transactions.total_invest') }}
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
                    {{ $t('transactions.total_profit') }}
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
  <DashboardBaseModal
    :show-template-modal="showWalletModal"
    :bank-accounts="banckAccounts"
    :whithdraw="whithdraw"
    :loading-check="loadingCheck"
    @close="showWalletModal = false"
    @requst="withdrawRequstHandler"
  />
</template>
<script lang="ts" setup>
import { getUserBalanceApi, sendWithdrawRequestApi } from '~/restApi/balance';
import { getBankAccountsApi } from '~/restApi/bancAccount';
import { getUserPaymentsSummeryApi } from '~/restApi/payment';
import { getAllProjects } from '~/restApi/project';
import { getAllPlatformsApi } from '~/restApi/transactions';
const { $notify } = useNuxtApp();
export interface Date {
  formatValue: string;
}
const t = useI18n();
const store = useSessionStore();
const router = useRouter();
const { md } = useSize();
const domain = useTerminalStore().currentDomain;
const { numberFormat } = useMath();
const navigateRoute = (page: 'session' | 'reconciliation') => {
  router.push('/panel/' + domain + `/${page}`);
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
const banckAccounts = ref([]);
const loadingCheck = ref(false);
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

  getWalletAmount();
  // eslint-disable-next-line promise/catch-or-return
  getUserPaymentsSummeryApi()
    // eslint-disable-next-line promise/always-return
    .then(res => {
      summery.value = res.data;
    })
    .finally(() => {
      summeryLoading.value = false;
    });

  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  getBankAccountsApi().then(res => {
    banckAccounts.value = res.data.items;
  });
});

const getWalletAmount = () => {
  // eslint-disable-next-line promise/catch-or-return
  getUserBalanceApi()
    // eslint-disable-next-line promise/always-return
    .then(res => {
      whithdraw.value = res.data;
    })
    .finally(() => {
      whithdrawLoading.value = false;
    });
};

const showWalletModal = ref(false);
const openWalletModal = () => {
  showWalletModal.value = true;
};
const withdrawRequstHandler = (data) =>{
  loadingCheck.value = true;
  // eslint-disable-next-line promise/catch-or-return
  sendWithdrawRequestApi(data)
    // eslint-disable-next-line promise/always-return
    .then(async () => {
      $notify({
        isRead: false,
        message: t('transactions.success_withfrawal_request'),
        type: 'success',
      });
      getWalletAmount();
      await useDelay(1000);
      showWalletModal.value = false;
    })
    .catch(err => {
      console.log({err})
      $notify({
        isRead: false,
        message: err.message,
        type: 'error',
      });
    })
    .finally(() => {
      loadingCheck.value = false;
    });
};
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
