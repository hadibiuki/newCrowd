<template>
  <ui-PageHeading
    size="2xl"
    class="setting-add-header"
    title="تنظیمات حساب حقوقی"
    @back-roll="$router.back()"
    has-back
  />
</template>
<script lang="ts" setup></script>
<style lang="scss">
.setting-add-header {
  @apply px-md lg:px-0;

  &.sticky {
    @apply px-0;
  }
}
</style>



