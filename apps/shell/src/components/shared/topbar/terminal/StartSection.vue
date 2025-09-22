<template>
  <div id="top_bar" class="root__start-section">
    <ui-Menu id="user_product_tour" class="root__user-menu">
      <template #activator>
        <ui-ActionButton
          id="userDefault_product_tour"
          value="user"
          placeholder="1"
          :content="UserSectionCard"
        >
          <template #default>
            <ui-Avatar v-if="userAvatar" :src="userAvatar" has-border size="sm" shape="rounded" />
            <ui-Avatar
              v-else
              size="sm"
              class-icon="w-md h-md !text-heading-600-h3 flex items-center"
              shape="rounded"
            />
          </template>
        </ui-ActionButton>
      </template>
    </ui-Menu>
    <ui-Badge id="notification_product_tour" :content="notifyCount">
      <template #default>
        <ui-ActionButton
          ref="actionButtonRef"
          value="notification"
          placeholder="2"
          :content="NotificationSectionCard"
        >
          <template #default>
            <ui-Tooltip :content="$t('_common.buttons.notifications')">
              <ui-button icon="Notification" type="tertiary" class="w-[40px] h-[40px]" />
            </ui-Tooltip>
          </template>
        </ui-ActionButton>
      </template>
    </ui-Badge>
    <ui-Badge id="ticket_product_tour" :content="0">
      <template #default>
        <ui-Tooltip :content="$t('_common.page_title.tickets')" @click="onTicket">
          <ui-Button
            after-icon="ChatMessage"
            type="tertiary"
            :icon="md ? 'ChatMessage' : undefined"
            :text="!md ? $t('_common.page_title.tickets') : ''"
            :class="!md ? 'w-[108px]' : 'w-[40px]'"
          />
        </ui-Tooltip>
      </template>
    </ui-Badge>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import UserSectionCard from '../UserSectionCard.vue';
import NotificationSectionCard from '../NotificationSectionCard.vue';
import { getAllnotificationsApi } from '~/restApi/notification';
const { md } = useSize();
const router = useRouter();
const onTicket = () => {
  router.push('/panel/ticket');
};
const userAvatar = ref('');
const authStore = useAuthStore();
const { announcements, userAuth } = storeToRefs(authStore);
const notifyCount = computed(() => {
  if (announcements.value?.length) {
    const count = announcements.value.filter(item => !item.isRead).length;

    return count > 99 ? '+99' : count;
  }
});
const actionButtonRef = ref();
const isShow = computed(() => actionButtonRef.value?.tippyRef?.state?.isShown);
const checkImage = () => {
  const img = new Image();
  img.src = `${userAuth.value?.avatarFile?.url}`;
  img.onload = () => {
    userAvatar.value = userAuth.value?.avatarFile?.url as string;
  };
  img.onerror = () => {
    userAvatar.value = '';
  };
};
useHead({
  bodyAttrs: {
    class: computed(() => (isShow.value ? 'overflow-y-hidden !pr-0' : '')),
  },
});
onMounted(async () => {
  try {
    const [announcementsData] = await Promise.all([
      getAllnotificationsApi({ pageNumber: 1, pageSize: 10 }),
    ]);
    announcements.value = announcementsData.data.items;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log({ err });
  } finally {
    checkImage();
  }
});
</script>
