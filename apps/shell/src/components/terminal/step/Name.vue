<template>
  <div class="flex flex-col">
    <ui-TextField
      v-model="ssn"
      placeholder="شناسه ملی حقوقی"
      :label="false"
      class="w-full mb-sm"
      name="name"
      :helper="handler"
      @input="
        handler = {
          type: 'info',
          message: '',
        }
      "
      max-length="11"
    />
    <div class="font-yekanFa text-text-soft text-body-400-b3 mb-3xl ml-xs rtl">
      شناسه ملی حقوقی یک کد یکتای ۱۱ رقمی است که پس از ثبت قانونی شرکت، برای هر شرکت یا سازمان صادر
      می‌شود.
    </div>
  </div>
  <div class="flex flex-col gap-sm">
    <ui-Button
      :text="$t('_common.buttons.confirm_and_continue')"
      :disabled="ssn.length !== 11"
      size="large"
      :loading="loading"
      @click="submit"
    />
    <ui-Button
      :text="$t('_common.buttons.return')"
      type="tertiary"
      size="large"
      @click="$emit('preview')"
    />
  </div>
</template>

<script lang="ts" setup>
interface Handler {
  type: 'error' | 'success' | 'info';
  message: string;
}
// eslint-disable-next-line vue/require-prop-types
defineProps(['loading']);
const emit = defineEmits(['next', 'preview']);
const ssn = ref('');
const handler: Ref<Handler> = ref({ type: 'info', message: '' });
const validation = (nationalId: string) => {
  // Check if the national ID is exactly 11 digits
  if (!/^\d{11}$/.test(nationalId)) {
    return false;
  }

  // Check if the national ID is not all the same digit (e.g., 11111111111)
  if (/^(\d)\1{10}$/.test(nationalId)) {
    return false;
  }

  // Calculate oneBeforeLastChar (10th digit + 2)
  const oneBeforeLastChar = parseInt(nationalId[9]) + 2;
  // Weight dictionary for positions 1 to 10
  // Extract check digit (11th digit)
  const check = parseInt(nationalId[10]);
  let sum = 0;

  // Calculate weighted sum
  for (let i = 0; i < 10; i++) {
    const item = parseInt(nationalId[i]);
    const weight = {
      1: 29,
      2: 27,
      3: 23,
      4: 19,
      5: 17,
      6: 29,
      7: 27,
      8: 23,
      9: 19,
      10: 17,
    }[i + 1];
    const calculatedWeight = (item + oneBeforeLastChar) * weight;
    sum += calculatedWeight;
  }

  // Adjust sum: if sum % 11 === 10, set to 0, else use sum % 11
  sum = sum % 11 === 10 ? 0 : sum % 11;

  // Return true if check digit matches sum
  return check === sum;
};
const submit = () => {
  const isValid = validation(ssn.value);
  if (!isValid) {
    handler.value = {
      type: 'error',
      message: 'شناسه ملی حقوقی اشتباه وارد شده است.',
    };

    return;
  }
  emit('next', ssn.value);
};
</script>
