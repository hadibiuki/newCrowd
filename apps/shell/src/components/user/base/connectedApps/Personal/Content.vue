<template>
  <UserBaseConnectedAppsPersonalLgGrid v-if="!md" />
  <UserBaseConnectedAppsPersonalMdGrid v-else />
</template>
<script setup lang="ts">
const { md } = useSize();
</script>

<style lang="scss" scoped>
.loading {
  @apply flex;
}
</style>
