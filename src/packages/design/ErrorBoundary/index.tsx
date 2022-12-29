import { Component, Fragment } from "react";

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  /**
   * @constructor state
   */
  private constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: false,
    };
  }
  /**
   * @public hooks
   */
  public componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  public render() {
    const { error } = this.state;
    const { message = "当前内容渲染错误" } = this.props;
    const { children } = this.props;
    return <Fragment>{error ? message : children}</Fragment>;
  }
}

/**
 * @interface props
 */
export interface ErrorBoundaryProps {
  children?: React.ReactNode;
  message?: React.ReactNode;
}

/**
 * @interface state
 */
export interface ErrorBoundaryState {
  error: boolean;
}
