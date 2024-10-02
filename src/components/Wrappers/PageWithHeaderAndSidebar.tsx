import { PageWithSidebar, PrivateHeader } from "..";

type PageWithHeaderAndSidebarProps = {
  children: React.ReactNode;
};

export const PageWithHeaderAndSidebar = ({
  children,
}: PageWithHeaderAndSidebarProps) => {
  return (
    <PageWithSidebar>
      <PrivateHeader />
      {children}
    </PageWithSidebar>
  );
};
