import { FC, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { css, cx } from '@emotion/css';
import { TabBar } from 'antd-mobile';
import { throttle } from 'lodash-es';
import { MdFolder, MdMusicNote, MdPerson, MdVideoLibrary } from 'react-icons/md';

const tabs = [
  {
    key: '/music',
    title: '音乐',
    icon: <MdMusicNote />,
  },
  {
    key: '/actresses',
    title: '演员',
    icon: <MdPerson />,
  },
  {
    key: '/videos',
    title: '视频',
    icon: <MdVideoLibrary />,
  },
  {
    key: '/files',
    title: '文件',
    icon: <MdFolder />,
  },
];

const MainLayout: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hideTabBar, setHideTabBar] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.onscroll = throttle(() => {
        setHideTabBar(container.scrollTop > 10);
      }, 300);
    }
  }, []);

  return (
    <div
      className={css`
        height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: rgb(38 38 41);
      `}
    >
      <div
        ref={containerRef}
        className={css`
          flex: 1;
          overflow: auto;
        `}
      >
        <Outlet />
      </div>
      <div
        className={cx(
          css`
            position: fixed;
            bottom: 0;
            width: 100%;
            border-top: solid 1px var(--adm-color-border);
            background-color: rgb(26 26 26);
            transition: transform 0.5s ease-out;
            &.hide {
              transform: translateY(100%);
            }
          `,
          { hide: hideTabBar },
        )}
      >
        <TabBar activeKey={`/${pathname.match(/^\/(\w+)\/?/)?.[1]}`} onChange={navigate}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default MainLayout;
