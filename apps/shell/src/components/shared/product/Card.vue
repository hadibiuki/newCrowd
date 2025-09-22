<template>
  <!-- @click="handleClickOnCart" -->
  <div class="flex flex-col rounded-2xl border border-border-soft cursor-pointer">
    <div class="h-[156px] mb-md relative">
      <NuxtImg
        :src="project.coverImageUrl ? project.coverImageUrl : '/projectImage.png'"
        width="100%"
        height="100%"
        fit="containt"
        :placeholder="[40, 40]"
        loading="lazy"
        class="rounded-md h-full object-cover w-full"
      />
      <div
        class="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-t from-black to-transparent to-30%"
      ></div>
    </div>
    <div class="px-md">
      <div class="flex flex-row items-center mb-md">
        <span class="font-normal text-caption-400-c1 text-text-soft ml-auto">
          {{ $t('product.providing_invest_for') }}
        </span>
        <span v-if="project.faraBourseCrowdFundingTypeId == 2">
          <ui-Label :text="$t('product.floating')" type="neutral" class="mr-xs" />
        </span>
        <div
          v-if="hasStatus"
          class="rounded-sm bg-success font-bold text-[10px] text-white flex items-center px-2xs mr-1 h-6"
        >
          <ui-Label :text="getProjectStatus" type="positive" class="mr-xs" />
        </div>
      </div>
      <div class="font-bold text-body-400-d3 mb-md">{{ project.persianName }}</div>
      <Ui-Divider class="mb-md" />

      <div class="flex mb-md">
        <div
          class="rounded-sm bg-primary display-700-d1 text-[10px] text-white-100 ml-auto w-fit flex items-center max-h-[22px] px-xs"
        >
          <div class=" ">سود پیشبینی شده</div>
          <div class="persian-discount mx-2xs">%{{ project.profitPercent }}</div>
          <div class=" ">{{ project.projectDuration }} ماهه</div>
        </div>
        <div
          class="rounded-sm bg-primary font-bold text-[10px] text-white-100 px-xs flex items-center w-fit max-h-[22px]"
        >
          پرداخت هر {{ project.profitPaymentInterval }} ماه
        </div>
      </div>
    </div>

    <div class="flex justify-between mb-md px-md gap-xs">
      <ui-Tooltip :content="$t('_form.add_refund.balance')" class="flex">
        <div class="flex items-center bg-surface-soft p-xs rounded-sm relative group">
          <ui-Icon name="Building" class="float-left !text-[20px]" />
          <span class="font-semibold text-[10px] mr-2xs text-text">{{
            project.projectCompanyName
          }}</span>
        </div>
      </ui-Tooltip>
      <ui-Tooltip :content="$t('_form.add_refund.balance')" class="flex">
        <div class="flex items-center bg-surface-soft p-xs rounded-sm relative group">
          <span
            v-if="project.id === 3 || project.id === 6 || project.id === 7"
            class="font-semibold text-[10px] text-text"
          >
            سبدگردانی آیکو
          </span>
          <span v-else class="font-semibold flex w-max text-[10px] text-text text-nowrap">کارگزاری دانایان</span>
        </div>
      </ui-Tooltip>

      <div
        class="flex items-center bg-surface-soft p-xs rounded-sm elative group"
        @click.stop="handleLinkClicked"
      >
        <ui-Icon name="Link" class="float-left !text-[20px]" />

        <span class="font-semibold text-[10px] mr-2xs z-10">{{ project.projectPersianSymbol }}</span>
        <div
          class="flex bg-surface-soft font-semibold text-[10px] p-1 rounded-sm top-2 right-0 absolute hidden group-hover:flex"
        >
          نماد طرح
        </div>
      </div>
    </div>
    <div class="text-xs text-caption-400-c1 text-center mb-md">
      {{ project.guarantor }}
    </div>

    <div class="flex justify-between mb-md px-md">
      <div class="">
        <div class="text--text-soft text-caption-400-c1">
          تامین شده ({{ project.successPercent }}%)
        </div>
        <div class="text-heading-600-h3">
          {{ numberFormat(project.investedAlready) }}
          <span class="text-caption-400-c1">ریال</span>
        </div>
      </div>
      <div class="text-end">
        <div class="text-text-soft text-caption-400-c1 font-normal">مبلغ مورد نیاز</div>
        <div class="text-heading-600-h3">
          {{ numberFormat(project.totalPrice) }}
          <span class="text-caption-400-c1">ریال</span>
        </div>
      </div>
    </div>

    <div class="flex items-center my-md mx-md">
      <div class="flex-grow flex">
        <div
          class="bg-border-divider rounded-full h-[6px] relative"
          :style="{
            width: (project.faraBourseCrowdFundingTypeId != 2 ? '100' : floatingPercent) + '%',
          }"
        >
          <div
            class="bg-primary h-[6px] rounded-full z-10 relative"
            :style="{
              width:
                (project.faraBourseCrowdFundingTypeId != 2
                  ? project.successPercent
                  : project.successPercent > floatingPercent
                    ? '100'
                    : (project.successPercent / floatingPercent) * 100) + '%',
            }"
          ></div>
          <div
            class="absolute w-full h-[1px] border-t border-t-[1px] border-white-100 border-dashed top-1/2 -translate-y-1/2 z-5 w-[96%] right-1"
          ></div>
        </div>
        <div
          class="text-sm ml-2xs mr-[3px] border-r border-primary relative group"
          v-if="project.faraBourseCrowdFundingTypeId == 2"
        >
          <svg
            width="16"
            class="absolute -top-[20px] -right-[8px] text-primary-default rotate-180"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.57 22.38C13.34 22.38 13.11 22.34 12.89 22.26C12.14 21.98 11.66 21.28 11.66 20.48V14.03H9.31997C8.55997 14.03 7.89996 13.6 7.58996 12.91C7.27996 12.22 7.39996 11.44 7.89996 10.87L15.47 2.27C16 1.67 16.82 1.46 17.57 1.75C18.32 2.03 18.7999 2.73 18.7999 3.53V9.98H21.14C21.9 9.98 22.56 10.41 22.87 11.1C23.18 11.79 23.06 12.57 22.56 13.14L14.99 21.74C14.62 22.16 14.1 22.38 13.57 22.38ZM16.88 3.12C16.79 3.12 16.68 3.15 16.59 3.26L9.01995 11.87C8.85995 12.05 8.91997 12.23 8.94997 12.3C8.97997 12.37 9.07997 12.54 9.31997 12.54H12.41C12.82 12.54 13.16 12.88 13.16 13.29V20.49C13.16 20.74 13.34 20.84 13.42 20.87C13.5 20.9 13.6999 20.95 13.8599 20.76L21.43 12.15C21.59 11.97 21.53 11.79 21.5 11.72C21.47 11.65 21.37 11.48 21.13 11.48H18.04C17.63 11.48 17.29 11.14 17.29 10.73V3.53C17.29 3.28 17.11 3.18 17.03 3.15C17 3.13 16.94 3.12 16.88 3.12Z"
              fill="#0A33FF"
            />
            <path
              d="M8.5 4.75H1.5C1.09 4.75 0.75 4.41 0.75 4C0.75 3.59 1.09 3.25 1.5 3.25H8.5C8.91 3.25 9.25 3.59 9.25 4C9.25 4.41 8.91 4.75 8.5 4.75Z"
              fill="#0A33FF"
            />
            <path
              d="M7.5 20.75H1.5C1.09 20.75 0.75 20.41 0.75 20C0.75 19.59 1.09 19.25 1.5 19.25H7.5C7.91 19.25 8.25 19.59 8.25 20C8.25 20.41 7.91 20.75 7.5 20.75Z"
              fill="#0A33FF"
            />
            <path
              d="M4.5 12.75H1.5C1.09 12.75 0.75 12.41 0.75 12C0.75 11.59 1.09 11.25 1.5 11.25H4.5C4.91 11.25 5.25 11.59 5.25 12C5.25 12.41 4.91 12.75 4.5 12.75Z"
              fill="#0A33FF"
            />
          </svg>
          <div
            class="flex bg-surface-soft flex-col font-semibold text-[10px] w-max justify-center items-center p-xs rounded -top-[0px] translate-x-1/2 absolute hidden group-hover:flex"
          >
            <span> مبلغ شناوری {{ numberFormat(project.minimumRequiredPrice) }} ریال</span>
            <span> درصد پیشرفت : {{ Math.min(project.successFloatingPercent, 100) }}% </span>
          </div>
        </div>

        <div
          class="bg-border-divider rounded-full h-[6px] flex-grow relative"
          v-if="project.faraBourseCrowdFundingTypeId == 2"
        >
          <div class="bg-primary h-[6px] rounded-full z-10 relative" :style="getWhitCalculate"></div>
          <div
            class="absolute w-full h-[1px] border-t border-t-[1px] border-white-100 border-dashed top-1/2 -translate-y-1/2 z-5 w-[94%] right-1"
          ></div>
        </div>
      </div>
    </div>
    <div class="mt-auto px-md pb-md">
      <ui-Button
        class="w-full"
        type="primary"
        :text="$t('product.see_and_invest')"
        @click="goToInvest"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { numberFormat } = useMath();
const { getProductStatusInfo } = useProductStatus();
export interface IProjectCart {
  id: number;
  persianName: string;
  guaranteeType: number; // enum ?
  profitPercent: Float32Array;
  investedAlready: number; // enum ?
  faraBourseCrowdFundingTypeId: number;
  totalPrice: number;
  coverImageUrl: string;
  internalStatus: number; // enum ?
  minimumRequiredPrice: number;
  successPercent: string; // float ?
  projectStartDate: string; // "2025-05-30T00:00:00"
  projectEndDate: string; // 2026-05-30T00:00:00"
  FaraBourseCrowdFundingType: number; // enum
  projectCompanyName: string;
  projectPersianSymbol: string;
  projectDuration: number;
  profitPaymentInterval: number;
  guarantor: string;
}

const props = defineProps<{
  project: IProjectCart;
}>();
const { project } = toRefs(props);

// eslint-disable-next-line vue/no-setup-props-destructure
console.log({ props: project.value });
const floatingPercent = computed(
  () => (project.value.minimumRequiredPrice / project.value.totalPrice) * 100
);
//     const showModal = ref(false)
const handleLinkClicked = () => {
  window.open(
    `https://cf.ifb.ir/Report/ProjectTrustSealDetail?ProjectID=${project.value.externalPublicProjectId}`
  );
};

//     const isSrcVideo = computed(()=>{
//     if(!props.project.coverImageUrl) return false
//     // const mime = props.project.coverImageUrl.split('.').at(-1)
//     // const mime = URL.parse(props.project.coverImageUrl).pathname.split('.').at(-1)
//         const urlString = props.project.coverImageUrl;
//         let url;
//         try {
//             url = new URL(urlString);
//         } catch (e) {
//             url = null; // or handle the error as needed
//         }
//         if (!url) {
//         return 
//         } 
//         const mime = url.pathname.split('.').at(-1)
//         if(mime === 'mp4' ) return true  // || mime === "webm" || mime === "webp" 
//     return false
//     })


//     const copyToClipboard = () => {
//     navigator.clipboard.writeText(props.project.projectPersianSymbol);
//     try {
//         toast.success("نماد طرح به کلیپ بورد کپی شد", {
//         position: "top-right",
//         autoClose: 3000,
//         })
//     } catch (err) {
//     }
//     }

//     const handleClickOnCart = ()=>{
//     window.open('/projects/'+ props.project.id, '_blank', 'noopener,noreferrer');
//     }

//     const errorMessage = ref('');

//     // Function to handle video error
//     const handleVideoError = (event) => {
//     const error = event.target.error;
//     switch (error.code) {
//         case error.MEDIA_ERR_ABORTED:
//         errorMessage.value = 'Video playback was aborted.';
//         break;
//         case error.MEDIA_ERR_NETWORK:
//         errorMessage.value = 'A network error occurred.';
//         break;
//         case error.MEDIA_ERR_DECODE:
//         errorMessage.value = 'Video decoding failed.';
//         break;
//         case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
//         errorMessage.value = 'Video format or source not supported.';
//         break;
//         default:
//         errorMessage.value = 'An unknown error occurred.';
//     }
//     console.error('Video error:', error.message, error.code);
//     };

// eslint-disable-next-line padding-line-between-statements
const getProjectStatus = computed(() => {
  const status = getProductStatusInfo(project.value.internalStatus);
  if (status) {
    return status.text;
  }
});
const hasStatus = computed(() => {
  if (!project.value.internalStatus) {
    return false;
  }

  return true;
});
const getWhitCalculate = computed(() => {
  const percent = (project.value.minimumRequiredPrice / project.value.totalPrice) * 100;
  if (project.value.successPercent < percent) {
    return { width: '0%' };
  }
  const barPercent = 100 - percent;
  const calcPercent = (project.value.successPercent - percent) / (barPercent ) * 100
  if (calcPercent > 100) {
    return { width: '100%' };
  }

  return { width: calcPercent + '%' };
});
const goToInvest = () => {
  // eslint-disable-next-line no-console
  console.log('here');
};
</script>

<style scoped>
.persian-discount {
  font-weight: 900;
  font-size: 32px;
  line-height: 24px;
  text-shadow:
    2px 0 #0a33ff,
    -2px 0 #0a33ff,
    0 2px #0a33ff,
    0 -2px #0a33ff,
    2px 2px #0a33ff,
    -2px 2px #0a33ff,
    2px -2px #0a33ff,
    -2px -2px #0a33ff;
}
</style>
