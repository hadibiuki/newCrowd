<template>
  <ui-Stepper :steps="steps" class="py-[40px] mx-auto" />
</template>
<script lang="ts" setup>
import { TerminalFlagEnum } from '@/graphql/graphql';
enum StepEnum {
  Service = 'service',
  Domain = 'domain',
  Name = 'name',
  MCC = 'mcc',
  Contract = 'contract',
  Final = 'final',
}
export interface Props {
  flag: TerminalFlagEnum;
}
const props = withDefaults(defineProps<Props>(), {});
const { flag } = toRefs(props);
const t = useI18n();
const route = useRoute();
const stepStatus = computed(() => {
  const steps = {
    service: 'current',
    info: 'inactive',
    submit: 'inactive',
    ...(flag.value === TerminalFlagEnum.Normal ? { contract: 'inactive' } : {}),
  };

  switch (route.query.step) {
    case StepEnum.Service:
      steps.service = 'current';
      steps.info = 'inactive';
      steps.submit = 'inactive';
      if (flag.value === TerminalFlagEnum.Normal) {
        steps.contract = 'inactive';
      }
      break;
    case StepEnum.Domain:
    case StepEnum.Name:
    case StepEnum.MCC:
      steps.service = 'done';
      steps.info = 'current';
      steps.submit = 'inactive';
      if (flag.value === TerminalFlagEnum.Normal) {
        steps.contract = 'inactive';
      }
      break;
    case StepEnum.Contract:
      if (flag.value === TerminalFlagEnum.Normal) {
        steps.service = 'done';
        steps.info = 'done';
        steps.contract = 'current';
        steps.submit = 'inactive';
      }
      break;
    case StepEnum.Final:
      steps.service = 'done';
      steps.info = 'done';
      if (flag.value === TerminalFlagEnum.Normal) {
        steps.contract = 'done';
      }
      steps.submit = 'current';
      break;
    default:
      steps.service = 'current';
      steps.info = 'inactive';
      steps.submit = 'inactive';
      break;
  }

  return steps;
});
const steps = computed(() => [
  {
    status: stepStatus.value.service,
    text: t('_terminal.add.header.service'),
  },
  {
    status: stepStatus.value.info,
    text: t('_terminal.add.header.info'),
  },
  ...(flag.value === TerminalFlagEnum.Normal
    ? [
        {
          status: stepStatus.value.contract,
          text: t('_terminal.add.header.contract'),
        },
      ]
    : []),
  {
    status: stepStatus.value.submit,
    text: t('_terminal.add.header.submit'),
  },
]);
</script>
