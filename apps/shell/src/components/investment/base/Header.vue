<template>
  <ui-PageHeading
    title="فرصت های سرمایه‌گذاری"
    :loading="loading"
    has-back
    @back-roll="$router.back()"
  >
    <template #action>
      <div class="w-fit flex gap-xs">
        <ui-Button
          text="فرصت‌های سرمایه‌گذاری"
          after-icon="ArrowTopLeft"
          class="rtl"
          type="tertiary"
          @click="$router.push('/projects')"
        />
      </div>
    </template>
  </ui-PageHeading>
</template>
<script setup lang="ts">
// eslint-disable-next-line vue/require-prop-types
defineProps(['loading']);
</script>
