<template>
  <ui-Card>
    <template #header>
      <div class="flex justify-between items-center h-[42px]">
        <ui-skeleton :loading="loading" :height="20" :width="100">
          <span class="text-heading-600-h2"> سودها و پرداخت‌ها </span>
        </ui-skeleton>
      </div>
    </template>
    <template #main>
      <ui-skeleton :loading="loading" :height="20" :width="100">
        <div class="referral__bottom--content h-full rounded-md mb-lg">
          <div class="referral__bottom--content--item">
            <ui-Skeleton v-if="loading" />
            <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
            <span v-if="!loading" class="text-body-400-b3 text-text-soft"> مبلغ سرمایه گذاری </span>
            <span v-if="!loading" class="text-bode-400-b3 flex justify-center w-full">
              {{ numberFormat(data.totalInvestedAmount) ?? '-' }}
              <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
            </span>
          </div>
          <div class="referral__bottom--content--item border-r border-border-divider">
            <ui-Skeleton v-if="loading" />
            <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
            <span v-if="!loading" class="text-body-400-b3 text-text-soft"> مبلغ سرمایه گذاری </span>
            <span v-if="!loading" class="text-bode-400-b3 flex justify-center w-full">
              {{ numberFormat(data.totalInvestedAmount) ?? '-' }}
              <ui-Label :text="$t('_common.currency.rial')" type="neutral" class="mr-xs" />
            </span>
          </div>
        </div>

        <investmentHistoryDetailesLgGrid :data="data.investments" />
      </ui-skeleton>
    </template>
  </ui-Card>
</template>
<script lang="ts" setup>
// eslint-disable-next-line vue/require-prop-types
defineProps(['data', 'loading']);
const { numberFormat } = useMath();
</script>

<style lang="scss" scoped>
.referral {
  @apply flex flex-col gap-md;
  &__content {
    &--item {
      @apply flex justify-center items-center;
    }
  }
  &__bottom {
    @apply flex flex-col gap-xl;
    &--title {
      @apply text-heading-600-h2;
    }
    &--content {
      @apply grid grid-cols-2 border border-border-divider;
      &--item {
        @apply col-span-2 lg:col-span-1 flex flex-col justify-center items-center gap-sm p-md;
      }
    }
  }
}
</style>
