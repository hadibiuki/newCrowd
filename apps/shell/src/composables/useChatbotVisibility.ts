export const useChatbot = () => {
  const BASE_URL = 'https://app.gapify.ai';
  const WEBSITE_TOKEN = 'wbB5nbHzXQiBe6gKxAUE1EtK';
  const showChatBot = (zp: string): boolean => {
    if (!zp) return false;
    else return true;
  };
  const checkBannerVisibility = (): boolean => {
    const LOCAL_STORAGE_KEY = 'hideDownloadAppBanner';
    const savedValue = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedValue) {
      const expirationTime = parseInt(savedValue, 10);

      return Date.now() < expirationTime;
    }

    return false;
  };
  const updateChatbotPosition = (isBannerHidden: boolean) => {
    const existingStyle = document.getElementById('chatbot-position-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    const gapifyStyle = document.createElement('style');
    gapifyStyle.id = 'chatbot-position-style';
    gapifyStyle.textContent = `
        .woot-widget-bubble {
          bottom: ${isBannerHidden ? '20px' : '80px'} !important;
          right: 18px !important;
          transition: bottom 0.3s ease !important;
        }
      `;
    document.head.appendChild(gapifyStyle);
  };
  const initializeChatbot = () => {
    const isBannerHidden = checkBannerVisibility();

    updateChatbotPosition(isBannerHidden);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'hideDownloadAppBanner') {
        const isBannerHidden = checkBannerVisibility();
        updateChatbotPosition(isBannerHidden);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key: string, value: string) {
      const result = originalSetItem.apply(this, [key, value]);
      if (key === 'hideDownloadAppBanner') {
        setTimeout(() => {
          const isBannerHidden = checkBannerVisibility();
          updateChatbotPosition(isBannerHidden);
        }, 100);
      }

      return result;
    };

    const script = document.createElement('script');
    script.src = BASE_URL + '/packs/js/sdk.js';
    script.defer = true;
    script.async = true;

    script.onload = function () {
      if (window.gapifySDK) {
        window.gapifySDK.run({
          baseUrl: BASE_URL as string,
          websiteToken: (WEBSITE_TOKEN as string) || '',
        });
      }
    };

    document.head.appendChild(script);
  };

  return {
    checkBannerVisibility,
    initializeChatbot,
    showChatBot,
    updateChatbotPosition,
  };
};
