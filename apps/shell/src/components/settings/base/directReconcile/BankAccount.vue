<template>
  <div class="flex flex-col gap-md">
    <div
      class="flex justify-between items-center gap-sm px-sm py-md border rounded-sm sm:h-[72px]"
      :class="[
        helper?.type === 'error' ? 'border-border-danger' : 'border-border-divider',
        loading ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
    >
      <div class="flex sm:flex-row flex-col sm:items-center items-start gap-sm">
        <template v-if="!loading">
          <div class="relative">
            <template v-if="bankAccount?.issuing_bank">
              <ui-Illustration
                name="BankAccount"
                class="w-[56px] h-[40px] border border-white-40 rounded-sm opacity-[0.15]"
                :style="bankStyle"
              />
              <ui-BankLogo
                class="w-[14px] h-[14px] absolute right-[5px] top-2xs"
                :name="bankAccount?.issuing_bank?.slug"
              />
            </template>
            <ui-Illustration v-else name="EmptyBank" class="w-[56px] h-[40px]" />
          </div>
          <div v-if="bankAccount?.iban" class="flex flex-col gap-2xs">
            <span
              class="font-Mono text-body-400-b2 max-w-[220px] break-words break-all sm:max-w-none"
            >
              {{ bankAccount?.iban }}
            </span>
            <span v-if="!loading" class="text-caption-400-c1 text-text-soft text-ellipsis">
              {{ bankAccount?.holder_name }} |
              {{ bankAccount?.issuing_bank?.name }}
            </span>
            <template v-else>
              <ui-Skeleton />
            </template>
          </div>
          <div v-else class="text-body-400-b3 text-text-soft">
            {{ $t('_form.settings.select_bank_account') }}
          </div>
        </template>
        <template v-else>
          <ui-Skeleton :width="56" :height="40" radius="sm" />
          <div v-if="preferredBankAccountId" class="flex flex-col gap-xs">
            <ui-Skeleton :width="204" :height="12" radius="sm" />
            <ui-Skeleton :width="104" :height="12" radius="sm" />
          </div>
          <template v-else>
            <ui-Skeleton :width="144" :height="12" radius="sm" />
          </template>
        </template>
      </div>

      <ui-Button
        variant="text"
        type="primary"
        :loading="loading"
        :text="
          bankAccount?.iban
            ? $t('_common.buttons.change_bank_account')
            : $t('_common.buttons.select_bank_account')
        "
        :disabled="loading"
      />
    </div>
    <template v-if="helper">
      <div class="text-body-400-b3 flex items-start" dir="rtl">
        <div v-if="helper.type === 'error'" class="text-text-danger flex items-start gap-2xs">
          <ui-Icon name="InfoFill" />
          {{ helper.message }}
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { colors } from '@/../tailwind.config';
import { BankAccount } from '~/graphql/graphql';

const bankColors = colors?.colors.bank;
interface Props {
  bankAccount?: BankAccount;
  loading?: boolean;
  disabled?: boolean;
  preferredBankAccountId?: string;
  helper?: {
    type: 'error' | 'success' | 'info' | undefined;
    message: string | undefined;
  };
}
const props = withDefaults(defineProps<Props>(), {
  helper: undefined,
  loading: false,
  disabled: false,
  bankAccount: undefined,
  preferredBankAccountId: undefined,
});
const { bankAccount } = toRefs(props);
const bankStyle = computed(() => {
  const slug = bankAccount.value?.issuing_bank?.slug;
  const color = slug ? bankColors[slug as keyof typeof bankColors] : null;

  return color ? { backgroundColor: color } : {};
});
</script>
