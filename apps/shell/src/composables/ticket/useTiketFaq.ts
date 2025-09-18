// composables/useFaqs.ts
import { ref } from 'vue';

type Faq = {
  __typename: string;
  answer: string;
  faq_department_id: null | string;
  id: string;
  question: string;
  slug: string;
};

type FaqCategory = {
  __typename: string;
  created_at: null | string;
  faqs: Faq[];
  id: string;
  title: string;
  updated_at: null | string;
};

const faqsData: FaqCategory[] = [
  {
    __typename: 'FaqCategoryType',
    created_at: null,
    faqs: [],
    id: '8',
    title: 'اینماد',
    updated_at: null,
  },
  {
    __typename: 'FaqCategoryType',
    created_at: null,
    faqs: [
      {
        __typename: 'FaqType',
        answer: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...',
        faq_department_id: null,
        id: '22',
        question: 'لورم ایپسوم فارسی',
        slug: 'terminal',
      },
      {
        __typename: 'FaqType',
        answer: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ...',
        faq_department_id: null,
        id: '43',
        question: 'لورم ایپسوم فارسی',
        slug: 'terminal',
      },
    ],
    id: '2',
    title: 'درگاه پرداخت',
    updated_at: null,
  },
];

export function useTicketFaqs() {
  const categories = ref<FaqCategory[]>(faqsData);
  // می‌تونی متدهای کمکی هم اضافه کنی
  const getAll = () => categories.value;
  const getByCategory = (id: string) => categories.value.find(cat => cat.id === id);
  const getByFaqId = (faqId: string) =>
    categories.value.flatMap(cat => cat.faqs).find(faq => faq.id === faqId);

  return {
    categories,
    getAll,
    getByCategory,
    getByFaqId,
  };
}
