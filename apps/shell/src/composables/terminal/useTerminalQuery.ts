import {
  ContractType,
  Maybe,
  Query,
  QueryTerminalDomainCheckArgs,
  ReconcileTypeEnum,
  TerminalFlagEnum,
  TerminalType,
} from '@/graphql/graphql';

export interface ActiveTerminalFilter {
  filterValue: ComputedRef<Maybe<TerminalType>[] | undefined>;
  terminalId: TerminalType['id'] | undefined;
}

export const useTerminalQuery = () => {
  const terminalStore = useTerminalStore();
  const { loading, onError, onResult, refetch, result } = useQuery<Query>(TerminalListMenuSchema);
  const filteredData = computed(() => {
    if (result.value && result.value.Terminals) {
      return result.value.Terminals as unknown as TerminalType[];
    }

    return [];
  });
  onError(error => {
    errorHandler(error);
  });

  const filteredTerminal = (id: string) => {
    if (filteredData.value) {
      return filteredData.value.filter(item => item?.id === id);
    } else {
      return [];
    }
  };
  const activeTerminal = computed<null | TerminalType>(() => {
    if (!terminalStore.currentTerminal || !result.value?.Terminals) {
      return null;
    }

    return (
      result.value.Terminals.find(
        terminal => terminal?.id === String(terminalStore.currentTerminal)
      ) || null
    );
  });
  const activeTerminalContract = computed<Maybe<ContractType>[]>(() => {
    if (!activeTerminal.value) {
      return [];
    }

    return activeTerminal.value?.contract || [];
  });
  const sortedTerminal = computed<[] | TerminalType[]>(() => {
    if (filteredData.value && filteredData.value.length) {
      const terminals = [...filteredData.value];

      return terminals?.sort((a, b) => {
        if (a.pin === b.pin) {
          return 0;
        }
        if (a.pin === null || a.pin === undefined) {
          return 1;
        }
        if (b.pin === null || b.pin === undefined) {
          return -1;
        }

        return a.pin < b.pin ? 1 : -1;
      });
    }

    return [];
  });
  // this is used to check if the terminal has active cname or not
  const hasActiveCname = computed(() => {
    if (!activeTerminal.value) {
      return false;
    }

    return !!activeTerminal.value?.cname;
  });
  // this is used to get the active cname of the terminal
  const activeCname = computed(() => {
    if (!activeTerminal.value) {
      return null;
    }

    return activeTerminal.value?.cname;
  });
  // when I have active caname then I want to change my cname, my current cname is pending to active but I have other active cname,
  //  so this is used to get the current active cname of the terminal
  const currentActiveCname = computed(() => {
    if (!activeTerminal.value) {
      return null;
    }

    return activeTerminal.value?.subdomains?.find(
      subdomain => subdomain?.status && !subdomain?.is_current
    );
  });
  // this is used to get the current cname of the terminal, that is no matter what the status is, if value of is_current is true then it will return the cname
  const currentCname = computed(() => {
    if (!activeTerminal.value) {
      return null;
    }

    return activeTerminal.value?.subdomains?.find(subdomain => subdomain?.is_current);
  });
  const isShaparakTerminal = computed(() => {
    if (!activeTerminal.value) {
      return false;
    }

    return (
      activeTerminal.value?.flag === TerminalFlagEnum.Normal &&
      (activeTerminal.value?.reconcile_type === ReconcileTypeEnum.Normal ||
        activeTerminal.value?.reconcile_type === ReconcileTypeEnum.DirectReconcile)
    );
  });
  const haveSuspiciousSessions = computed(() => activeTerminal.value?.suspicious?.session);
  const haveSuspiciousCallBack = computed(() => activeTerminal.value?.suspicious?.callback);
  const haveSuspiciousReferer = computed(() => activeTerminal.value?.suspicious?.referer);
  const isPersonalLinkTerminal = computed(() => {
    if (!activeTerminal.value) {
      return false;
    }

    return activeTerminal.value.flag === TerminalFlagEnum.PersonalLink;
  });

  return {
    activeCname,
    activeTerminal,
    activeTerminalContract,
    currentActiveCname,
    currentCname,
    data: filteredData,
    filteredTerminal,
    hasActiveCname,
    haveSuspiciousCallBack,
    haveSuspiciousReferer,
    haveSuspiciousSessions,
    isPersonalLinkTerminal,
    isShaparakTerminal,
    loading,
    onResult,
    refetch,
    sortedTerminal,
  };
};
export const useDomainCheckQuery = (
  { domain }: { domain: Ref<string> },
  validationErrorsCb: (input: string, rule: string, params: string[]) => void
) => {
  const { error, load, loading, onError, onResult, refetch, restart, result } = useLazyQuery<Query>(
    TerminalDomainCheckSchema,
    {
      domain: domain,
    } as unknown as QueryTerminalDomainCheckArgs,

    () => ({
      fetchPolicy: 'no-cache',
    })
  );
  onError(error => {
    errorHandler(error, value => {
      const err = value?.validation?.[0];
      if (err) {
        validationErrorsCb(err.input, err.rule, err.params);
      }
    });
  });
  const filteredData = computed(() => {
    if (result.value?.TerminalDomainCheck) {
      return result.value.TerminalDomainCheck;
    }
    if (typeof result.value?.TerminalDomainCheck === 'undefined') {
      return undefined;
    }

    return [];
  });

  return {
    data: filteredData,
    error,
    load,
    loading,
    onError,
    onResult,
    refetch,
    restart,
  };
};
