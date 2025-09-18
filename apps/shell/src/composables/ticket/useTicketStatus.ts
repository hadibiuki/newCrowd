import { TicketCategoryEnum, TicketStatusEnum } from '~/consts/ticket';

/**
 * handle status generate
 */
export function useTicketStatus() {
  const t = useI18n();
  const statusHandler = (value: TicketStatusEnum) => {
    switch (value) {
      case TicketStatusEnum.ALL:
        return {
          text: t('_common.status.ALL'),
          type: 'neutral',
        };
      case TicketStatusEnum.CLOSED:
        return {
          text: t('_common.status.CLOSED'),
          type: 'neutral',
        };
      case TicketStatusEnum.NEW:
        return {
          text: t('_common.status.NEW'),
          type: 'positive',
        };
      case TicketStatusEnum.INPROGRESS:
        return {
          text: t('_common.status.IN_PROGRESS'),
          type: 'warning',
        };
      case TicketStatusEnum.SUPPORTRESPONSE:
        return {
          text: t('_common.status.RESPONSE'),
          type: 'warning',
        };
      case TicketStatusEnum.USERRESPONSE:
        return {
          text: t('_common.status.USERRESPONSE'),
          type: 'warning',
        };
      default:
        return {
          text: value,
          type: 'neutral',
        };
    }
  };
  const CategoryTypeList = ref([
    {
      id: TicketCategoryEnum.TECHNICAL,
      title: t('_helper.addTicket.technical'),
    },
    {
      id: TicketCategoryEnum.FUNDRAISING,
      title: t('_helper.addTicket.fundraising'),
    },
    {
      id: TicketCategoryEnum.FINANCIAL,
      title: t('_helper.addTicket.financial'),
    },
    {
      id: TicketCategoryEnum.INVESTMENT,
      title: t('_helper.addTicket.investment'),
    },
    {
      id: TicketCategoryEnum.OTHER,
      title: t('_helper.addTicket.other'),
    },
  ]);
  const CategoryTypeHandler = (value: TicketCategoryEnum) => {
    switch (value) {
      case TicketCategoryEnum.FUNDRAISING:
        return {
          id: TicketCategoryEnum.FUNDRAISING,
          title: t('_helper.addTicket.fundraising'),
        };
      case TicketCategoryEnum.FINANCIAL:
        return {
          id: TicketCategoryEnum.FINANCIAL,
          title: t('_helper.addTicket.financial'),
        };
      case TicketCategoryEnum.INVESTMENT:
        return {
          id: TicketCategoryEnum.INVESTMENT,
          title: t('_helper.addTicket.investment'),
        };
      case TicketCategoryEnum.OTHER:
        return {
          id: TicketCategoryEnum.OTHER,
          title: t('_helper.addTicket.other'),
        };
      case TicketCategoryEnum.TECHNICAL:
        return {
          id: TicketCategoryEnum.TECHNICAL,
          title: t('_helper.addTicket.technical'),
        };
      default:
        return {
          id: TicketCategoryEnum.TECHNICAL,
          title: t('_helper.addTicket.technical'),
        };
    }
  };

  return {
    CategoryTypeHandler,
    CategoryTypeList,
    statusHandler,
  };
}
