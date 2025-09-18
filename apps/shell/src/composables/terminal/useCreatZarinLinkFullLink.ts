import { useTerminalQuery } from '@/composables/terminal/useTerminalQuery';
import { TerminalFlagEnum } from '@/graphql/graphql';
import { computed } from 'vue';

export function useCreatZarinLinkFullLink() {
  const { activeCname, activeTerminal, isShaparakTerminal } = useTerminalQuery();
  const config = useRuntimeConfig();
  const constructBaseUrl = (): string => {
    const terminal = activeTerminal.value;
    const cname = activeCname.value;

    if (!terminal) return '';

    // Shaparak terminal with CNAME
    if (isShaparakTerminal.value && cname) {
      return `https://${cname}.${terminal.domain}/link`;
    }

    // Shaparak terminal without CNAME
    if (isShaparakTerminal.value && !cname) {
      return `${config.public.short_link}${terminal.domain}`;
    }

    // Personal link terminal
    if (terminal.flag === TerminalFlagEnum.PersonalLink) {
      return `https://${terminal.domain}`;
    }

    // Normal terminal
    return `${config.public.short_link}${terminal.domain}`;
  };
  const zarinLinkFullLink = computed(() => constructBaseUrl());
  const zarinLinkShareLinkModal = (id: number | string): string => {
    if (!id) return zarinLinkFullLink.value;

    const terminal = activeTerminal.value;
    const cname = activeCname.value;

    if (!terminal) return '';

    if (isShaparakTerminal.value && cname) {
      return `https://${cname}.${terminal.domain}/link/${id}`;
    }

    return `${config.public.short_link}${id}`;
  };
  const zarinLinkDetailShareLink = (id: number | string, zarinLink: string): string => {
    if (!id && !zarinLink) return '';

    const terminal = activeTerminal.value;
    const cname = activeCname.value;

    if (!terminal) return zarinLink || '';

    if (isShaparakTerminal.value && cname) {
      return `https://${cname}.${terminal.domain}/link/${id}`;
    }

    if (id) {
      return `${config.public.short_link}${id}`;
    }

    return zarinLink;
  };
  const zarinLinkDetailShareLinkText = (id: number | string, zarinLink: string): string => {
    if (!id && !zarinLink) return '';

    const terminal = activeTerminal.value;
    const cname = activeCname.value;

    if (!terminal) return (zarinLink || '').replace('https://', '');

    if (isShaparakTerminal.value && cname) {
      return `${cname}.${terminal.domain}/link/${id}`;
    }

    if (id) {
      return `${config.public.short_link.replace('https://', '')}${id}`;
    }

    return zarinLink.replace('https://', '');
  };

  return {
    zarinLinkDetailShareLink,
    zarinLinkDetailShareLinkText,
    zarinLinkFullLink,
    zarinLinkShareLinkModal,
  };
}
