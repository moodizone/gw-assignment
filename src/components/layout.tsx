import * as React from "react";

function Layout({ children }: React.PropsWithChildren) {
  return <main>{children}</main>;
}

export default Layout;
