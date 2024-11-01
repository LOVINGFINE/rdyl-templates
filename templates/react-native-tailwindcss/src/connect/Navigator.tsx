import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
  CommonActions,
  StackActions,
  TabActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { stack, tabs, initialTab, initialStack } from '@/App.navigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabsNavigator: FC = () => (
  <Tab.Navigator initialRouteName={initialTab}>
    {tabs.map((ele) => {
      const { component, name, meta: { title = '', icon } = {} } = ele;
      return (
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: title,
            tabBarActiveTintColor: '#333',
          }}
          key={name}
          name={name}
          component={component}
        />
      );
    })}
  </Tab.Navigator>
);

const NavigatorConnect: FC<NavigationConnectProps> = ({ afterEach }) => {
  const navigatorRef = useNavigationContainerRef();
  const [routeName, setRouteName] = useState('');

  const option = useMemo(() => findOption(routeName), [routeName]);

  useEffect(() => {
    if (option && afterEach) {
      afterEach(option);
    }
  }, [afterEach, option]);

  useEffect(() => {
    const callback = ({ data }: any) => {
      if (data.action.payload) {
        const { name } = data.action?.payload;
        setRouteName(name);
      }
    };
    navigatorRef.addListener('__unsafe_action__', callback);
    return () => navigatorRef.removeListener('__unsafe_action__', callback);
  }, [navigatorRef.isReady]);

  return (
    <NavigationContainer ref={navigatorRef}>
      <Stack.Navigator initialRouteName={initialStack}>
        <Stack.Screen
          key="tabs"
          name="tabs"
          options={{
            headerShown: false,
          }}
          component={TabsNavigator}
        />
        {stack.map(({ component, name }) => (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            key={name}
            name={name}
            component={component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const useNavigator = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const option = useMemo(() => findOption(route.name), [route]);

  const push = useCallback(
    (name: string, params?: ParamsProp) => {
      navigation.dispatch(
        CommonActions.navigate({
          name,
          params,
        })
      );
    },
    [navigation]
  );

  const back = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.dispatch(CommonActions.goBack());
    }
  }, [navigation]);

  const redirect = useCallback(
    (name: string, params?: ParamsProp) => {
      const i = tabs.findIndex((ele) => ele.name === name);
      if (i > -1) {
        // tabs
        navigation.dispatch(TabActions.jumpTo(name, params));
      } else {
        navigation.dispatch(StackActions.replace(name, params));
      }
    },
    [navigation]
  );

  const setParams = useCallback(
    (params: ParamsProp) => {
      navigation.dispatch({
        ...CommonActions.setParams(params),
        source: route.key,
      });
    },
    [navigation, route]
  );

  return {
    ...route,
    option,
    push,
    back,
    redirect,
    setParams,
  };
};

export function findOption(n: string) {
  const tab = tabs.find((ele) => ele.name === n);
  if (tab) {
    return tab;
  } else {
    return stack.find((ele) => ele.name === n);
  }
}

export default NavigatorConnect;
