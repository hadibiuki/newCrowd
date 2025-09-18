<template>
  <div>
    <div v-if="validFaqs && !loading">
      <ui-NavLink
        v-for="i in validFaqs"
        :key="i.id"
        :label="i.title"
        :loading="loading"
        :active="i.id === slugStore.slug"
        @click="selectedSlug(i.id as string)"
      >
        <template #meta>
          <span class="text-text-soft">({{ i.faqs && i.faqs.length }})</span>
        </template>
      </ui-NavLink>
    </div>
    <div v-else>
      <ui-NavLink v-for="i in 4" :key="i" label="loading" :loading="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFaqQuery } from '@/composables/faq/useFaqQuery';
const { loading, onResult } = useFaqQuery();
const slugStore = useFaqStore();
// const validFaqs = computed(
//   () =>
// (data.value?.Faqs || []).filter(
//   faq => faq && faq.faqs && faq.faqs?.length > 0
// ) as FaqCategoryType[]
const validFaqs = ref([
  {
    __typename: 'FaqCategoryType',
    id: '2',
    title: 'درگاه پرداخت',
    faqs: [
      {
        __typename: 'FaqType',
        id: '22',
        slug: 'terminal',
        question: 'مدارک مورد نیاز برای ثبت درگاه چیست؟',
        answer:
          'پس از آنکه به سطح کاربری نقره ای ارتقا یافتید و احراز هویت خود را تکمیل کردید، میتوانید برای ثبت درگاه اقدام نمایید.\nبرای دریافت درگاه پرداخت نیاز است: \n- اینماد فعال مرتبط با حوزه فعالیت سایت\n- کد مالیاتی فعال در گام چهارم به نام صاحب حساب کاربری باشد، بوسیله این [**لینک**](https://tax.gov.ir/action/do/registrationselector) میتوانید سطح مالیاتی خود را مشاهده کنید و چنانچه در گام پایین تر بودید ارتقا دهید\n- حساب بانکی متصل به درگاه به نام صاحب حساب کاربری برای اشخاص حقیقی و به نام شرکت برای اشخاص حقوقی (حساب بانکی انتخاب شده حتما باید در سامانه مالیاتی معرفی شده ثبت شده باشد تا مراحل دریافت درگاه و تسویه حساب شما با مشکلی روبرو نشود)',
        faq_department_id: null,
      },
      {
        __typename: 'FaqType',
        id: '43',
        slug: 'terminal',
        question: 'علت رد درگاه من چیست؟',
        answer:
          'دلیل رد درگاه ثبت شده در تیکتی که بصورت اتوماتیک تحت عنوان **درخواست درگاه پرداخت** ساخته میشود برای شما ارسال شده است. پس از اصلاح و یا تکمیل موارد میتوانید در همان تیکت بررسی مجدد درگاه خود را پیگیری نمایید:\nرد درگاه به دلایل مختلفی ممکن میباشد در زیر تنها به موارد پر تکرار اشاره می شود:\n- سطح کاربری شما در سطح آبی میباشد و لازم است در سطح کاربری نقره ای ثبت درگاه انجام دهید\n- عدم داشتن اینماد یا اینماد دامنه شما منقضی یا تعلیق شده و یا به نام صاحب حساب نیست\n- عدم ثبت نام در سامانه مالیات یا کد مالیاتی ثبت شده به نام صاحب حساب نیست و یا در گامی پایین تر از سطح 4 میباشد',
        faq_department_id: null,
      },
      {
        __typename: 'FaqType',
        id: '44',
        slug: 'terminal',
        question: 'درخواست ویرایش اطلاعات درگاه دارم',
        answer:
          'اطلاعات درگاه را میتوانید از بخش تنظیمات درگاه خود تغییر دهید توجه داشته باشید دامنه به هیچ عنوان قابل ویرایش نیست، اگر دامنه جدیدی دارید و یا دامنه قبلی تغییر یافته برای دامنه جدید باید مجددا درخواست ثبت درگاه انجام دهید.',
        faq_department_id: null,
      },
    ],
    created_at: null,
    updated_at: null,
  },
  {
    __typename: 'FaqCategoryType',
    id: '9',
    title: 'راهنمای حقوقی',
    faqs: [
      {
        __typename: 'FaqType',
        id: '35',
        slug: 'legal_help',
        question: 'تعریف زرین پال - منظور از درگاه امن (امنیت پرداخت )چیست؟',
        answer:
          'درگاه امن پرداخت یاری زرین پال به این معنی است که ابزار پرداخت (درگاه پرداخت) جهت تسهیل معاملات در بستر تجارت الکترونیکی به کسب و کارها یا افراد ارائه داده می شود و اطلاعات کاربران به صورت ایمن پردازش و محفوظ می ماند.',
        faq_department_id: null,
      },
      {
        __typename: 'FaqType',
        id: '41',
        slug: 'legal_help',
        question: 'هدف از ایجاد اتاق گفت‌وگو و ثبت تیکت چیست؟',
        answer:
          'ایجاد بستری مناسب جهت ارتباط مستقیم فروشنده (پذیرنده ) و خریدار می باشد پیش از مراجعه به مراجع ذی صلاح جهت پیگیری و رفع مشکلات خریدار اقدامات مناسب صورت پذیرد.',
        faq_department_id: null,
      },
      {
        __typename: 'FaqType',
        id: '40',
        slug: 'legal_help',
        question:
          'فرآیند اعطای درگاه پرداخت به پذیرندگان از سوی شرکت پرداخت‌یاری چگونه انجام می‌شود؟',
        answer:
          'طبق الزامات، ضوابط و فرآینـد اجرایی فعالیت پرداختیاران و پذیرنـدگان پشتیبانی شده در نظام پرداخت کشور و آیین نامه و قانون مبارزه با پولشویی، درگاه پرداخت الکترونیک به پذیرنـدگان اختصاص می یابـد و پذیرندگان نیز با پذیرش قوانین عضویت در زرین پال ملزم به ارائه کالا و خـدمات مطابق قوانین شـرکت، قانون تجارت الکترونیک و قوانین جمهوري اسـلامی ایران میباشند.',
        faq_department_id: null,
      },
    ],
    created_at: null,
    updated_at: null,
  },
]);
// );
const selectedSlug = (value: string) => {
  slugStore.slug = value;
};
onResult(() => {
  if (validFaqs.value && !!validFaqs.value.length) {
    slugStore.slug = validFaqs.value[0]?.id;
  }
});
</script>
