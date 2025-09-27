<template>
  <div class="root">
    <div class="flex flex-row items-centers justify-center gap-xs">
      <ui-Button
        class="h-[48px]"
        type="primary"
        icon="ArrowLeft"
        :loading="loading"
        :disabled="phone.length !== 11"
        @click="onSendOtp"
      />
      <ui-TextField
        v-model="phone"
        :disabled="loading"
        :loading="loading"
        :placeholder="$t('signup.phone_input')"
        class="w-full h-[48px]"
        name="discount_percent"
        is-number
        max-length="11"
        @keyup.enter="onSendOtp"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
// eslint-disable-next-line vue/require-prop-types
defineProps<{
  loading: boolean;
}>();
const emits = defineEmits(['send']);
const phone = ref('');
const onSendOtp = () => {
  if (phone.value.length !== 11) {
    return;
  }
  emits('send', phone.value);
};
</script>
