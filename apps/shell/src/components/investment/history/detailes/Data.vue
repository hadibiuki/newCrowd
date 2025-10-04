<template>
  <ui-Card>
    <template #header>
      <div class="flex justify-between items-center h-[42px]">
        <ui-skeleton :loading="loading" :height="20" :width="100">
          <span class="text-heading-600-h2"> جزئیات پروژه </span>
        </ui-skeleton>
        <ui-Button
          text="زمان‌بندی واریز سود"
          variant="outlined"
          type="neutral"
          dir="ltr"
          size="medium"
          :loading="loading"
          after-icon="CalendarClock"
          @click="showTemplateModal = true"
        />
      </div>
    </template>
    <template #main>
      <ui-skeleton :loading="loading" :height="20" :width="100">
        <NuxtImg :src="data.projectBannerUrl" class="h-[313px] w-full rounded-md mt-lg mb-lg" />

        <div class="referral__bottom--content col-span-4 h-full rounded-md">
          <div class="referral__bottom--content--item">
            <ui-Skeleton v-if="loading" />
            <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
            <span v-if="!loading" class="text-body-400-b3 text-text-soft ml-auto">
              تاریخ شروع
            </span>
            <span v-if="!loading" class="text-bode-400-b3 flex justify-between w-full">
              {{ toJalali(data.projectStartDate, 'jDD jMMMM jYYYY') ?? '-' }}
            </span>
          </div>
          <div class="referral__bottom--content--item border-x border-border-divider">
            <ui-Skeleton v-if="loading" />
            <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
            <span v-if="!loading" class="text-body-400-b3 text-text-soft ml-auto">
              تاریخ پایان
            </span>
            <span v-if="!loading" class="text-bode-400-b3 flex justify-between w-full">
              {{ toJalali(data.projectEndDate, 'jDD jMMMM jYYYY') ?? '-' }}
            </span>
          </div>
          <div class="referral__bottom--content--item">
            <ui-Skeleton v-if="loading" />
            <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
            <span v-if="!loading" class="text-body-400-b3 text-text-soft ml-auto">
              مبلغ سرمایه گذاری
            </span>
            <span v-if="!loading" class="text-bode-400-b3 flex w-full">
              {{ numberFormat(data.totalInvestedAmount) ?? '-' }}
              <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
            </span>
          </div>
          <div class="referral__bottom--content--item border-t border-border-divider">
            <ui-Skeleton v-if="loading" />
            <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />

            <span v-if="!loading" class="text-body-400-b3 text-text-soft ml-auto">
              درصد پیشرفت طرح
            </span>
            <div class="text-body-500-b3 flex w-full">
              %{{ Number.isInteger(Number(data.projectProgressPercent)) ? Number(data.projectProgressPercent) :  Number.parseFloat(data.projectProgressPercent).toFixed(2) }} 
              <span class="text-[10px] text-text-soft">
                (پیشرفت شناوری : {{ Math.min(data.projectFloatingProgressPercent, 100) }} % )
              </span>
            </div>
          </div>
          <div class="referral__bottom--content--item border-x border-t border-border-divider">
            <ui-Skeleton v-if="loading" />
            <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
            <span v-if="!loading" class="text-body-400-b3 text-text-soft ml-auto"> وضعیت </span>
            <span v-if="!loading" class="text-body-400-b2">
              {{ data?.status ?? '-' }}
            </span>
          </div>
          <div class="referral__bottom--content--item border-t border-border-divider">
            <ui-Skeleton v-if="loading" />
            <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
            <span v-if="!loading" class="text-body-400-b3 text-text-soft ml-auto"> گواهی مشارکت </span>
            <a
              :href="data.participantReportFilePath"
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
      </ui-skeleton>
    </template>
  </ui-Card>

  <investmentHistoryDetailesModal
    :show-template-modal="showTemplateModal"
    :data="data.profitSchedule"
    @close="showTemplateModal = false"
  />
</template>
<script lang="ts" setup>
// eslint-disable-next-line vue/require-prop-types
defineProps(['data', 'loading']);
const { numberFormat } = useMath();
const { toJalali } = useDate();
const showTemplateModal = ref(false);
</script>

<style lang="scss" scoped>
.referral {
  @apply flex flex-col gap-md;
  &__content {
    &--item {
      @apply flex justify-center;
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
      @apply grid grid-cols-3 border border-border-divider;
      &--item {
        @apply col-span-3 lg:col-span-1 flex flex-col justify-center items-center gap-sm p-md;
      }
    }
  }
}
</style>