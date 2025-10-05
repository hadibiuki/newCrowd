<template>
  <UserBaseLoadInfo v-if="loading" />
  <div v-else>
    <div class="mb-xl user-info" dir="rtl">
      {{ $t('_common.buttons.userProfile') }}
    </div>
    <div class="flex items-center justify-between mb-xl">
      <ui-Avatar :src="userAuth.avatarFile?.url" shape="rounded" size="lg" />
      <ui-ZpBadge :id="userAuth?.id" />
    </div>

    <!-- <div class="flex justify-end gap-md">
    <ui-FloatButton
      class="upload-logo"
      :icon="userAuth?.avatarFile?.url ? 'PenEdit' : 'Plus'"
      :loading="loading || loadingEdit"
      @click="chooseFiles()"
    >
      <template #default>
        <div class="w-4xl h-4xl flex items-center justify-center">
          <input ref="fileUpload" type="file" accept="image/png" hidden @change="getFile" />
          <SharedTerminalLogo
            :logo="userAuth?.avatarFile?.url ? userAuth?.avatarFile?.url : undefined"
            size="large"
          />
        </div>
      </template>
    </ui-FloatButton>
  </div> -->
    <!-- <ui-InlineMessage
      v-if="userId?.transaction_ban || userId?.is_suspend"
      type="negative"
      class="!mb-xl !mt-0"
      :title="$t('_helper._account.suspended_title')"
    >
      <template #description>
        <i18n-t keypath="_helper._account.suspended_description" tag="p">
          <template #link>
            <NuxtLink to="/panel/ticket" class="text-primary">{{
              $t('_helper._account.ticket')
            }}</NuxtLink>
          </template>
        </i18n-t>
      </template>
    </ui-InlineMessage> -->
    <div
      class="main block border border-border-divider rounded-sm flex-row items-center border-b-0"
    >
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          {{ $t('_user.full_name') }}
        </span>
        <span class="text-body-400-b2 truncate flex-1"> {{ userAuth?.fullName }}</span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          {{ $t('_user.ssn') }}
        </span>
        <span class="text-body-400-b2 truncate flex-1"> {{ userAuth?.nationalCode }}</span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          {{ $t('_form.add_invoice.mobile') }}
        </span>
        <span class="text-body-400-b2 truncate flex-1"> {{ userAuth?.phoneNumber }}</span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          {{ $t('user.profile.bource_code') }}
        </span>
        <span class="text-body-400-b2 truncate flex-1">
          {{ userAuth?.bourseCode }}
        </span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          {{ $t('user.profile.email') }}
        </span>
        <span class="text-body-400-b2 truncate flex-1">
          {{ userAuth?.email }}
        </span>
      </div>
      <div class="flex w-full gap-xs flex-row main__item--detail">
        <span class="text-body-400-b3 text-text-soft main__item--heading">
          {{ $t('user.profile.nick_name') }}
        </span>
        <span class="text-body-400-b2 truncate flex-1">
          {{ userAuth?.nickName }}
        </span>
      </div>
    </div>
    <div class="mt-xl flex items-end">
      <ui-Switch
        :checked="userAuth.showNickName"
        :loading="loading"
        :label="$t('user.profile.show_nick_name_to_user')"
        name="date_time"
        class="ltr"
        @change="toggleNickname"
      />
    </div>
    <div class="mt-xl rtl text-text text-body-400-b3">
      <span v-if="years">{{ `${years.toLocaleString('fa')}  سال و` }} </span>
      <span v-if="months">{{ ` ${months.toLocaleString('fa')} ماه ` }}</span>
      <span class="text-text-soft"> {{ $t('_user.companionOfZarinPal') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { showNickNameToOtherUsersApi, getUserProfileInformationApi } from '~/restApi/profile';
const loading = false;
const authStore = useAuthStore();
const { userOriginAuth: userAuth } = storeToRefs(authStore);
const { getNow, getMoment } = useDate();
const createdAt = userAuth?.value?.createdDate;
const now = getNow();
const duration = getMoment().duration(now.diff(createdAt));
const [years, months] = [duration.years(), duration.months()];
// eslint-disable-next-line require-await
const toggleNickname = async () => {
  showNickNameToOtherUsersApi(false);

  // eslint-disable-next-line promise/catch-or-return, promise/always-return
  getUserProfileInformationApi().then(response => {
    authStore.setUserAuth(response.data);
  });
};
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
    @apply flex-[1_0_25%];
  }
}
.rtl {
  direction: rtl;
}
</style>
