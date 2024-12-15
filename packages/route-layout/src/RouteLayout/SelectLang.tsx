import { CSSProperties, FC, memo } from 'react';
import { css, cx } from '@emotion/css';
import { Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const locales = [
  {
    key: 'zh-CN',
    label: '简体中文',
    icon: '🇨🇳',
  },
  {
    key: 'en-US',
    label: 'English',
    icon: '🇺🇸',
  },
];

interface SelectLangProps {
  className?: string;
  style?: CSSProperties;
}

const SelectLang: FC<SelectLangProps> = (props) => {
  const { className, style } = props;

  // const langMenu = (
  //   <Menu
  //     className={styles.menu}
  //     selectedKeys={[selectedLang]}
  //     onClick={({ key }) => setLocale(key, false)}
  //   >
  //     {locales.map((locale) => (
  //       <Menu.Item key={locale.key}>
  //         <span role="img" aria-label={locale.label} style={{ marginRight: '12px' }}>
  //           {locale.icon}
  //         </span>
  //         {locale.label}
  //       </Menu.Item>
  //     ))}
  //   </Menu>
  // );

  return (
    <Dropdown
      menu={{ items: locales }}
      placement="bottomRight"
      overlayClassName={css`
        li span {
          margin-left: 8px;
        }
      `}
    >
      <span className={cx(className)} style={style}>
        <GlobalOutlined title="语言" />
      </span>
    </Dropdown>
  );
};

export default memo(SelectLang);
