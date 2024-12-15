import { FC, memo } from 'react';
import { css, cx } from '@emotion/css';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { isValidUrl } from '@repo/components/utils';
// import SelectLang from '../SelectLang';
import { useLayout } from '../useLayout';
import AvatarDropdown, { AvatarDropdownProps } from './AvatarDropdown';

export type RightContentProps = Omit<AvatarDropdownProps, 'className'>;

const RightContent: FC<RightContentProps> = (props) => {
  const { theme, topMenu, helpHref } = useLayout();

  return (
    <div
      className={cx(
        css`
          display: flex;
          .action {
            padding: 0 12px;
            cursor: pointer;
            transition: all 0.3s;
            color: rgba(0, 0, 0, 0.45);
            font-size: 16px;
            &:hover {
              background-color: rgba(0, 0, 0, 0.1);
            }
          }
          &.dark .action {
            color: rgba(255, 255, 255, 0.85);
            &:hover {
              background: var(--ant-color-primary);
            }
          }
        `,
        { dark: topMenu && theme === 'dark' },
      )}
    >
      {helpHref && isValidUrl(helpHref) && (
        <Tooltip title="帮助">
          <a target="_blank" rel="noopener noreferrer help" href={helpHref} className="action">
            <QuestionCircleOutlined />
          </a>
        </Tooltip>
      )}
      {/* <span
        // TODO: 这里有个Dropdown
        className="action"
      >
        <BellOutlined />
      </span> */}
      <AvatarDropdown {...props} className="action" />
      {/* <SelectLang className="action" /> */}
    </div>
  );
};

export default memo(RightContent);
