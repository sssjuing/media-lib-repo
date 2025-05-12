import { FC, PropsWithChildren, memo } from 'react';

const verticalPadding = 'calc(var(--ant-layout-header-height) * 3 / 8)';

export interface GridContentProps extends PropsWithChildren {
  inlineStyle?: boolean;
}

const GridContent: FC<GridContentProps> = (props) => {
  const { inlineStyle, children } = props;
  return <div style={{ padding: `${inlineStyle ? '0' : '16px'} ${verticalPadding}` }}>{children}</div>;
};

const MemoGridContent = memo(GridContent);
export { MemoGridContent as GridContent };
