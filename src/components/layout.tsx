import * as React from "react";

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
      </header>
      {children}
    </div>
  );
}

export default Layout;
