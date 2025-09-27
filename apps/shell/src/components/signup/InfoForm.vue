<template>
  <div class="root">
    <div class="flex flex-col items-centers justify-center gap-xs">
      <ui-InlineMessage
        type="warning"
        :title="$t('signup.sejam_auth')"
        :description="$t('signup.sejam_auth_description')"
        class="mb-md"
      />
      <ui-TextField
        v-model="name"
        :disabled="loading"
        :loading="loading"
        :placeholder="$t('signup.name')"
        class="w-full mb-md"
      />
      <!-- @keyup.enter="onSendOtp" -->
      <ui-TextField
        v-model="family"
        :disabled="loading"
        :loading="loading"
        :placeholder="$t('signup.family')"
        class="w-full mb-3xl"
      />
      <!-- @keyup.enter="onSendOtp" -->

      <ui-Button
        :disabled="!family.length || !name.length"
        :loading="loading"
        :text="$t('signup.continue')"
        @click="sendFormInfo"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line vue/require-prop-types
defineProps<{
  loading: boolean;
}>();
const emits = defineEmits(['data']);
const name = ref('');
const family = ref('');
const sendFormInfo = () => {
  emits('data', {
    firstName: name.value,
    lastName: family.value,
  });
};
</script>
