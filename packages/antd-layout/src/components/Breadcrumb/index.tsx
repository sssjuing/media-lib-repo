import { FC, memo } from 'react';
import { Breadcrumb as AntdBreadcrumb, BreadcrumbProps as AntdBreadcrumbProps } from 'antd';
import { useRoute } from '../../LayoutRouteProvider';
import getBreadcrumbItems from './getBreadcrumbItems';

export interface BreadcrumbProps {
  onClick?: (key: string) => void;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ onClick }) => {
  const { pathRouteMap, pathname } = useRoute();

  const items = getBreadcrumbItems(pathRouteMap, pathname);

  const itemRender: AntdBreadcrumbProps['itemRender'] = ({ path, title, className }, _, routes) => {
    return path === routes[routes.length - 1]?.path || className !== 'clickable' ? (
      <span>{title}</span>
    ) : (
      <a
        href={path as string}
        onClick={(e) => {
          e.preventDefault();
          onClick?.(path as string);
        }}
      >
        {title}
      </a>
    );
  };

  return <AntdBreadcrumb items={items} itemRender={itemRender} />;
};

const MemorizedBreadcrumb = memo(Breadcrumb);
export { MemorizedBreadcrumb as Breadcrumb };
