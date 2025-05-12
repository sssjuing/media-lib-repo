import { FC, PropsWithChildren, ReactNode, memo } from 'react';
import { css, cx } from '@emotion/css';
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
      <div
        className={css`
          display: flex;
          width: 100%;
          align-items: center;
          .content {
            flex: 1;
          }
          .extra {
            min-width: 242px;
            margin-left: 88px;
            text-align: right;
          }
          .extra-without-content {
            flex: 1;
            margin: -32px 0 0;
          }
        `}
      >
        {content && <div className="content">{content}</div>}
        {extra && <div className={cx('extra', { 'extra-without-content': !content })}>{extra}</div>}
      </div>
    ) : null;

  return (
    <div>
      <div
        className={css`
          padding: 10px 0;
          background-color: #fff;
          h2 {
            margin: 0;
            margin-top: 4px;
          }
        `}
      >
        <GridContent inlineStyle>
          {breadcrumb && <div>{breadcrumb}</div>}
          {title && <h2>{title}</h2>}
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
