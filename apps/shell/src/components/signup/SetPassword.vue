<template>
  <div class="root">
    <div class="flex flex-col items-centers justify-center gap-xs">
      <ui-TextField
        v-model="password"
        :disabled="loading"
        :loading="loading"
        :placeholder="$t('signup.password')"
        :type="passwordType"
        class="w-full h-[48px]"
        :after-icon="passwordType === 'password' ? 'EyeHidden' : 'EyeShow'"
        @update:modelValue="handelPasswordValidation"
        @buttonAction="passwordType = passwordType === 'password' ? 'text' : 'password'"
      />
      <div v-if="validateProccessing" class="checks w-full flex flex-col ml-auto">
        <!-- :modelValue="staticValidate" -->
        <div
          v-for="(check, index) in checks"
          :key="index"
          shape="rounded"
          disabled
          :type="!!check.validate ? 'success' : 'error'"
          class="mb-1 rtl"
        >
          <span
            class="flex text-body-500-b3"
            :class="[
              !password.length
                ? 'input__description__helper--info'
                : !!check.validate
                ? 'input__description__helper--success'
                : 'input__description__helper--error',
            ]"
          >
            {{ check.message }}
          </span>
        </div>
      </div>

      <ui-TextField
        v-model="passwordReapet"
        :disabled="loading"
        :loading="loading"
        :placeholder="$t('signup.reapet_password')"
        :type="passwordReapetType"
        class="w-full h-[48px] my-md"
        :after-icon="passwordReapetType === 'password' ? 'EyeHidden' : 'EyeShow'"
        @buttonAction="passwordReapetType = passwordReapetType === 'password' ? 'text' : 'password'"
      />

      <ui-TextField
        v-model="referalCode"
        :disabled="loading || route.query.referral"
        :loading="loading"
        :placeholder="$t('signup.referral_code')"
        class="w-full h-[48px] mb-md"
      />

      <ui-Select
        :data="howToFindOption"
        class="w-full h-3xl mb-3xl"
        after-icon="AngleDown"
        name="dropDown"
        :disabled="loading"
        :placeholder="$t('signup.howToFindZarinPal')"
        @selected-item="selectedFind"
      />
      <ui-Button
        :disabled="!isValidate"
        :loading="loading"
        :text="$t('signup.continue')"
        @click="sendFormInfo"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  loading: boolean;
}>();
const route = useRoute();
const emits = defineEmits(['data']);
const { checks, checkPasswordStrength } = usePasswordStrength();
const { $notify } = useNuxtApp();
const password = ref('');
const passwordReapet = ref('');
const passwordType = ref('password');
const passwordReapetType = ref('password');
const referalCode = ref(route.query.referral || '');
const howToFindZarinCrowd = ref('');
const validateProccessing = ref(false);
const howToFindOption = [
  {
    title: 'دوستان و آشنایان',
    id: 'دوستان و آشنایان',
  },
  {
    title: 'تبلیغات تلویزیونی',
    id: 'تبلیغات تلویزیونی',
  },
  {
    title: 'تبلیغات شهری',
    id: 'تبلیغات شهری',
  },
  {
    title: 'شبکه های اجتماعی',
    id: 'شبکه های اجتماعی',
  },
  {
    title: 'سایر',
    id: 'سایر',
  },
];
const isValidate = ref(false);
const handelPasswordValidation = () => {
  checkPasswordStrength(password.value);
  if (Object.values(checks.value).filter(rule => rule.validate === true).length === 5) {
    isValidate.value = true;
  } else {
    isValidate.value = false;
  }
  validateProccessing.value = true;
};
const selectedFind = (item: Record<string, string>) => {
  howToFindZarinCrowd.value = item.id;
};
const sendFormInfo = () => {
  console.log({ xxx: password.value });
  console.log({ passwordReapet: passwordReapet.value });

  if (password.value !== passwordReapet.value) {
    $notify({
      isRead: false,
      message: 'رمز عبور با تکرار آن برابر نیست',
      type: 'error',
    });

    return;
  }
  emits('data', {
    password: password.value,
    repeatPassword: passwordReapet.value,
    referralCode: referalCode.value,
    howToFindZarinCrowd: howToFindZarinCrowd.value,
  });
};
</script>

<style lang="scss" scoped>
.input {
  @apply relative;

  &__inner {
    @apply focus-within:border-interactive-focus border focus-within:shadow-border-focus-soft;

    input {
      @apply w-full bg-transparent p-sm font-normal text-body-400-b2 text-text relative disabled:text-text-disabled;
    }

    &__input-section {
      @apply flex;
    }

    &--error {
      @apply border-border-danger rounded-sm border;
    }

    &--disabled {
      @apply border-border-disabled bg-surface-disabled rounded-sm;
    }

    &--default {
      @apply bg-surface border border-border rounded-sm focus:border focus:border-interactive-focus;
      @apply hover:shadow-border-hover;
    }

    &--loading {
      @apply absolute top-md right-2xl w-[5.5rem] px-2xs py-2xs;
    }

    &__label {
      @apply absolute -top-[12px] right-xs transition-all;

      &__container {
        @apply relative bg-surface px-2xs text-caption-400-c1 text-text-soft z-10;
      }
    }

    &__icon {
      @apply text-icon;

      &--before {
        @apply my-sm mr-xs flex;
      }

      &--after {
        @apply my-2xs mt-[5px] flex p-[7px];
      }
    }

    &__unit {
      @apply bg-surface-soft rounded-sm p-xs my-auto mx-2xs text-text text-body-400-b2;
    }

    &__button {
      @apply rounded-sm my-auto mx-2xs text-text text-body-400-b2;
    }

    &__stepper {
      @apply mx-2xs text-text text-body-400-b2 flex flex-col gap-[2px] my-[2px];

      button {
        @apply px-sm py-[6px];
      }
    }
  }

  &__description {
    @apply flex justify-between flex-row-reverse;

    i {
      @apply align-middle;
    }

    &__helper {
      @apply my-2xs pr-xs font-normal text-body-400-b3 font-yekanFa;

      &--error {
        @apply text-text-danger;
      }

      &--success {
        @apply text-text-success;
      }

      &--info {
        @apply text-text-soft;
      }
    }

    &__limit {
      @apply font-yekanFa text-text-soft text-body-400-b3 my-2xs ml-xs;
    }
  }

  input {
    &::placeholder {
      @apply font-yekanFa;
    }
  }
}
</style>
