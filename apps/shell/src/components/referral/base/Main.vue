<template>
  <div class="referral">
    <ui-Card>
      <template #main>
        <div class="referral__content">
          <div class="referral__content--item" :class="{ 'w-[264px]': loading }">
            <ui-Skeleton v-if="loading" :width="164" :height="164" circle />
            <ui-Illustration v-else name="Referral" />
          </div>
          <div dir="rtl" class="referral__content--main">
            <ui-Skeleton v-if="loading" class="w-full" content-class="!w-full" :height="12" />
            <ui-Skeleton v-if="loading" class="w-full" content-class="!w-full" :height="12" />
            <ui-Skeleton v-if="loading" :width="150" :height="12" />
            <ui-Skeleton v-if="loading" :width="80" :height="12" />
            <span v-else dir="rtl" class="text-text-soft text-body-400-b3">
              {{ $t('_helper.referral.description') }}
            </span>
            <ui-Skeleton v-if="loading" class="w-full" content-class="!w-full" :height="56" />
            <ui-ClipBoard
              v-else
              :title="$t('_common.slug.invite_link')"
              class="w-full"
              :content="`${config.public.next_panel_link}auth/register?referral=${referral_id}`"
            />
          </div>
        </div>
      </template>
    </ui-Card>
    <ReferralBaseContent :loading="loading" />
    <ui-Card dir="rtl">
      <template #main>
        <div class="referral__bottom">
          <ui-Skeleton v-if="loading" :width="104" :height="24" class="px-sm py-md" />
          <span v-else class="referral__bottom--title"> {{ $t('_referral.invited_users') }} </span>
          <div class="referral__bottom--content">
            <div class="referral__bottom--content--item">
              <ui-Skeleton v-if="loading" />
              <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
              <span v-if="!loading" class="text-body-400-b3 text-text-soft">
                {{ $t('_referral.active_users_of_this_month') }}
              </span>
              <span v-if="!loading" class="text-display-700-d3">
                {{ userInvitees?.lastMonthInvitedPeople ?? '-' }}
              </span>
            </div>
            <div class="referral__bottom--content--item border-x border-border-divider">
              <ui-Skeleton v-if="loading" />
              <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
              <span v-if="!loading" class="text-body-400-b3 text-text-soft">
                {{ $t('_referral.new_users_this_month') }}
              </span>
              <span v-if="!loading" class="text-display-700-d3">
                {{ userInvitees?.lastMonthActiveInvitedPeople ?? '-' }}
              </span>
            </div>
            <div class="referral__bottom--content--item">
              <ui-Skeleton v-if="loading" />
              <ui-Skeleton v-if="loading" :width="240" :height="24" class="mt-md" />
              <span v-if="!loading" class="text-body-400-b3 text-text-soft">
                {{ $t('_referral.total_number_users_invited_far') }}
              </span>
              <span v-if="!loading" class="text-display-700-d3">
                {{ userInvitees?.allInvitedPeople ?? '-' }}
              </span>
            </div>
          </div>
          <div>
            <ReferralBaseLgGrid v-if="!md" :loading="loading" :data="data" />
            <ReferralBaseMdGrid v-if="md" :loading="loading" :data="data" />
            <div v-if="data?.length" class="mt-xl" dir="ltr">
              <ReferralBasePagination :pagination="pagination" :loading="loading" />
            </div>
          </div>
        </div>
      </template>
    </ui-Card>
  </div>
</template>
<script lang="ts" setup>
// import { UserReferred } from '@/graphql/graphql';
import {
  getUserInvitedUsersReportDetailPaginatedApi,
  getUserInviteUsersReportReferralsApi,
  getUserReferralCodeApi,
} from '~/restApi/referral';
const { md } = useSize();
const route = useRoute();
const config = useRuntimeConfig();
const data = ref(null);
const loading = ref(true);
// eslint-disable-next-line camelcase
const referral_id = ref(null);
const pagination = ref({
  page: route.query.page || 1,
  total: 150,
  pageSize: route.query.pageSize || 5,
  totalPages: 1,
});
const userInvitees = ref(null);
onMounted(async () => {
  loading.value = true;
  try {
    const [referralRes, invitedUsersRes, userInviteesStat] = await Promise.all([
      getUserReferralCodeApi(),
      init(),
      getUserInviteUsersReportReferralsApi(),
    ]);

    // eslint-disable-next-line camelcase
    referral_id.value = referralRes.data.referralCode;
    data.value = invitedUsersRes.data.items;
    userInvitees.value = userInviteesStat.data;
    pagination.value.total = invitedUsersRes.data.totalItems;
    pagination.value.totalPages = invitedUsersRes.data.totalPages;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log({ err });
  } finally {
    loading.value = false;
  }
});

const init = () =>
  getUserInvitedUsersReportDetailPaginatedApi({
    pageNumber: route.query.page || pagination.value.page,
    pageSize: route.query.pageSize || pagination.value.pageSize,
  });
watch(
  () => route.query,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      const res = await init();
      data.value = res.data.items;
      pagination.value.total = res.data.totalItems;
      pagination.value.totalPages = res.data.totalPages;
    }
  }
);
</script>
<style lang="scss" scoped>
.referral {
  @apply flex flex-col gap-md;
  &__content {
    @apply flex gap-xl flex-col md:flex-row;
    &--item {
      @apply flex justify-center;
    }
    &--main {
      @apply w-full flex flex-col gap-md justify-between;
    }
  }
  &__bottom {
    @apply flex flex-col gap-xl;
    &--title {
      @apply text-heading-600-h2;
    }
    &--content {
      @apply grid grid-cols-3 border border-border-divider;
      &--item {
        @apply col-span-3 lg:col-span-1 flex flex-col justify-center items-center gap-sm p-md;
      }
    }
  }
}
</style>
