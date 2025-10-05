<template>
  <div>
    <ui-TableCard v-for="i in data" :key="i?.id" class="root" @click="clicked(i)">
      <template #header>
        <div class="root__header">
          <!-- amount column -->
          <div class="root__header--id">
            <div :class="i.amount < 0 ? 'text-text-danger' : ''" class="flex items-center gap-sm">
              <span dir="ltr">{{
                i.amount < 0 ? '-' + numberFormat(i.amount * -1) : numberFormat(i.amount)
              }}</span>
            </div>
            <ui-Label :text="$t('_common.currency.rial')" type="neutral" />
          </div>
          <!-- status column -->
          <div class="root__header--status">
            <ui-Status :text="getStatusInfo(i?.state).text" :type="getStatusInfo(i?.state).type" />
          </div>
        </div>
      </template>
      <template #main>
        <!-- id column -->
        <div class="root__main--title">
          <div class="root__main--title__label">
            {{ columns[1].label }}
          </div>
          <div class="root__main--title__title">
            {{ i?.trackingCode }}
          </div>
        </div>
        <ui-Divider />
        <!-- date colum -->
        <div class="root__main--title mt-sm">
          <div class="root__main--title__label">
            {{ columns[3].label }}
          </div>
          <div class="root__main--title__title">
            {{ toJalali(i?.createdDate) }}
          </div>
        </div>
        <ui-Divider />
        <div class="root__main--title mt-sm">
          <div class="root__main--title__label">
            {{ columns[2].label }}
          </div>
          <div class="root__main--title__title">
            {{ i?.description }}
          </div>
        </div>
      </template>
    </ui-TableCard>
  </div>
</template>

<script setup lang="ts">
import { getAllTransacionsApi } from '~/restApi/transactions';
const { toJalali } = useDate();

export interface Props {
  loading: boolean;
}
const { columns } = useSessionColumns();
const { getStatusInfo } = useSessionStatus();
const { numberFormat } = useMath();
const store = useSessionStore();
const data = ref([]);
const loading = ref(false);
async function refetchData() {
  loading.value = true;
  const body = {
    pageNumber: 1,
    pageSize: 5,
  };
  const customData = await getAllTransacionsApi(body);

  data.value = customData.data.items;
  loading.value = false;
}
const clicked = (item: { id: string | number }) => {
  store.detailesData = item;
  store.showModal = true;
};
onMounted(() => {
  refetchData();
});
</script>
<style lang="scss" scoped>
.root {
  @apply mt-md;
  &__header {
    @apply flex justify-between;
    &--id {
      @apply flex items-center gap-2xs;
      &__text {
        @apply text-body-400-b2 text-text;
      }
    }
    &--status {
      @apply flex gap-2xs;
    }
  }
  &__main {
    &--title {
      @apply flex justify-between mb-sm;
      &__label {
        @apply text-body-400-b3 text-text-soft font-medium pl-sm;
      }
      &__title {
        @apply text-body-400-b2 text-text;
      }
    }
  }
  &__footer {
    @apply flex justify-between;
    &__detail {
      @apply text-body-400-b2 text-primary font-medium my-auto;
    }
    &__button {
      @apply text-body-400-b2 text-text;
    }
  }
}
</style>
