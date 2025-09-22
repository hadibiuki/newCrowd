<template>
  <div class="w-full px-md">
    <ReferralBaseHeader />
    <ReferralBaseMain class="pb-3xl w-full lg:mx-auto max-w-[944px]" />
  </div>
</template>
<script lang="ts" setup>
const t = useI18n();
definePageMeta({
  name: 'referral',
  layout: 'terminal',
});
useHead({
  title: `${t('_common.page_title.referrer')}`,
});
</script>
