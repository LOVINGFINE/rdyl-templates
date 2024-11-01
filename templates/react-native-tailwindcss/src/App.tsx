import { FC } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import I18nConnect from '@/connect/I18n';
import NavigatorConnect from '@/connect/Navigator';
import AuthConnect from '@/connect/Auth';

const App: FC = () => {
  function afterEach(option: NavigatorOption) {
    console.log(option);
  }
  return (
    <SafeAreaProvider>
      <I18nConnect>
        <AuthConnect>
          <NavigatorConnect afterEach={afterEach} />
        </AuthConnect>
      </I18nConnect>
    </SafeAreaProvider>
  );
};

export default App;
