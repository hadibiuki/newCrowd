<template>
  <div class="flex flex-col-reverse lg:flex-row justify-between gap-md">
    <div class="w-full h-full" dir="rtl">
      <ui-Card dir="rtl">
        <template #main>
          <UserBaseBankAccountMain v-if="route.query.menu === 'bankAccount'" />
          <UserBaseInfo v-else />
        </template>
      </ui-Card>
    </div>
    <div ref="menuRef" class="w-full lg:max-w-[294px]">
      <UserBaseSidebar @action="smoothScrollToContainer" />
    </div>
  </div>
</template>
<script setup lang="ts">
interface userHeaderElementType extends HTMLElement {
  calcUserHeaderHeight: () => number;
}
const route = useRoute();
const menuRef = ref();
const { md } = useSize();
const userBaseHeaderRef = inject<Ref<userHeaderElementType>>('userBaseHeaderRef');
const smoothScrollToContainer = () => {
  if (md.value && menuRef.value) {
    scrollToItem();
  }
};
const scrollToItem = () => {
  const headerHeight = userBaseHeaderRef?.value.calcUserHeaderHeight();
  const targetHeight = menuRef.value?.getBoundingClientRect()?.height;

  window.scrollTo({
    top: targetHeight + headerHeight,
    behavior: 'smooth',
  });
};
onMounted(() => {
  smoothScrollToContainer();
});
</script>
