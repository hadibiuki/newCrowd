import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFaqStore = defineStore('faqStore', () => {
  const slug = ref();

  return { slug };
});
