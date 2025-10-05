export const useOperatorAction = () => {
  const actionHandle = (
    id: string,
    isMainOwner: boolean,
    callback: ((id: string) => void) | undefined
  ) => {
    const t = useI18n();
    const { $notify } = useNuxtApp();

    return [
      {
        active: !isMainOwner,
        command: () => callback && callback(id),
        icon: 'CircleDelete',
        id: 4,
        label: t('_common.buttons.inactive'),
        style: 'color:rgb(201 54 55)',
      },
    ];
  };

  return {
    actionHandle,
  };
};
