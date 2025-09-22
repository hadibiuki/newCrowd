<template>
  <ui-Card class="shadow-elevation-100 w-[360px] !pt-0">
    <template #header>
      <div class="relative">
        <ui-Tab v-model="activeTab" :items="tabs" has-border class="-mx-md" />
        <ui-Button
          v-if="activeTab === '1' && hasArchiveAnnouncements"
          :text="$t('_common.buttons.read_all')"
          variant="text"
          class="absolute top-[15px]"
          before-icon="DoubleTick"
          @click="addArchive(undefined, 'all')"
        />
      </div>
    </template>
    <template #main>
      <div
        v-if="activeTab === '1'"
        ref="contentEl"
        class="max-h-[480px] overflow-y-auto -mx-md"
        dir="rtl"
      >
        <div v-if="announcements?.length" class="notification pt-sm px-md" dir="ltr">
          <div
            v-for="(item, index) in announcements"
            :key="item.id"
            class="notification__item w-full"
            :class="item.isRead ? 'opacity-80' : ''"
          >
            <div class="flex flex-col items-end w-full">
              <NuxtImg
                v-if="item.notificationFile && item.notificationFile.url"
                :src="item.notificationFile.url"
                width="100%"
                height="100%"
                fit="containt"
                :placeholder="[40, 40]"
                loading="lazy"
                class="rounded-md h-full object-cover w-full"
              />
              <div class="flex flex-row-reverse gap-xs w-full">
                <div class="flex flex-col items-center">
                  <ui-Icon name="NotificationChannel" />
                  <span v-if="!item.isRead" class="w-xs h-xs rounded-circle bg-primary mt-[20px]" />
                </div>
                <div class="flex gap-xs flex-col w-full flex-grow">
                  <div class="text-body-400-b2" dir="rtl">
                    {{ item.title }}
                  </div>
                  <div class="text-body-400-b3 text-text-soft mt-xs" dir="rtl">
                    {{ item.message }}
                  </div>
                  <div v-if="item.url" class="flex justify-end">
                    <ui-Button
                      :text="item.url_title"
                      before-icon="ArrowTopLeft"
                      variant="text"
                      @click="onChangeRoute(item.url)"
                    />
                  </div>
                  <div class="flex justify-between w-full flex-row-reverse mt-sm">
                    <span dir="rtl" class="text-text-soft text-body-400-b3">
                      {{ toJalali(item.createdDate, 'jDD jMMMM jYYYY', 'jDD jMMMM', '', '') }}
                    </span>
                    <ui-Button
                      v-if="!item.isRead"
                      :text="$t('_common.buttons.read')"
                      variant="text"
                      @click="addArchive(item.id)"
                    />
                  </div>
                  <ui-Divider v-if="index !== announcements.length - 1" class="w-full my-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-col items-center gap-xl py-xl">
          <ui-EmptyState
            :title="$t('_common.empty.announcement.title')"
            :description="$t('_common.empty.announcement.caption')"
            vector="Announcement"
          />
        </div>
      </div>
    </template>
  </ui-Card>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { notificationMarkAllAsReadApi, notificationMarkAsReadApi } from '~/restApi/notification';

const t = useI18n();
const authStore = useAuthStore();
const { announcements } = storeToRefs(authStore);
const { toJalali } = useDate();
const activeTab = ref('1');
const contentEl = ref();
const tabs = ref([
  // { label: t('_common.buttons.notifications'), value: '2', isNotif: false },
  { label: t('common.notif.announcement'), value: '1', isNotif: false },
]);
const onChangeRoute = (link: string) => window.open(link, '_blank');
const addArchive = (id?: string, type: 'single' | 'all' = 'single') => {
  if (type === 'single') {
    announcements.value = announcements.value.map(announcements => {
      if (announcements.isRead) {
        return announcements;
      } else {
        return {
          ...announcements,
          isRead: id === announcements.id,
        };
      }
    });
    notificationMarkAsReadApi(id);
  } else {
    announcements.value = announcements.value.map(announcements => {
      if (announcements.isRead) {
        return announcements;
      } else {
        return {
          ...announcements,
          isRead: true,
        };
      }
    });
    notificationMarkAllAsReadApi();
  }
};
const hasArchiveAnnouncements = computed(
  () => announcements.value && announcements.value.filter(item => !item?.isRead)?.length
);
</script>
<style lang="scss" scoped>
.notification {
  @apply flex flex-col justify-center items-end;
  &__header {
    @apply py-md text-text-soft text-body-400-b3;
  }
  &__item {
    @apply flex justify-end flex-row-reverse gap-xs;
  }
}
:deep(.notification a) {
  @apply text-primary;
}
</style>
