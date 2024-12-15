import { FC, memo } from 'react';
import { css } from '@emotion/css';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useLayout } from '../useLayout';
import RightContent, { RightContentProps } from './RightContent';

export type GlobalHeaderProps = RightContentProps;

const GlobalHeader: FC<GlobalHeaderProps> = (props) => {
  const { collapsed, onCollapse } = useLayout();

  return (
    <div
      className={css`
        display: flex;
        padding-right: 12px;
      `}
    >
      <span
        onClick={() => onCollapse?.(!collapsed)}
        className={css`
          display: inline-block;
          height: var(--ant-layout-header-height);
          margin-right: auto;
          padding: 0 calc(var(--ant-layout-header-height) * 3 / 8);
          color: #8c8c8c;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            background-color: #f0f0f0;
          }
        `}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
      <RightContent {...props} />
    </div>
  );
};

export default memo(GlobalHeader);
