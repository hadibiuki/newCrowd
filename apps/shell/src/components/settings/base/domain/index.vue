<template>
  <SettingsBaseDomainStep1 v-if="isEdit" @edit="edit" />
  <SettingsBaseDomainStep2 v-if="!isEdit && currentCname !== null" @edit="edit" />
</template>

<script setup lang="ts">
const { currentCname } = useTerminalQuery();
const isEdit = ref(true);
const edit = (value: boolean) => {
  isEdit.value = value;
};
watchEffect(() => {
  if (currentCname.value) {
    isEdit.value = false;
  }
});
</script>
