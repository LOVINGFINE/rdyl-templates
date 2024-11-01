import { FC, MouseEvent, useMemo, Fragment } from "react";
import { AssetsSvgUrl } from "@/assets";

const SvgIcon: FC<
  PropsChildrenWithStyles<{ name: string; onClick?(e?: MouseEvent): void }>
> = ({ name = "", className = "", style = {}, onClick }) => {
  // @ts-ignore
  const Svg = useMemo(() => AssetsSvgUrl[name], [name]);

  if (Svg) {
    return (
      <Svg
        className={"w-[1em] h-[1em] " + className}
        style={style}
        aria-hidden="true"
        onClick={onClick}
      />
    );
  }
  return <Fragment />;
};

export default SvgIcon;
