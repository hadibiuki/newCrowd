import { ref } from 'vue';

const parseWindowToMs = (windowStr: string): number => {
  const match = windowStr.match(/^(\d+)\s+(minute|minutes|hour|hours|day|days)$/i);

  if (!match) {
    return 3600000;
  }

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase().replace(/s$/, '');

  switch (unit) {
    case 'minute':
      return value * 60 * 1000;
    case 'hour':
      return value * 60 * 60 * 1000;
    case 'day':
      return value * 24 * 60 * 60 * 1000;
    default:
      return 3600000;
  }
};

export function useThrottleSessionStorage(key: string, max = 5, window = '1 hour') {
  const canProceed = ref(true);
  const windowMs = parseWindowToMs(window);

  function getAttempts(): number[] {
    const raw = sessionStorage.getItem(key);
    if (!raw) return [];
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr;

      return [];
    } catch {
      return [];
    }
  }

  function setAttempts(arr: number[]) {
    sessionStorage.setItem(key, JSON.stringify(arr));
  }

  function cleanupOldAttempts(arr: number[]): number[] {
    const now = Date.now();

    return arr.filter(ts => now - ts < windowMs);
  }

  function check() {
    const arr = cleanupOldAttempts(getAttempts());
    canProceed.value = arr.length < max;
    setAttempts(arr); // Clean up old
  }

  function registerAttempt() {
    const arr = cleanupOldAttempts(getAttempts());
    arr.push(Date.now());
    setAttempts(arr);
    check();
  }

  check();

  return {
    canProceed,
    registerAttempt,
  };
}
