import { computed, ref } from 'vue';

const sharedTimers = new Map<string, { intervalId: any; timer: Ref<number> }>();

export const useCountDown = (key: string, initial: number, afterFinish: () => void) => {
  if (!sharedTimers.has(key)) {
    sharedTimers.set(key, {
      intervalId: null,
      timer: ref(initial),
    });
  }

  const state = sharedTimers.get(key)!;
  const start = () => {
    stop();
    state.timer.value = initial;

    state.intervalId = setInterval(() => {
      if (state.timer.value > 0) {
        state.timer.value--;
      }
      if (state.timer.value === 0) {
        stop();
        afterFinish();
      }
    }, 1000);
  };
  const stop = () => {
    if (state.intervalId) {
      clearInterval(state.intervalId);
      state.intervalId = null;
    }
  };
  const reset = () => {
    stop();
    start();
  };
  const formattedTime = computed(() => {
    const m = Math.floor(state.timer.value / 60);
    const s = state.timer.value % 60;

    return `${m}:${s.toString().padStart(2, '0')}`;
  });

  if (state.timer.value > 0 && !state.intervalId) {
    state.intervalId = setInterval(() => {
      if (state.timer.value > 0) {
        state.timer.value--;
      }
      if (state.timer.value === 0) {
        stop();
        afterFinish();
      }
    }, 1000);
  }

  return {
    formattedTime,
    reset,
    start,
    stop,
    timer: state.timer,
  };
};
