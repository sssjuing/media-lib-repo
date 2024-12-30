import type { Meta, StoryObj } from '@storybook/react';
import { Exception } from '../components/Exception';

const meta: Meta<typeof Exception> = {
  title: 'Components/Exception',
  component: Exception,
  tags: ['autodocs'],
  // 手动设置argTypes https://storybook.js.org/docs/api/arg-types#manually-specifying-argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ExceptionStory: Story = {
  args: { type: 403 },
};
