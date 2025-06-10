import { FC, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { TabBar } from 'antd-mobile';
import { MdFolder, MdMusicNote, MdPerson, MdVideoLibrary } from 'react-icons/md';
import { cn } from '@/utils/utils';

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

  return (
    <div className="bg-neutral-800">
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 border-t-1 border-t-neutral-700 z-10 ',
          'backdrop-blur-xl bg-[#0f0f0f]/70',
        )}
      >
        <TabBar activeKey={`/${pathname.match(/^\/(\w+)\/?/)?.[1]}`} onChange={navigate}>
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
      <div ref={containerRef} className="min-h-lvh pb-[50px]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
