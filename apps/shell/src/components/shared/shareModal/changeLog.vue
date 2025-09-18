<template>
  <ui-Modal
    :text="$t('_common.modal.updates')"
    class="w-full lg:max-w-[520px]"
    close-icon
    @close="emits('close')"
  >
    <template #body>
      <div class="flex flex-col gap-md">
        <div class="h-[180px] flex items-center justify-center">
          <ui-Skeleton v-if="loading" radius="md" :width="480" :height="180" />
          <img
            v-show="!loading"
            src="../../../public/img/change-log.png"
            alt="گزارش تغییرات"
            @load="() => (loading = false)"
          />
        </div>
        <div class="flex gap-xs text-text-soft text-body-500-b3 items-center">
          <span>{{ $t('_common.modal.version') }} : {{ data?.version }}</span>
          <span class="p-2xs rounded-circle bg-[#747481]" />
          <span v-if="data.created_at">
            {{ $t('_common.modal.releaseDate') }} :
            {{
              toJalali(
                data.created_at,
                'jDD jMMMM jYYYY',
                'jDD jMMMM jYYYY',
                'jDD jMMMM jYYYY',
                'jDD jMMMM jYYYY'
              )
            }}
          </span>
        </div>
        <div class="flex flex-col gap-md">
          <div
            v-if="data?.content"
            class="content"
            v-html="
              checkCustomContent(
                String(
                  befMarked({
                    content: data.content as string,
                  })
                ).trim()
              )
            "
          ></div>
        </div>
      </div>
    </template>
    <template #footer>
      <ui-Button
        class="w-full"
        type="light"
        :text="$t('_common.buttons.ok')"
        @click="emits('close')"
      />
    </template>
  </ui-Modal>
</template>
<script lang="ts" setup>
import { ReleaseChangeLogType } from '../../../graphql/graphql';
const emits = defineEmits(['close']);
const props = defineProps<{ data: ReleaseChangeLogType }>();
const { befMarked, checkCustomContent } = useMarkdown();
const { toJalali } = useDate();
const { data } = toRefs(props);
const loading = ref(true);
</script>
<style lang="scss" scoped>
:deep(.content) {
  li {
    @apply text-body-400-b2 font-normal;
  }
}
</style>
