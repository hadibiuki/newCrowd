<template>
  <div>
    <div>
      <ui-Tab v-model="tab" :items="tabs" has-border align="start" />
    </div>
    <!-- direct reconcile bank account -->
    <SharedBankAccountOverviewDirectReconcileBanks v-if="showDirectReconcileBanks" class="mt-xl" />
    <div class="mt-xl mb-3xl">
      <template v-if="loading">
        <ui-TableCard v-for="i in [1, 2, 3]" :key="i" class="tableCard">
          <template #header>
            <div class="flex items-center gap-xs">
              <div class="tableCard__header--id">
                <div class="flex gap-xs items-center">
                  <ui-Skeleton :width="40" :height="40" radius="sm" />
                  <div class="flex flex-col gap-2xs">
                    <ui-Skeleton :width="200" :height="12" />
                    <ui-Skeleton :width="60" :height="12" />
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #main>
            <!-- iban column -->
            <div class="tableCard__main--title">
              <ui-Skeleton :width="40" />
              <div class="tableCard__main--title__title">
                <ui-Skeleton :width="40" />
              </div>
            </div>
            <ui-Divider class="w-full my-sm" />
            <!-- status column -->
            <div class="tableCard__main--title">
              <ui-Skeleton :width="40" />
              <div class="tableCard__main--title__title">
                <ui-Skeleton :width="40" />
              </div>
            </div>
          </template>
        </ui-TableCard>
      </template>
      <template v-else>
        <template v-if="filteredData?.length === 0">
          <ui-EmptyState
            v-if="_isEmpty(store.searchText)"
            :title="
              linkValue === BankAccountTypeEnum.Share
                ? $t('_empty.partner.title')
                : $t('_empty.bank_account.title')
            "
            :description="
              linkValue === BankAccountTypeEnum.Share
                ? $t('_empty.partner.caption')
                : $t('_empty.bank_account.caption')
            "
            vector="StakedBankCards"
          />
          <ui-EmptyState
            v-else
            :title="$t('_common.empty.titleNoResult')"
            :description="$t('_common.empty.descriptionNoResult')"
            vector="NoResult"
          >
            <template #action>
              <div class="flex justify-center">
                <ui-Button
                  after-icon="Trash"
                  :text="$t('_common.buttons.removeFilters')"
                  type="secondary"
                  @click="handleClear"
                />
              </div>
            </template>
          </ui-EmptyState>
        </template>

        <template v-else>
          <ui-TableCard
            v-for="i in filteredData"
            :key="i?.id"
            class="tableCard"
            @click="selectedBankHandler(i)"
          >
            <template #header>
              <div class="flex items-center gap-xs w-full">
                <div class="tableCard__header--id w-full">
                  <div class="flex justify-between gap-xs items-center w-full">
                    <ui-Skeleton v-if="loading" :width="40" :height="40" radius="sm" />
                    <div
                      v-else-if="i.bankInformation?.english_name"
                      class="h-[40px] w-[40px] border border-border-soft bg-surface-soft rounded-md p-xs"
                    >
                      <ui-BankLogo
                        v-if="i?.bankInformation"
                        :name="
                          i.bankInformation.english_name.charAt(0).toUpperCase() +
                          i.bankInformation.english_name.slice(1)
                        "
                        class="w-[24px] h-[24px]"
                      />
                    </div>
                    <div v-else-if="!loading && !i.bankInformation?.english_name">
                      <ui-Avatar shape="square" type="Box" />
                    </div>
                    <div class="flex flex-col gap-2xs">
                      <ui-Skeleton v-if="loading" :width="200" :height="18" />
                      <span
                        v-else
                        class="text-body-400-b2 text-text font-Mono flex flex-wrap break-all"
                      >
                        {{ i.shebaNumber }}
                      </span>
                      <ui-Skeleton v-if="loading" :width="60" :height="18" />
                      <span v-else class="text-caption-400-c1 text-text-soft">{{
                        i.holderName
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #main>
              <!-- iban column -->
              <div class="tableCard__main--title">
                <div class="text-body-400-b3 text-text-soft">{{ $t('_bank_account.bank') }}</div>
                <div class="tableCard__main--title__title">
                  <ui-Skeleton v-if="loading" :width="40" :height="20" />
                  <template v-else-if="!loading && i?.bankInformation?.name">
                    {{ replace(i?.bankInformation?.name, 'بانک', '') }}
                  </template>
                </div>
              </div>
              <ui-Divider class="w-full my-sm" />
              <!-- status column -->
              <div class="tableCard__main--title">
                <div class="text-body-400-b3 text-text-soft">{{ $t('_common.table.status') }}</div>
                <div class="tableCard__main--title__title">
                  <ui-Skeleton v-if="loading" :width="40" :height="20" />
                  <ui-Status
                    v-else
                    :text="getStatusInfo(i?.status).text"
                    :type="getStatusInfo(i?.status).type"
                  />
                </div>
              </div>
              <!-- action column -->
            </template>
          </ui-TableCard>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { replace } from 'lodash';
import { BankAccount, BankAccountTypeEnum } from '@/graphql/graphql';
import { useBankAccountStatus } from '@/composables/bank/useBankAccountStatus';

const { getStatusInfo } = useBankAccountStatus();
const store = useBankAccountStore();
const selectedIban = ref();
inject('isUserBankAccount');
interface TabItem {
  label: string;
  meta: string;
  active: boolean;
  value: BankAccountTypeEnum;
}
export interface Props {
  linkValue?: BankAccountTypeEnum;
  selectedBankAccount: BankAccount | undefined;
  tabs: TabItem[];
  data: Object;
}
const props = withDefaults(defineProps<Props>(), {
  linkValue: BankAccountTypeEnum.Personal,
});
const { linkValue, selectedBankAccount } = toRefs(props);
const filteredData = computed(() => props.data);
const selectedBank = ref();
const tab = ref<BankAccountTypeEnum>(linkValue.value);
const emit = defineEmits(['select', 'change-tab', 'clear']);
const selectedBankHandler = () => {
  emit('select', selectedBank.value);
};
onMounted(() => {
  if (selectedBankAccount.value) {
    selectedBank.value = selectedBankAccount.value;
  } else {
    selectedBank.value = store.selectedBankaccount;
  }
  selectedIban.value = selectedBank.value?.id;
});
const handleClear = () => {
  emit('clear');
};
const loading = inject<Ref<boolean>>('loading');
const showDirectReconcileBanks = inject('showDirectReconcileBanks');
</script>

<style lang="scss" scoped>
:deep(.pin__color) {
  i {
    @apply text-zarin;
    @apply fill-zarin;
  }
}
.tableCard {
  @apply flex flex-col gap-md mb-md;
  &__header {
    @apply flex justify-between flex-wrap items-center;
    &--id {
      @apply flex items-center;
      &__text {
        @apply text-text pl-sm text-body-400-b1 font-medium;
      }
    }
    &--status {
      @apply -mt-sm;
    }
  }
  &__main {
    @apply -mb-md;
    &--title {
      @apply flex justify-between;
      &__label {
        @apply text-body-400-b3 text-text-soft font-medium pl-sm;
      }
      &__title {
        @apply text-body-400-b2 text-text;
      }
    }
  }
}
</style>
