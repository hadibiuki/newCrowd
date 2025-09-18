import Label from 'ui/label/Label.vue';

export default {
  component: Label,
  tags: ['autodocs'],
  title: 'Components/Label',
};

const Template = () => ({
  components: { Label },
  template: `
	<div class="dark:bg-surface-dark rounded-md p-lg flex flex-col gap-md rtl">
		<Label size="medium" type="neutral" text="لیبل" />
		<h1 class="font-bold dark:text-surface"> سایزهای مختلف </h1>
		<div>
			<Label size="medium" type="positive" text="لیبل سایز بزرگ" />
		</div>
		<h1 class="font-bold dark:text-surface"> انواع مختلف </h1>
		<div class="flex gap-sm">
			<Label size="medium" type="positive" text="positive" />
			<Label size="medium" type="negative" text="negative" />
			<Label size="medium" type="neutral" text="neutral" />
			<Label size="medium" type="outlined" text="outlined" />
			<Label size="medium" type="informative" text="outlined" />
		</div>
	</div>
  `,
});

export const Default = Template.bind({});
