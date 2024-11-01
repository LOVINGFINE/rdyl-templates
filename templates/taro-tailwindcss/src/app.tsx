import { Component, PropsWithChildren } from 'react';
import I18nConnect from '@/connect/I18n';
import AuthConnect from '@/connect/Auth';

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <I18nConnect>
        <AuthConnect>{this.props.children}</AuthConnect>
      </I18nConnect>
    );
  }
}

export default App;
