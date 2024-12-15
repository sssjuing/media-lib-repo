import { FunctionComponent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from '@storybook/test';
import { ConfigProvider } from 'antd';
import { AuthLayoutView, AuthLayoutViewProps } from './AuthLayoutView';

const meta: Meta<typeof AuthLayoutView> = {
  title: 'AuthLayout',
  component: AuthLayoutView,
  tags: ['autodocs'],
  // 手动设置argTypes https://storybook.js.org/docs/api/arg-types#manually-specifying-argtypes
  argTypes: {
    auth: { control: 'multi-select', options: ['admin', 'user', 'manager'] },
  },
  decorators: [
    (Story: FunctionComponent) => (
      <ConfigProvider
        theme={{
          cssVar: true,
          components: { Layout: { headerHeight: 48 } },
        }}
      >
        <Story />
      </ConfigProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const args: AuthLayoutViewProps = {
  auth: ['user'],
};
export const SiderMenuDark: Story = (args: AuthLayoutViewProps) => <AuthLayoutView {...args} />;
SiderMenuDark.args = args;
