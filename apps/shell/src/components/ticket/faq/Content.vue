<template>
  <div class="root">
    <ui-Card class="w-full">
      <template #header>
        <div class="root__title">
          <ui-Skeleton v-if="loading" :height="30" :width="60" />
          <span v-if="!loading && data">{{ activeFaqGroup?.title }}</span>
        </div>
      </template>
      <template #main>
        <div v-if="data && data.Faqs">
          <div v-for="item in filteredFaqs" :key="String(item?.id)">
            <ui-Accordion :loading="loading" class="text-right" :label="String(item?.question)">
              <template #content>
                <div
                  class="text-wrap"
                  dir="rtl"
                  v-html="checkCustomContent(mdRender.render(String(item?.answer).trim()))"
                ></div>
              </template>
            </ui-Accordion>
          </div>
        </div>
        <div v-else class="w-full">
          <ui-Accordion v-for="item in 4" :key="item" :loading="loading" class="text-right" />
        </div>
        <div class="root__divider">
          <ui-Divider />
        </div>
        <div class="root__notice" dir="rtl">
          <ui-skeleton v-if="loading" :width="300" />
          <ui-Icon v-if="!loading" name="InfoFill" class="root__notice__icon" />
          <i18n-t
            v-if="!loading"
            keypath="_common.notice.addTicket"
            tag="p"
            class="text-body-400-b2 text-text"
          >
            <template #action>
              <NuxtLink to="/panel/ticket/add" class="primary--link px-xs">
                {{ $t('_common.notice.newTicket') }}
              </NuxtLink>
            </template>
          </i18n-t>
        </div>
      </template>
    </ui-Card>
  </div>
</template>

<script setup lang="ts">
const { mdRender, checkCustomContent } = useMarkdown();
const { data, loading } = useFaqQuery();
const faqStore = useFaqStore();
// const filteredFaqs = computed(() => {
//   const groups = data.value?.Faqs;
//   if (!groups || !faqStore.slug) {
//     return [];
//   }

//   const group = groups.find(i => i?.id === faqStore.slug);

//   return group?.faqs || [];
// });
// eslint-disable-next-line padding-line-between-statements
const filteredFaqs = [
  {
    __typename: 'FaqCategoryType',
    id: '2',
    title: 'لورم ایپسوم',
    slug: 'terminal',
    question: 'لورم ایپسوم متن ساختگی',
    answer:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.\n- لورم ایپسوم متن ساختگی\n- لورم ایپسوم متن ساختگی\n- لورم ایپسوم متن ساختگی',
    faq_department_id: null,
    created_at: null,
    updated_at: null,
  },
  {
    __typename: 'FaqCategoryType',
    id: '9',
    title: 'لورم ایپسوم',
    slug: 'legal_help',
    question: 'لورم ایپسوم متن ساختگی',
    answer:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.',
    faq_department_id: null,
    created_at: null,
    updated_at: null,
  },
];
const activeFaqGroup = computed(() => {
  const groups = data.value?.Faqs;
  if (!groups || !faqStore.slug) {
    return null;
  }

  return groups.find(i => i?.id === faqStore.slug) || null;
});
</script>

<style lang="scss" scoped>
@use './content.scss';
</style>
