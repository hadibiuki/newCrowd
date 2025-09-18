import { onBeforeUnmount, onMounted, Ref } from 'vue';

interface UseIntersectionObserverOptions {
  callback: () => void;
  target: Ref<HTMLElement | null>;
  threshold?: number;
}

export function useIntersectionObserver({
  callback,
  target,
  threshold = 0.3,
}: UseIntersectionObserverOptions) {
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!target.value) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        threshold,
      }
    );

    observer.observe(target.value);
  });

  onBeforeUnmount(() => {
    if (observer && target.value) {
      observer.unobserve(target.value);
    }
  });
}
