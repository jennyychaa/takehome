import React, { PropsWithChildren } from 'react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="container mx-auto px-8 py-24">{children}</div>
  );
};

export default Layout;