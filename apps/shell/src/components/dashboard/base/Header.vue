<template>
  <div>
    <ui-PageHeading
      :title="$t('_common.links.dashboard') + ' ' + (activeTerminal?.name ?? '')"
      :status="!loading ? statusHandler(activeTerminal?.status) : undefined"
      :loading="loading"
    >
      <template #action>
        <div class="w-fit flex gap-xs">
          <ui-Button
            v-if="!authStore.profileVersion"
            :text="md ? '' : $t('product.show.link')"
            :after-icon="md ? '' : 'ZarinLink'"
            :icon="md ? 'ZarinLink' : ''"
            type="tertiary"
            size="medium"
            :loading="loading"
            :disabled="activeTerminal?.status !== TerminalStatusEnum.Active"
            @click="toggleShareModal"
          />
          <SharedShareModalDashboard
            v-if="showModal"
            :link="valueOfShareModal.link"
            :telegram="valueOfShareModal.telegram"
            :whatsapp="valueOfShareModal.whatsapp"
            :qr="valueOfShareModal.qr"
            @close="toggleShareModal"
          />
        </div>
      </template>
    </ui-PageHeading>
    <SubDomainDangerAlertCallback v-if="shouldShowCallbackAlert" :loading="loading" />
    <SubDomainDangerAlertReferer v-if="shouldShowRefererAlert" :loading="loading" />
    <DashboardBaseTerminalContractAlert v-if="isShaparakTerminal" :loading="loading" />
    <DashboardBaseTerminalFeeAlert v-if="!isFeeTypeMerchant" :loading="loading" />
    <DashboardBaseDirectReconcileAlert :loading="loading" />
    <ui-Skeleton v-if="showAlertBox" :loading="loading" full-width :height="58" class="my-md">
      <ui-InlineMessage :type="alertInfo.type" :description="alertInfo.description" />
    </ui-Skeleton>
    <ui-Skeleton
      v-if="showBankAccountAlertBox"
      :loading="loading"
      full-width
      :height="58"
      class="my-md"
    >
      <ui-InlineMessage type="warning">
        <template #description>
          <i18n-t keypath="_terminal.preferred_bank_account_id_alert" tag="p">
            <template #link>
              <NuxtLink :to="terminalSettingLink" class="text-primary">
                {{
                  activeTerminal?.flag === TerminalFlagEnum.Normal
                    ? t('_common.links.terminal_settings')
                    : t('_common.page_title.zarin_link_setting')
                }}
              </NuxtLink>
            </template>
          </i18n-t>
        </template>
      </ui-InlineMessage>
    </ui-Skeleton>
    <ui-Skeleton
      v-if="userId?.transaction_ban || userId?.is_suspend"
      :loading="loading"
      full-width
      :height="58"
      class="my-md"
    >
      <ui-InlineMessage type="negative" :title="t('_helper._account.suspended_title')">
        <template #description>
          <i18n-t keypath="_helper._account.suspended_description" tag="p">
            <template #link>
              <NuxtLink to="/panel/ticket" class="text-primary">{{
                $t('_helper._account.ticket')
              }}</NuxtLink>
            </template>
          </i18n-t>
        </template>
      </ui-InlineMessage>
    </ui-Skeleton>
  </div>
</template>

<script setup lang="ts">
import { TerminalFlagEnum, TerminalFeeTypeEnum, TerminalStatusEnum } from '@/graphql/graphql';

export interface Props {
  loading: boolean;
}

const authStore = useAuthStore();
const props = withDefaults(defineProps<Props>(), {});
const { loading } = toRefs(props);
const showModal = ref(false);
const config = useRuntimeConfig();
const { activeTerminal, isShaparakTerminal } = useTerminalQuery();
const { shouldShowCallbackAlert, shouldShowRefererAlert } = usePreventProductLinksForShaparak();
const { statusHandler } = useTerminalStatus();
const t = useI18n();
const { md } = useSize();
const { data: userId } = useUserIdQuery();
const toggleShareModal = () => {
  showModal.value = !showModal.value;
};
const { zarinLinkFullLink: fullLink } = useCreatZarinLinkFullLink();
const terminalSettingLink = computed(
  () => `/panel/${encodeURIComponent(activeTerminal.value?.domain as string)}/settings?menu=Account`
);
const isFeeTypeMerchant = computed(
  () => activeTerminal.value?.fee_type === TerminalFeeTypeEnum.Merchant
);
const valueOfShareModal = ref({
  link: '',
  telegram: '',
  whatsapp: '',
  qr: '',
});
watchEffect(() => {
  valueOfShareModal.value = {
    link: fullLink.value,
    telegram: `${config.public.telegram_url}${fullLink.value}&text=${t(
      '_common.slug.online_payout'
    )}`,
    whatsapp: `${config.public.whatsapp_url}${fullLink.value}-${t('_common.slug.online_payout')}`,
    qr: `${config.public.qr_url}${fullLink.value}`,
  };
});

const alertInfo = computed(() => ({
  type: statusHandler(activeTerminal.value?.status)?.type,
  description: t(`_terminal.status_alert.${activeTerminal.value?.status}`),
}));
const showAlertBox = computed(() => activeTerminal.value?.status !== TerminalStatusEnum.Active);
const showBankAccountAlertBox = computed(
  () =>
    activeTerminal.value?.status === TerminalStatusEnum.Active &&
    !activeTerminal.value?.preferred_bank_account_id
);
</script>
