import Button from 'ui/button/Button.vue';
import PageHeading from 'ui/pageHeading/PageHeading.vue';

export default {
  component: PageHeading,
  title: 'Components/PageHeading',
};

const TemplateDefault = args => ({
  components: { Button, PageHeading },
  setup() {
    return { args };
  },
  template: `
    <div>
      <PageHeading v-bind="args">
        <template #content>عنوان تیکت عنوان عنوان عنوان عنوان تیکت عنوان عنوان عنوان عنوان تیکت عنوان عنوان عنوان عنوان تیکت عنوان عنوان عنوان عنوان عنوان </template>
        <template #action><Button text="ثبت تیکت" /></template>
        <template #backroll><Button icon="ArrowRight" type="tertiary" class="w-[40px] h-[40px]" /></template>
      </PageHeading>
    </div>
  `,
});

export const Default = TemplateDefault.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=505-45772&mode=dev',
  },
};

const TemplateWithoutBackroll = args => ({
  components: { Button, PageHeading },
  setup() {
    return { args };
  },
  template: `
    <div>
      <PageHeading v-bind="args">
        <template #content>عنوان تیکت</template>
        <template #action><Button text="ثبت تیکت" /></template>
      </PageHeading>
    </div>
  `,
});

export const WithoutBackroll = TemplateWithoutBackroll.bind({});

WithoutBackroll.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=505-45772&mode=dev',
  },
};

const TemplateWithoutAction = args => ({
  components: { Button, PageHeading },
  setup() {
    return { args };
  },
  template: `
    <div>
      <PageHeading v-bind="args">
      <template #backroll><Button icon="ArrowRight" type="tertiary" class="w-[40px] h-[40px]" /></template>
        <template #content> عنوان تیکت</template>
      </PageHeading>
    </div>
  `,
});

export const WithoutAction = TemplateWithoutAction.bind({});

WithoutAction.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=505-45772&mode=dev',
  },
};

const TemplateWithoutAll = args => ({
  components: { Button, PageHeading },
  setup() {
    return { args };
  },
  template: `
    <div>
      <PageHeading v-bind="args">
        <template #content> عنوان تیکت</template>
      </PageHeading>
    </div>
  `,
});

export const WithoutAll = TemplateWithoutAll.bind({});

WithoutAll.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/8bl9K5uQeCfypohPT9NHyX/Components?type=design&node-id=505-45772&mode=dev',
  },
};
