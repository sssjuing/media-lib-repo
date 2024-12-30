import type { Meta, StoryObj } from '@storybook/react';
import { LayoutRouteView } from './LayoutRouteView';

const meta: Meta<typeof LayoutRouteView> = {
  title: 'LayoutRoute',
  component: LayoutRouteView,
  tags: ['autodocs'],
  // 手动设置argTypes https://storybook.js.org/docs/api/arg-types#manually-specifying-argtypes
  argTypes: {},
  parameters: {
    docs: {
      description: {
        story: '这个 story 演示了在不使用 AntdLayout 时如何利用 LayoutRoute 的能力',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RouteMenu: Story = {
  args: {},
};
