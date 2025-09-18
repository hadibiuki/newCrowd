import { useChatbot } from '~/composables/useChatbotVisibility';

declare global {
  interface Window {
    gapifySDK: {
      run: (config: { baseUrl: string; websiteToken: string }) => void;
    };
  }
}

export default defineNuxtPlugin(() => {
  if (process.client) {
    const { data: userData, loading: pending } = useUserIdQuery();
    const { initializeChatbot, showChatBot } = useChatbot();
    let sdkInitialized = false;

    watchEffect(() => {
      if (userData.value?.id && !pending.value && !sdkInitialized) {
        const shouldShow = showChatBot(userData.value?.id);
        if (shouldShow) {
          sdkInitialized = true;
          initializeChatbot();
        }
      }
    });
  }
});
