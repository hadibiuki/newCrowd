<template>
  <div class="w-full h-full px-md pb-3xl">
    <TerminalAddHeader :flag="currentFlag" />
    <TerminalAddMain @update-flag="updateFlagHandler" />
  </div>
</template>
<script lang="ts" setup>
import { TerminalFlagEnum } from '@/graphql/graphql';
const currentFlag = ref<TerminalFlagEnum>(TerminalFlagEnum.Normal);
definePageMeta({
  name: 'add-terminal',
  layout: 'base',
});
const t = useI18n();
useHead({
  title: t('_common.page_title.create_terminal'),
});
const updateFlagHandler = (value: TerminalFlagEnum) => {
  currentFlag.value = value;
};
</script>
