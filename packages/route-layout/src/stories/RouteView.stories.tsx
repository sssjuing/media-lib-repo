import type { Meta, StoryObj } from '@storybook/react';
import { RouteView } from './RouteView';

const meta: Meta<typeof RouteView> = {
  title: 'Route',
  component: RouteView,
  tags: ['autodocs'],
  // 手动设置argTypes https://storybook.js.org/docs/api/arg-types#manually-specifying-argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RouteMenu: Story = {
  args: {},
};
