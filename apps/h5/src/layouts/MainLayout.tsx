import { FC, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { TabBar } from 'antd-mobile';
// import { throttle } from 'lodash-es';
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
  // const [hideTabBar, setHideTabBar] = useState(false);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (container) {
  //     container.onscroll = throttle(() => {
  //       setHideTabBar(container.scrollTop > 10);
  //     }, 300);
  //   }
  // }, []);

  return (
    <div className="h-lvh flex flex-col bg-neutral-800">
      <div ref={containerRef} className="grow-1 overflow-auto">
        <Outlet />
      </div>
      <div
        className="border-t-1 border-t-neutral-700 bg-neutral-950"
        // className={cx(
        //   css`
        //     transition: transform 0.5s ease-out;
        //     &.hide {
        //       transform: translateY(100%);
        //     }
        //   `,
        //   { hide: hideTabBar },
        // )}
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
