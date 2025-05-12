import { FunctionComponent } from 'react';
// import { fn } from '@storybook/test';
import { ConfigProvider } from 'antd';
import type { Meta, StoryObj } from '@storybook/react';
import { AntdLayoutView, AntdLayoutViewProps } from './AntdLayoutView';
import { routeData } from './data';
import logo from './assets/logo.svg';

const meta: Meta<typeof AntdLayoutView> = {
  title: 'Layouts/AntdLayout',
  component: AntdLayoutView,
  // parameters: {
  //   theme: 'light',
  //   topMenu: false,
  //   logo,
  //   title: 'Platform',
  //   menuItems,
  // },
  // args: {
  //   onMenuClick: fn(),
  // },
  tags: ['autodocs'],
  // 手动设置argTypes https://storybook.js.org/docs/api/arg-types#manually-specifying-argtypes
  argTypes: {
    theme: { control: 'inline-radio', options: ['light', 'dark'] },
    siderWidth: { control: { type: 'range', min: 150, max: 400, step: 10 } },
  },
  decorators: [
    (Story: FunctionComponent) => (
      <ConfigProvider
        theme={{
          cssVar: true,
          components: {
            Layout: { headerHeight: 48 },
          },
        }}
      >
        <Story />
      </ConfigProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const args: AntdLayoutViewProps = {
  theme: 'light',
  routeData,
  title: 'Platform',
  logo,
  topMenu: true,
};
export const TopMenuLight: Story = (args: AntdLayoutViewProps) => <AntdLayoutView {...args} />;
TopMenuLight.args = args;

export const TopMenuDark: Story = {
  args: {
    theme: 'dark',
    routeData,
    title: 'Platform',
    logo,
    topMenu: true,
  },
};

export const SiderMenuLight: Story = {
  args: {
    theme: 'light',
    routeData,
    title: 'Platform',
    logo,
    topMenu: false,
    siderWidth: 200,
  },
};

export const SiderMenuDark: Story = {
  args: {
    theme: 'dark',
    routeData,
    title: 'Platform',
    logo,
    topMenu: false,
    siderWidth: 200,
  },
};
