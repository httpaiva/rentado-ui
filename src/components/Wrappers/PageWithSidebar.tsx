import { NavigationSidebar } from "..";

type PageWithSidebarProps = {
  children: React.ReactNode;
};

export const PageWithSidebar = ({ children }: PageWithSidebarProps) => {
  return (
    <main className="flex min-h-screen w-full">
      <NavigationSidebar />
      <section className="flex flex-col w-full">{children}</section>
    </main>
  );
};
