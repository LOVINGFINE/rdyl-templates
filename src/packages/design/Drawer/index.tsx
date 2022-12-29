/*
 * Created by zhangq on 2021/11/26
 * Drawer 组件
 */
import React, { ReactElement, FC, ReactNode } from "react";
import "./style.less";
import Icon from "../Icon";
import ReactDOM from "react-dom";
import { getDrawerStyle } from "../utils/content";

const Drawer: FC<DrawerProps> = (props: DrawerProps): ReactElement => {
  const {
    placement = "left",
    children,
    visible = false,
    width = 375,
    zIndex = 1001,
    close = true,
    style = {},
    maskClose = true,
    mask = true,
    onClose = () => {},
  } = props;

  const bodyStyle = getDrawerStyle(placement, style, width);

  function onMaskClick() {
    if (maskClose && onClose) {
      onClose();
    }
  }

  /** @render */
  return ReactDOM.createPortal(
    visible && (
      <div className={"drawer"} style={{ zIndex }}>
        {mask && <div className={`drawer-mask`} onClick={onMaskClick} />}
        <div className={`drawer-body`} style={bodyStyle}>
          {close && (
            <div className={`drawer-close`} onClick={onClose}>
              <Icon name="close" />
            </div>
          )}
          {children}
        </div>
      </div>
    ),
    document.body
  );
};

export interface DrawerProps {
  children?: React.ReactElement | React.ReactElement[] | string;
  placement?: "left" | "top" | "right" | "bottom";
  style?: React.CSSProperties;
  visible?: boolean;
  zIndex?: number;
  width?: number;
  close?: boolean | ReactNode;
  onClose?(): void;
  maskClose?: boolean;
  mask?: boolean;
}

export default Drawer;
