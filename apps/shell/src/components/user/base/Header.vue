<template>
  <div ref="userHeader">
    <ui-PageHeading
      has-back
      :title="$t('_common.buttons.userProfile')"
      @back-roll="$router.push(`/panel/dashboard`)"
    >
    </ui-PageHeading>
  </div>
</template>

<script setup lang="ts">
const userHeader = ref();
const calcUserHeaderHeight = () =>
  userHeader.value && userHeader.value.getBoundingClientRect().height;
defineExpose({ calcUserHeaderHeight });
</script>
