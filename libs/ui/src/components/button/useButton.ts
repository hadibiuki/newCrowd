import { ref } from 'vue';

export interface Props {
  border?: 'informative' | 'negative' | 'neutral' | 'positive' | 'warning';
  size?: 'large' | 'medium' | 'small';
  type?: 'decretive' | 'light' | 'primary' | 'secondary' | 'tertiary';
  variant?: 'contained' | 'outlined' | 'text';
}

const containedType = (value: Props['type']) => {
  switch (value) {
    case 'primary':
      return 'root__variant--contained--primary';
    case 'light':
      return 'root__variant--contained--light';
    case 'secondary':
      return 'root__variant--contained--secondary';
    case 'tertiary':
      return 'root__variant--contained--tertiary';
    case 'decretive':
      return 'root__variant--contained--decretive';

    default:
      break;
  }

  return null;
};
const variantHandler = (props: Pick<Props, 'type' | 'variant'>) => {
  const { type, variant } = props;
  switch (variant) {
    case 'contained':
      return containedType(type);
    case 'outlined':
      return 'root__variant--outlined';

    default:
      return 'root__variant--default';
  }
};
const sizeHandler = (props: Pick<Props, 'size' | 'variant'>) => {
  const { size, variant } = props;
  switch (size) {
    case 'small':
      if (variant === 'text') {
        return 'text-body-500-b3';
      }

      return 'px-xs py-2xs';
    case 'large':
      if (variant === 'text') {
        return 'text-body-500-b2';
      }

      return 'px-xl py-sm';

    default:
      if (variant === 'text') {
        return 'text-body-500-b3';
      }

      return 'px-sm py-xs';
  }
};
const loadingIndicatorHandler = (value: Props['type'], variant: Props['variant']) => {
  switch (value) {
    case 'primary':
      if (variant === 'outlined') {
        return 'root__loading--outlined';
      }

      return 'root__loading--primary';
    case 'light':
    case 'secondary':
    case 'tertiary':
      return 'root__loading--default';
    case 'decretive':
      return 'root__loading--primary';

    default:
      break;
  }

  return null;
};
const borderHandler = (props: Pick<Props, 'border' | 'type' | 'variant'>) => {
  const { border, variant } = props;

  if (variant === 'outlined') {
    switch (border) {
      case 'warning':
        return `root__border--warning`;
      case 'informative':
        return `root__border--informative`;
      case 'negative':
        return `root__border--negative`;
      case 'neutral':
        return `root__border--neutral`;
      case 'positive':
        return `root__border--positive`;
      default:
        return '';
    }
  }

  return '';
};

export const useButton = (props: Props) => {
  const variantValues = ref<null | string>(null);
  const borderValues = ref<null | string>(null);
  const sizeValue = ref<null | string>(null);
  const loadingIndicator = ref<null | string>(null);

  variantValues.value = variantHandler(props);
  borderValues.value = borderHandler(props);
  sizeValue.value = sizeHandler(props);
  loadingIndicator.value = loadingIndicatorHandler(props.type, props.variant);

  return { border: borderValues, loadingIndicator, size: sizeValue, variant: variantValues };
};
