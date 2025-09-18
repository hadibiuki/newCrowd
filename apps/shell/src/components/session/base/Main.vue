<template>
  <div>
    <ui-Card>
      <template #main>
        <div class="mb-xl flex justify-start flex-row-reverse gap-xs flex-wrap">
          <ui-Skeleton :loading="loading" :width="83" :height="33" radius="xl">
            <sessionBaseFilter />
          </ui-Skeleton>
          <ui-Skeleton :loading="loading" :width="83" :height="33" radius="xl">
            <sessionBaseFilterType />
          </ui-Skeleton>
          <ui-Skeleton :loading="loading" :width="67" :height="33" radius="xl">
            <SharedDateFilter />
          </ui-Skeleton>
          <!-- <ui-Skeleton :loading="loading" :width="63" :height="33" radius="xl">
            <SharedAmountFilter />
          </ui-Skeleton> -->
          <ui-Divider type="vertical" height="32" class="mx-2xs hidden md:flex" />
          <ui-Skeleton :loading="loading" :width="180" :height="32" radius="xl">
            <SharedSearchFilter
              :rows="items"
              :placeholder="$t('_form.search.session')"
              @submit="onSubmit"
            />
          </ui-Skeleton>
        </div>
        <SessionBaseContent />
      </template>
    </ui-Card>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';

export interface RowType {
  label: string;
  value: string;
  helper: string;
  model: string;
}
const t = useI18n();
const router = useRouter();
const route = useRoute();
const sessionStore = useSessionStore();
const { loading } = storeToRefs(sessionStore);
const items = [
  {
    label: `${t('common.table.session_id')}:`,
    helper: `${t('common.table.session_id')}`,
    value: 'id',
  },
];
const onSubmit = (selected: RowType[]) => {
  const newQuery = { ...route.query };
  items.forEach(item => {
    delete newQuery[item.value];
  });
  selected.forEach(i => {
    newQuery[i.value] = i.model;
  });

  router.push({
    query: newQuery,
  });
};
</script>
