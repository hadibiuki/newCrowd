<template>
  <ui-PageHeading :title="$t('common.sessions')" :loading="loadingData">
    <!-- :description="!!data?.length && $t('session.description')" -->
  </ui-PageHeading>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
const sessionStore = useSessionStore();
const { loading: loadingData } = storeToRefs(sessionStore);
</script>
