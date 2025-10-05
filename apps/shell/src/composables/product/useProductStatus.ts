import { ProductInternalStatusEnum } from '~/consts/product';

export function useProductStatus() {
  const t = useI18n();
  const getProductStatusInfo = (value: ProductInternalStatusEnum) => {
    switch (value) {
      case 5: //COMMING_SOON = 5, //'به زودی'
        return {
          text: t('product.coming_soon'),
        };
      case 4: //  WHITOUT_FARABOURCE = 4, // 'بدون فرابورس'
        return {
          text: t('product.whitout_farabource'),
          type: 'informative',
        };
      case 3: // DRAFT = 3, // 'پیش‌نویس'
        return {
          text: t('product.draft'),
          type: 'warning',
        };
      case 2: //  ACTIVE = 2, // 'فعال'
        return {
          text: t('product.active'),
          type: 'negative',
        };
      case 1: //  SUCCESS_IN_GETHERING = 1, // 'موفق در جمع آوری'
        return {
          text: t('product.success_in_gethering'),
          type: 'positive',
        };
      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };

  return {
    getProductStatusInfo,
  };
}
