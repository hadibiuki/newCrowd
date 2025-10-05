<template>
  <div dir="rtl">
    <ui-Card>
      <template #main>
        <ui-skeleton :loading="projectLoading" :height="350" :width="0">
          <div v-if="projects.length">
            <div v-for="item in projects" :key="item.id" class="mb-xl">
              <div class="flex justify-between w-full">
                <span class="text-body-500-b1">{{ item.projectPersianName }}</span>
                <ui-button
                  text="مشاهده جزئیات"
                  after-icon="ArrowLeft"
                  variant="tertiary"
                  class="ml-[-16px]"
                  @click="$router.push(`./history/${item.projectId}`)"
                />
              </div>
              <div
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-x-md relative max-h-[108px]"
              >
                <div class="h-fit max-h-[108px]">
                  <NuxtImg
                    :src="item.projectCoverUrl"
                    width="100%"
                    height="100%"
                    fit="containt"
                    :placeholder="[40, 40]"
                    loading="lazy"
                    class="rounded-md object-cover w-full h-[108px]"
                  />
                </div>
                <div class="referral__bottom--content col-span-4 h-full rounded-md">
                  <div class="referral__bottom--content--item">
                    <ui-Skeleton v-if="loading" />
                    <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
                    <span v-if="!loading" class="text-body-400-b3 text-text-soft ml-auto">
                      مبلغ سرمایه گذاری
                    </span>
                    <span v-if="!loading" class="text-bode-400-b3 flex justify-between w-full">
                      {{ numberFormat(item.totalInvestedAmount) ?? '-' }}
                      <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
                    </span>
                  </div>
                  <div class="referral__bottom--content--item border-x border-border-divider">
                    <ui-Skeleton v-if="loading" />
                    <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
                    <span v-if="!loading" class="text-body-400-b3 text-text-soft ml-auto">
                      کل سود دریافتی
                    </span>
                    <span v-if="!loading" class="text-bode-400-b3 flex justify-between w-full">
                      {{ numberFormat(item.totalReceivedProfit) ?? '-' }}
                      <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
                    </span>
                  </div>
                  <div class="referral__bottom--content--item border-x border-border-divider">
                    <ui-Skeleton v-if="loading" />
                    <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
                    <span v-if="!loading" class="text-body-400-b3 text-text-soft ml-auto">
                      وضعیت
                    </span>
                    <span v-if="!loading" class="text-body-400-b2">
                      {{ item?.status ?? '-' }}
                    </span>
                  </div>
                  <div class="referral__bottom--content--item border-x border-border-divider">
                    <ui-Skeleton v-if="loading" />
                    <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
                    <span v-if="!loading" class="text-body-400-b3 text-text-soft ml-auto">
                      گواهی مشارکت
                    </span>
                    <a
                      :href="item.participantReportFilePath"
                      target="_blank"
                      download
                      text="دانلود"
                      class="text-bode-400-b3 flex ml-auto text-primary cursor-pointer"
                    >
                      <ui-Icon name="Download" />
                    </a>
                    <!-- <span v-if="!loading" class="text-bode-400-b3 flex ml-auto mr-[-16px] mt-[-8px]">
                      <ui-button  after-icon="Download" variant="tertiary" />
                    </span> -->
                  </div>
                </div>
              </div>
            </div>
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
  </div>
</template>
<script lang="ts" setup>
import { getAllInvestmentsApi } from '~/restApi/invest';
const { numberFormat } = useMath();
const route = useRoute();
const projects = ref([]);
const projectLoading = ref(true);
const pagination = ref({
  page: route.query.page || 1,
  total: 150,
  pageSize: route.query.pageSize || 5,
  totalPages: 1,
});
const loading = ref(false);
onMounted(() => {
  const body = {
    pageNumber: route.query.page || pagination.value.page,
    pageSize: route.query.pageSize || pagination.value.pageSize,
  };
  // eslint-disable-next-line promise/catch-or-return
  getAllInvestmentsApi(body)
    // eslint-disable-next-line promise/always-return
    .then(res => {
      projects.value = res.data.items;
      pagination.value.total = res.data.totalItems;
      pagination.value.totalPages = res.data.totalPages;
      projectLoading.value = true;
    })
    .finally(() => {
      projectLoading.value = false;
    });
});
</script>

<style lang="scss" scoped>
.referral {
  @apply flex flex-col gap-md;
  &__content {
    @apply flex gap-xl flex-col md:flex-row;
    &--item {
      // @apply flex justify-center;
    }
    &--main {
      @apply w-full flex flex-col gap-md justify-between;
    }
  }
  &__bottom {
    @apply flex flex-col gap-xl;
    &--title {
      @apply text-heading-600-h2;
    }
    &--content {
      @apply grid grid-cols-4 border border-border-divider;
      &--item {
        @apply col-span-4 lg:col-span-1 flex flex-col  items-center gap-sm p-md;
      }
    }
  }
}
</style>
