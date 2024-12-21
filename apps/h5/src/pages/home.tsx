import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const HomePage: React.FC = () => {
  return (
    <PageHeaderWrapper title="首页" backIcon={false}>
      <div>Home Page</div>
    </PageHeaderWrapper>
  );
};

export default HomePage;
