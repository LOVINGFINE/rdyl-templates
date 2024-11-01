import { FC, PropsWithChildren } from "react";
import Sidebar from "./components/Sidebar";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  /** @render */
  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <main className="flex-1 min-w-0 p-[20px] bg-[var(--bg-s)]">
        <div className="min-h-full bg-[var(--bg)] rounded-md">{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
