import { FC, memo } from 'react';
import { css } from '@emotion/css';
import RightContent, { RightContentProps } from './GlobalHeader/RightContent';
import HeaderLogo from './HeaderLogo';
import LayoutMenu from './LayoutMenu';
import { useLayout } from './useLayout';

export type TopNavHeaderProps = RightContentProps;

const TopNavHeader: FC<TopNavHeaderProps> = (props) => {
  const { logo, title } = useLayout();

  return (
    <div
      className={css`
        display: flex;
        padding: 0 calc(var(--ant-layout-header-height) * 3 / 8);
        div:nth-of-type(1) {
          flex-shrink: 0;
        }
        div:nth-of-type(2) {
          flex: 1;
        }
      `}
    >
      <div>{(logo || title) && <HeaderLogo />}</div>
      <LayoutMenu mode="horizontal" />
      <RightContent {...props} />
    </div>
  );
};

export default memo(TopNavHeader);
