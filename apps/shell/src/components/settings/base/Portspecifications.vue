<template>
  <div class="mb-xl text-heading-600-h2 text-text" dir="rtl">مشخصات حساب</div>
  <div class="flex justify-end gap-md">
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
  </div>
  <div
    class="mt-xl divide-y divide-border-divider border border-border-divider rounded-sm"
    dir="rtl"
  >
    <div class="p-md flex justify-end flex-col md:flex-row">
      <div class="w-1/2 min-w-[50%] text-text-soft text-body-400-b3 font-medium">نام کسب و کار</div>
      <div class="lg:w-1/2 truncate">
        {{ userAuth?.fullName }}
      </div>
    </div>
    <div class="p-md flex flex-col md:flex-row justify-end">
      <div class="w-1/2 min-w-[50%] text-text-soft text-body-400-b3 font-medium">شناسه ملی</div>
      <div class="lg:w-1/2 truncate">
        {{ userAuth?.nationalCode }}
      </div>
    </div>
    <div class="p-md flex justify-end flex-col md:flex-row">
      <div class="w-1/2 text-text-soft text-body-400-b3 font-medium">شماره ثبت</div>
      <div class="w-1/2">
        {{ userAuth?.registrationCode }}
      </div>
    </div>
    <div class="p-md flex justify-end flex-col md:flex-row">
      <div class="w-1/2 min-w-[50%] text-text-soft text-body-400-b3 font-medium">تاریخ ثبت</div>
      <div class="lg:w-1/2 truncate">
        {{ userAuth?.createdDate }}
      </div>
    </div>
    <div class="p-md flex flex-col md:flex-row justify-end">
      <div class="w-1/2 min-w-[50%] text-text-soft text-body-400-b3 font-medium">ایمیل</div>
      <div class="lg:w-1/2 truncate">
        {{ userAuth?.email }}
      </div>
    </div>
    <div class="p-md flex justify-end flex-col md:flex-row">
      <div class="w-1/2 text-text-soft text-body-400-b3 font-medium">کد اقتصادی</div>
      <div class="w-1/2">
        {{ userAuth?.economicCode }}
      </div>
    </div>
    <div class="p-md flex justify-end flex-col md:flex-row">
      <div class="w-1/2 min-w-[50%] text-text-soft text-body-400-b3 font-medium">کد بورسی شرکت</div>
      <div class="lg:w-1/2 truncate">
        {{ userAuth?.bourseCode }}
      </div>
    </div>
    <div class="p-md flex flex-col md:flex-row justify-end">
      <div class="w-1/2 min-w-[50%] text-text-soft text-body-400-b3 font-medium">نام نمایشی</div>
      <div class="lg:w-1/2 truncate">
        {{ userAuth?.nickName }}
      </div>
    </div>
  </div>
  <template v-if="true">
    <ui-Divider class="my-xl" />
    <div class="mt-xl flex flex-col gap-sm" dir="rtl">
      <div class="text-text-soft text-body-400-b3 font-medium">
        راهنما جذب سرمایه و سرمایه گذاری
      </div>
      <div class="flex justify-between gap-md flex-col md:flex-row">
        <NuxtLink to="/FAQ?section=2" target="_blank" class="w-full">
          <div
            class="flex p-sm border border-border-divider rounded-md flex-col cursor-pointer w-full"
          >
            <div class="flex justify-between w-full">
              <ui-Icon name="Website" />
              <ui-Icon name="ArrowTopLeft" />
            </div>
            <div class="mt-md text-text text-body-400-b2 font-medium">
              راهنما درخواست جذب سرمایه
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/FAQ" target="_blank" class="w-full">
          <div
            class="flex p-sm w-full border border-border-divider rounded-md flex-col cursor-pointer"
          >
            <div class="flex justify-between w-full">
              <ui-Icon name="Website" />
              <ui-Icon name="ArrowTopLeft" />
            </div>
            <div class="mt-md text-text text-body-400-b2 font-medium">
              راهنما سرمایه‌گذاری روی طرح‌ها
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { uploadFileApi } from '~/restApi/file';
import { getUserProfileInformationApi } from '~/restApi/profile';
const authStore = useAuthStore();
const { userAuth } = storeToRefs(authStore);
const router = useRouter();
const { $notify } = useNuxtApp();
const t = useI18n();
const fileError = ref();
const fileUpload = ref<HTMLInputElement>();
const loading = ref(false);
const chooseFiles = () => {
  fileUpload.value?.click();
};
// eslint-disable-next-line require-await
const isValidLogo = async (file: File) => {
  fileError.value = '';
  // if (file.type !== 'image/png') {
  //   fileError.value = t('_validation.file_type', {
  //     type: 'png',
  //   });

  //   return false;
  // }
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    fileError.value = t('_validation.size', {
      _field_: t('_terminal.logo'),
      size: '10',
      unit: 'MB',
    });

    return false;
  }

  return true;
};
const getFile = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files as unknown as File[];
  if (!file.length) {
    return;
  }
  const isValid = await isValidLogo(file[0]);
  if (!isValid) {
    $notify({
      isRead: false,
      message: fileError.value,
      type: 'error',
    });

    return;
  }
  loading.value = true;
  await uploadFileHandler(file[0]);
  // eslint-disable-next-line promise/catch-or-return
  getUserProfileInformationApi()
    // eslint-disable-next-line promise/always-return
    .then(response => {
      authStore.setUserAuth(response.data);
      router.go(0);
    })
    .finally(() => {
      loading.value = false;
    });
};

// eslint-disable-next-line require-await
async function uploadFileHandler(file: File) {
  const formData = new FormData();
  // this.files.forEach((file, index) => {
  formData.append('file', file);
  formData.append('type', 'USER_AVATAR');

  uploadFileApi(formData);

  return true;
}
</script>

<style lang="scss" scoped>
:deep(.pin__color) {
  i {
    @apply text-zarin;
    @apply fill-zarin;
  }
}
:deep(.upload-logo) button i {
  @apply text-heading-600-h3 w-full flex items-center justify-center;
}
</style>
