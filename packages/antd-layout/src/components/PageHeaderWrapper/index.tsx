import { FC, PropsWithChildren, ReactNode, memo } from 'react';
import { cx } from '@emotion/css';
import { GridContent } from './GridContent';

export interface PageHeaderWrapperProps extends PropsWithChildren {
  title?: ReactNode;
  breadcrumb?: ReactNode;
  content?: ReactNode;
  extra?: ReactNode;

  // Footer Props
  // tabList?: Array<{
  //   tab: string | ReactNode;
  //   key: string;
  //   disabled?: boolean;
  // }>;
  // activeTabKey?: string;
  // onTabChange?: (activeKey: string) => void;
  // tabBarExtraContent?: ReactNode;
}

const PageHeaderWrapper: FC<PageHeaderWrapperProps> = (props) => {
  const { title, breadcrumb, content, extra, children } = props;

  const headerContent =
    content || extra ? (
      <div className="flex w-full items-center">
        {content && <div className="grow basis-0">{content}</div>}
        {extra && (
          <div className={cx('min-w-32 ml-6 text-right', { 'grow basis-0 mt-[-32px]': !content })}>{extra}</div>
        )}
      </div>
    ) : null;

  return (
    <div>
      <div className="bg-white py-2.5">
        <GridContent inlineStyle>
          {breadcrumb && <div>{breadcrumb}</div>}
          {title && <h2 className="mt-1 text-2xl font-bold text-neutral-800">{title}</h2>}
          {headerContent}
        </GridContent>
      </div>
      <GridContent>{children}</GridContent>
    </div>
  );
};

const MemoPageHeaderWrapper = memo(PageHeaderWrapper);
export { MemoPageHeaderWrapper as PageHeaderWrapper, GridContent };
export type { GridContentProps } from './GridContent';
