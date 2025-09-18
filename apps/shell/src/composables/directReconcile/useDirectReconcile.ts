import {
  PaymentTerminalStatusEnum,
  ReconcileTypeEnum,
  TerminalCandidateDirectReconcileStatusEnum,
  TerminalStatusEnum,
  TerminalType,
  ZarinGateTypeEnum,
} from '~/graphql/graphql';

export const useDirectReconcile = () => {
  const { activeTerminal } = useTerminalQuery();
  const isCandidateDirectReconcile = computed(
    () =>
      activeTerminal.value?.candidate_direct_reconcile_access ||
      (activeTerminal.value?.reconcile_type === ReconcileTypeEnum.Normal &&
        activeTerminal.value?.status === TerminalStatusEnum.Active)
  );
  const isActiveDirectReconcile = computed(
    () => activeTerminal.value?.reconcile_type === ReconcileTypeEnum.DirectReconcile
  );
  const hadActiveDirectReconcile = computed(
    () =>
      activeTerminal.value?.zarin_gate?.some(
        item =>
          item?.type === ZarinGateTypeEnum.ShaparakDirect &&
          item.status === PaymentTerminalStatusEnum.DeActive
      )
  );
  const inlineMessageHandler = (value: TerminalCandidateDirectReconcileStatusEnum) => {
    const t = useI18n();
    const accepted = {
      description: '',
      icon: 'CheckMarkCircleFill',
      title: t('_direct_reconcile.inline_message.Accepted.description'),
      type: 'positive',
    };
    if (isActiveDirectReconcile.value) {
      return accepted;
    }

    switch (value) {
      case TerminalCandidateDirectReconcileStatusEnum.Accepted:
        return accepted;
      case TerminalCandidateDirectReconcileStatusEnum.Pending:
        return {
          description: t('_direct_reconcile.inline_message.Pending.description'),
          icon: 'Warning',
          title: t('_direct_reconcile.inline_message.Pending.title'),
          type: 'warning',
        };

      default:
        return {
          description: '',
          icon: 'Warning',
          title: value,
          type: 'neutral',
        };
    }
  };
  const checkIsDirectReconcile = (type: ReconcileTypeEnum) =>
    type === ReconcileTypeEnum.DirectReconcile;
  const checkHasDirectReconcile = (terminal: TerminalType) =>
    terminal.zarin_gate?.some(item => item?.type === ZarinGateTypeEnum.ShaparakDirect) ?? false;

  return {
    checkHasDirectReconcile,
    checkIsDirectReconcile,
    hadActiveDirectReconcile,
    inlineMessageHandler,
    isActiveDirectReconcile,
    isCandidateDirectReconcile,
  };
};
