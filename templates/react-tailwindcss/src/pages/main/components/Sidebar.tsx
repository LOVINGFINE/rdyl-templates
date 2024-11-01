import { website_name } from "@/App.config";
import { SvgIcon } from "@/components";
import { useRouter } from "@/connect";
import classNames from "classnames";
import { FC, useCallback } from "react";

const Sidebar: FC = () => {
  const router = useRouter();

  const selected = useCallback(
    (e: string) => {
      return router.current?.name === e;
    },
    [router.current]
  );

  function onBack() {
    router.redirect("homepage");
  }

  function onChange(item: SideMenuType) {
    router.push(item.routeName);
  }
  /** @render */
  return (
    <div className="w-[289px] pb-[12px] bg-[var(--bg)] flex flex-col gap-[16px] border-r-[1px] border-r-[var(--border)]">
      <div
        className="w-full h-[64px] flex items-center gap-[12px] px-[16px]"
        onClick={onBack}
      >
        <img src="/favicon.svg" className="w-[32px] cursor-pointer"  />
        <h2 className="uppercase text-[var(--text)]">{website_name}</h2>
      </div>
      <div className="w-full flex-1 min-h-0 px-[12px] overflow-y-auto">
        {menu.map(item => {
          return (
            <div
              className={classNames(
                "w-full rounded-md hover:bg-[var(--bg-hover)] hover:text-[var(--primary)] cursor-pointer h-[38px] px-[12px] flex items-center gap-[8px]",
                {
                  "bg-[var(--bg-hover)] text-[var(--primary)]": selected(
                    item.routeName
                  ),
                }
              )}
              key={item.routeName}
              onClick={() => onChange(item)}
            >
              <SvgIcon name={item.icon} className="text-[20px]" />
              <span className="font-bold text-[14px]">{item.title}</span>
            </div>
          );
        })}
      </div>
      <div className="h-[54px] w-full pl-[28px] pr-[16px] flex items-center gap-[12px]">
        <div className="flex-1 flex gap-[8px] items-center">
          <img
            alt="avatar"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="inline-block w-[28px] aspect-square rounded-full ring-[2px] ring-[var(--border)]"
          />
          <span>{"daskdkaskj"}</span>
        </div>
        <div className="flex items-center justify-center w-[30px] cursor-pointer aspect-square rounded-full hover:bg-[var(--bg-hover)] hover:text-[var(--primary)]">
          <SvgIcon name="setting" />
        </div>
      </div>
    </div>
  );
};

const menu: SideMenuType[] = [
  {
    routeName: "dashboard",
    title: $t("dashboard"),
    icon: "home",
  },
];

export default Sidebar;
