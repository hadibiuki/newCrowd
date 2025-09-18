<template>
  <ui-Modal
    v-if="showTemplateModal"
    :text="t('transactions.transaction_detailes')"
    close-icon
    header
    width="600px"
    class="w-full lg:max-w-[530px] max-h-[500px]"
    @close="$emit('close')"
  >
    <template #body>
      <!-- <ui-InlineMessage
        v-if="isUnsigned"
        type="warning"
        :title="contract.template?.title"
        :description="t('_terminal.contract_alert.description_verify')"
      />
      <p class="text-text-soft text-body-500-b3 mt-md">
        {{ t('_terminal.contract_alert.version', { version: contract.template?.version }) }}
      </p> -->

      <div
        class="main block border border-border-divider rounded-sm flex-row items-center border-b-0"
      >
        <div class="flex w-full gap-xs flex-row main__item--detail">
          <span class="text-body-400-b3 text-text-soft main__item--heading">
            {{ $t('transactions.transaction_amount') }}
          </span>
          <span
            :class="detailesData.amount < 0 ? 'text-text-danger' : ''"
            class="text-body-400-b2 truncate flex-1 text-right"
            dir="ltr"
          >
            {{
              detailesData.amount < 0
                ? '-' + numberFormat(detailesData.amount * -1)
                : numberFormat(detailesData.amount)
            }}
          </span>
        </div>
        <div class="flex w-full gap-xs flex-row main__item--detail">
          <span class="text-body-400-b3 text-text-soft main__item--heading">
            {{ $t('transactions.transaction_id') }}
          </span>
          <span class="text-body-400-b2 flex-1"> {{ detailesData?.trackingCode }}</span>
        </div>
        <div class="flex w-full gap-xs flex-row main__item--detail">
          <span class="text-body-400-b3 text-text-soft main__item--heading">
            {{ $t('transactions.transaction_invest_from_platform') }}
          </span>
          <div class="text-body-400-b2 flex-1 flex items-center gap-8 flex-row w-full">
            <NuxtImg
              :src="getPlatformLogo"
              loading="lazy"
              width="36px"
              height="36px"
              class="rounded-md"
            />
            <div class="mr-xs">{{ getPlatformTitle }}</div>
          </div>
        </div>
        <div class="flex w-full gap-xs flex-row main__item--detail">
          <span class="text-body-400-b3 text-text-soft main__item--heading">
            {{ $t('transactions.transaction_title') }}
          </span>
          <span class="text-body-400-b2 truncate flex-1"> {{ getTitleID }}</span>
        </div>
        <div class="flex w-full gap-xs flex-row main__item--detail">
          <span class="text-body-400-b3 text-text-soft main__item--heading">
            {{ $t('title.description') }}
          </span>
          <span class="text-body-400-b2 flex-1"> {{ detailesData?.description }}</span>
        </div>
        <div class="flex w-full gap-xs flex-row main__item--detail">
          <span class="text-body-400-b3 text-text-soft main__item--heading">
            {{ $t('title.date_time') }}
          </span>
          <span class="text-body-400-b2 truncate flex-1">
            {{
              toJalali(
                detailesData?.createdDate,
                'jDD jMMMM jYYYY, HH:mm',
                'jDD jMMMM jYYYY, HH:mm',
                'jDD jMMMM jYYYY, HH:mm',
                'jDD jMMMM jYYYY, HH:mm'
              )
            }}
          </span>
        </div>
      </div>
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
const { numberFormat } = useMath();
const { toJalali } = useDate();
const { typeList } = useSessionFilter();
const props = defineProps<{
  showTemplateModal: boolean;
  platforms: Array<any>;
}>();
defineEmits(['close']);
const sessionStore = useSessionStore();
const { detailesData } = storeToRefs(sessionStore);
const t = useI18n();
const getTitleID = computed(() => {
  const type = typeList.value.filter(
    (i: { value: number }) => i.value === Number(detailesData.value.payType)
  )[0]?.label;

  return type;
});
const getPlatformTitle = computed(
  () => props.platforms.filter((i: any) => i.id === detailesData.value.platformId)[0]?.persianName
);
const getPlatformLogo = computed(
  () => props.platforms.filter((i: any) => i.id === Number(detailesData.value.platformId))[0]?.logo
);
</script>
<style lang="scss" scoped>
.main {
  @apply lg:flex-row flex-col gap-sm;
  direction: rtl;
  &__item--detail {
    @apply flex justify-between w-full gap-xs p-md  border-b border-border-divider;
  }
  &__item--heading {
    @apply text-body-400-b2 flex flex-col ml-[-1px] mb-[-1px]  min-w-[200px]  ml-[-1px] mb-[-1px]  gap-xs;
  }
}
.rtl {
  direction: rtl;
}

// .main__item--heading {
//   flex: 1 0 2%;
// }
</style>
