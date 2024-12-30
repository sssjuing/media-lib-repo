import { FunctionComponent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfigProvider } from 'antd';
import { BaseMenuView } from './BaseMenuView';

const meta: Meta<typeof BaseMenuView> = {
  title: 'Components/BaseMenu',
  component: BaseMenuView,
  tags: ['autodocs'],
  // 手动设置argTypes https://storybook.js.org/docs/api/arg-types#manually-specifying-argtypes
  argTypes: {
    theme: { control: 'inline-radio', options: ['light', 'dark'] },
    accordion: { control: 'boolean' },
    mode: { control: 'inline-radio', options: ['horizontal', 'vertical', 'inline'] },
  },
  decorators: [
    (Story: FunctionComponent) => (
      <ConfigProvider>
        <Story />
      </ConfigProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

export const Accordion: Story = {
  args: {
    theme: 'dark',
    accordion: true,
  },
};

export const Horizontal: Story = {
  args: {
    theme: 'dark',
    accordion: true,
    mode: 'horizontal',
  },
};
