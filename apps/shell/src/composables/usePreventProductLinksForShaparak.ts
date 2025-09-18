import { useTerminalQuery } from './terminal/useTerminalQuery';

export const usePreventProductLinksForShaparak = () => {
  const { $growthbook } = useNuxtApp();
  const {
    hasActiveCname,
    haveSuspiciousCallBack,
    haveSuspiciousReferer,
    haveSuspiciousSessions,
    isShaparakTerminal,
  } = useTerminalQuery();
  const isFeatureFlagEnabledProductLinks = computed(() =>
    $growthbook.isOn('front_prevent_creating_and_editing_product_links_for_terminals_without_cname')
  );
  const isFeatureFlagEnabledAlertCallback = computed(() =>
    $growthbook.isOn('front_show_alert_cname_bacllback')
  );
  const isFeatureFlagEnabledAlertReferer = computed(() =>
    $growthbook.isOn('front_show_alert_cname_referer')
  );
  const shouldDisableProductLinks = computed(() => {
    if (!isShaparakTerminal.value || !haveSuspiciousSessions || hasActiveCname.value) return false;
    else return isFeatureFlagEnabledProductLinks.value;
  });
  const shouldShowRefererAlert = computed(() => {
    if (!isShaparakTerminal.value || !haveSuspiciousReferer || hasActiveCname.value) return false;
    else return isFeatureFlagEnabledAlertReferer.value;
  });
  const shouldShowCallbackAlert = computed(() => {
    if (!isShaparakTerminal.value || !haveSuspiciousCallBack || hasActiveCname.value) return false;
    else return isFeatureFlagEnabledAlertCallback.value;
  });

  return {
    shouldDisableProductLinks,
    shouldShowCallbackAlert,
    shouldShowRefererAlert,
  };
};
