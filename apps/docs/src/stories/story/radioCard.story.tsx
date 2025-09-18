import RadioCard from 'ui/radioCard/RadioCard.vue';

export default {
  argTypes: {},
  component: RadioCard,
  tags: ['autodocs'],
  title: 'components/RadioCard',
};

const Template = () => ({
  components: { RadioCard },
  template: `
    <div class="flex"> 
     <RadioCard v-model="item" :tabindex="1" val="1"  label="لیبل 1" description="توضیحات" name="status"/>
     <RadioCard v-model="item" :tabindex="2" val="2" class="mx-sm" label="لیبل 2" description="توضیحات" name="status"/>
     <RadioCard v-model="item" :tabindex="3" val="3" label="لیبل 3" description="توضیحات" name="status"/>
    </div>
  `,
});

export const Default = Template.bind({});
export const Disabled = {
  args: {
    description: 'توضیحات',
    disabled: true,
    label: 'رادیو کارت',
  },
};

export const ChekedWithDisabled = {
  args: {
    description: 'توضیحات',
    disabled: true,
    label: 'رادیو باتن',
    modelValue: 'test',
    val: 'test',
  },
};
