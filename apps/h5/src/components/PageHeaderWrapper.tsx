import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { NavBar } from 'antd-mobile';
import { NavBarProps } from 'antd-mobile/es/components/nav-bar';
import { throttle } from 'lodash-es';
import { cn } from '@/utils/utils';

interface PageHeaderWrapperProps extends NavBarProps {
  title?: string;
  children?: ReactNode;
}

const PageHeaderWrapper: FC<PageHeaderWrapperProps> = ({ title, children, ...restProps }) => {
  const [hide, setHide] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY - lastScrollY.current > 60) {
        setHide(true);
        lastScrollY.current = window.scrollY;
      } else if (window.scrollY - lastScrollY.current < -60) {
        setHide(false);
        lastScrollY.current = window.scrollY;
      }
      console.log(window.scrollY);
    }, 300);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={cn(
          'border-b-1 border-b-neutral-700 fixed left-0 right-0 top-0 bg-neutral-900 z-10',
          'transition-transform duration-200 ease-linear',
          { '-translate-y-full': hide },
          'backdrop-blur-xl bg-[#0f0f0f]/70',
        )}
      >
        <NavBar {...restProps}>{title}</NavBar>
      </div>
      <div className="p-4 pt-15">{children}</div>
    </div>
  );
};

export default PageHeaderWrapper;
