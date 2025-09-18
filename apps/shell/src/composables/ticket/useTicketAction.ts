export const useTicketAction = () => {
  const actionHandle = (callBack: () => void) => {
    const t = useI18n();

    return [
      {
        active: true,
        command: () => callBack(),
        icon: 'CircleDeleteCoss',
        id: 1,
        label: t('_common.buttons.close_ticket'),
      },
    ];
  };

  return {
    actionHandle,
  };
};
