import type { Meta, StoryObj } from '@storybook/react';
import { makeSuspenseWithPromise, sleep } from '../utils';

const Suspense = makeSuspenseWithPromise(sleep(1000));

const Component = ({ content }: { content: string }) => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <p>{content}</p>
      <p>刷新后观察 Suspense 效果</p>
      <p>用于使用组件树外部的 Promise 挂起组件渲染，如在获取到用户 Token 前避免渲染组件，以免内部请求报错</p>
    </Suspense>
  );
};

const meta: Meta<typeof Component> = {
  title: 'Components/Suspense',
  component: Component,
  tags: ['autodocs'],
  // 手动设置argTypes https://storybook.js.org/docs/api/arg-types#manually-specifying-argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ExceptionStory: Story = {
  args: { content: 'Content' },
};
