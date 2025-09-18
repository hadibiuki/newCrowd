import type { ReconcileWageType } from '~/graphql/graphql';

export type ReconcileWageTypeCustom = ReconcileWageType & {
  is_default?: boolean;
  label?: string;
  link?: string;
};
