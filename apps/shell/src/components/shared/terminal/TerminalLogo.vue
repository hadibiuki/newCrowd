<template>
  <div class="flex items-center">
    <ui-Avatar
      v-if="logoUrl"
      :src="`${logoUrl}?v=${version}`"
      shape="square"
      :size="avatarLogoSize"
    />
    <ui-Icon
      v-else
      name="Terminal"
      class="flex items-center justify-center"
      :class="[
        rounded,
        active
          ? 'text-surface bg-surface-blur'
          : 'text-black-40 bg-surface-soft border-border-soft border',
        defaultLogoSize,
      ]"
    />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  logo?: string | undefined | null;
  active?: boolean;
  size?: 'medium' | 'large';
  rounded?: string;
}
const store = useTerminalStore();
const version = computed(() => store.logoVersion);
const props = withDefaults(defineProps<Props>(), {
  logo: undefined,
  active: false,
  size: 'medium',
  rounded: 'rounded-md',
});
const { logo, size } = toRefs(props);
const logoUrl = computed(() => {
  if (!logo.value) {
    return undefined;
  }
  let dimensions = '40x40';
  if (size.value === 'large') {
    dimensions = '64x64';
  }

  return `${logo.value}/${dimensions}.png`;
});
const defaultLogoSize = computed(() => {
  switch (size.value) {
    case 'medium':
      return 'w-[40px] h-[40px]';
    case 'large':
      return 'w-[64px] h-[64px] !text-display-700-d3';
    default:
      return 'w-[40px] h-[40px]';
  }
});
const avatarLogoSize = computed(() => {
  switch (size.value) {
    case 'large':
      return 'lg';

    default:
      return 'md';
  }
});
</script>
