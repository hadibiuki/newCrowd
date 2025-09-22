<template>
  <div>
    <ui-PageHeading :title="$t('_common.links.dashboard')" :loading="loading"> </ui-PageHeading>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  loading: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
const { loading } = toRefs(props);
</script>
