<template>
  <div dir="rtl" class="flex flex-col input">
    <div
      v-if="editor"
      class="border border-border-divider rounded-t-sm p-xs flex gap-sm items-center"
    >
      <Button
        type="tertiary"
        icon="TextStyleBold"
        :class="{ '!text-[#fff] !bg-primary': editor?.isActive('bold') }"
        @click="handleSetFormat('bold')"
      />
      <Button
        icon="TextStyletalic"
        type="tertiary"
        :class="{ '!text-[#fff] !bg-primary': editor?.isActive('italic') }"
        @click="handleSetFormat('italic')"
      />
      <Divider type="vertical" />
      <Button
        type="tertiary"
        :class="{ '!text-[#fff] !bg-primary': editor?.isActive('codeBlock') }"
        icon="CodeBlock"
        @click="handleSetFormat('codeBlock')"
      />
      <Button
        type="tertiary"
        :class="{ '!text-[#fff] !bg-primary': editor?.isActive('bulletList') }"
        icon="BulletList"
        @click="handleSetFormat('bulletList')"
      />
    </div>
    <div v-if="editor">
      <editor-content
        :editor="editor"
        class="min-h-[192px] text-editor rounded-b-sm border border-border-divider border-t-0 p-xs"
        :class="styleValue"
      />
      <!-- helper -->
      <div>
        <div v-if="helper" class="input__description__helper" dir="rtl">
          <div v-if="helper.type === 'error'" class="input__description__helper--error">
            <Icon name="InfoFill" />
            {{ helper.message }}
          </div>
          <div v-if="helper.type === 'success'" class="input__description__helper--success">
            <Icon name="CheckMarkCircleFill" />
            {{ helper.message }}
          </div>
          <div v-if="helper.type === 'info'" class="input__description__helper--info">
            {{ helper.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import { toRefs, onBeforeUnmount, onMounted, computed } from 'vue';
import { useField } from 'vee-validate';
import StarterKit from '@tiptap/starter-kit';
import Divider from '../divider/Divider.vue';
import Button from '../button/Button.vue';

export interface Props {
  name: string;
  modelValue?: string;
  helper?: {
    type: 'error' | 'success' | 'info' | undefined;
    message: string | undefined;
  };
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  helper: undefined,
});
const { modelValue } = toRefs(props);
const { handleChange, errors } = useField(() => props.name, undefined, {
  syncVModel: true,
});
const styleValue = computed(() => {
  if (!!errors.value.length) {
    return 'input__inner--error';
  }

  return 'input__inner--default';
});
const emit = defineEmits(['update:modelValue']);
const editor = useEditor({
  content: modelValue.value,
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    const plainText = editor.getText();
    handleChange(plainText);
    emit('update:modelValue', editor.getHTML());
  },
});
const handleSetFormat = (type: 'bold' | 'italic' | 'codeBlock' | 'bulletList') => {
  if (!editor.value) {
    return;
  }

  const isActive = editor.value.isActive(type);
  const chain = editor.value.chain().focus();

  if (isActive) {
    chain.clearNodes().unsetAllMarks().run();
  } else {
    chain.clearNodes().unsetAllMarks();

    if (type === 'bold') {
      chain.toggleBold();
    } else if (type === 'italic') {
      chain.toggleItalic();
    } else if (type === 'codeBlock') {
      chain.toggleCodeBlock();
    } else if (type === 'bulletList') {
      chain.toggleBulletList();
    }

    chain.run();
  }
};

onMounted(() => {
  if (modelValue.value) {
    handleChange(modelValue.value);
  }
});
onBeforeUnmount(() => {
  editor.value.destroy();
});
</script>

<style scoped lang="scss">
@use './texteditor.scss';
</style>
