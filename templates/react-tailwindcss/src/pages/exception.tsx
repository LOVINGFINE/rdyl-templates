import { FC, useMemo } from "react";
import { useQuery, useRouter } from "@/connect";
// import { SvgIcon } from "@/components";
const { notFound, serviceError, unauthorized, inaccessible } = ExceptionStatus;

const ExceptionPage: FC = () => {
  const router = useRouter();
  const [query] = useQuery();

  const status = useMemo(
    () => (query.get("status") || notFound) as ExceptionStatus,
    [query.get("status")]
  );
  const result = useMemo(() => {
    return ResultMaps[status];
  }, [status]);

  function onBack() {
    router.redirect("/");
  }
  /** @render */
  return (
    <div className="flex flex-col items-center h-full px-6 pt-48 sm:pt-64 lg:px-8">
      {/* <SvgIcon name={result.icon} className="text-[48px]" /> */}
      <p className="text-[18px] sm:text-[24px] mb-6 sm:10 font-semibold text-[var(--primary)]">
        {query.get("type")}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-[var(--title)] sm:text-5xl mb-8 sm:12">
        {result.title}
      </h1>
      <p className="text-[14px] sm:text-[18px] leading-7 text-[var(--text)] mb-8 sm:12">
        {result.content}
      </p>
      <div className="flex items-center justify-center gap-x-6">
        <span
          onClick={onBack}
          className="rounded-md bg-[var(--primary)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {$t("go back home")}
        </span>
      </div>
    </div>
  );
};

const ResultMaps: Record<ExceptionStatus, ResultItem> = {
  [serviceError]: {
    icon: "500",
    title: "",
    content: "",
  },
  [notFound]: {
    icon: "404",
    title: $t("page not found"),
    content: $t("not find the page looking for"),
  },
  [unauthorized]: {
    icon: "401",
    title: $t("page not found"),
    content: $t("not find the page looking for"),
  },
  [inaccessible]: {
    icon: "403",
    title: $t("page not found"),
    content: $t("not find the page looking for"),
  },
};

export default ExceptionPage;
