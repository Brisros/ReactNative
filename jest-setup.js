import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn().mockReturnValue({ width: 360, height: 640 }),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

jest.mock('react-native/Libraries/NativeModules/SettingsManager', () => ({
  SettingsManager: {
    settings: {
      AppleLocale: 'en_US',
      AppleLanguages: ['en'],
    },
  },
  Settings: {
    settings: {
      AppleLocale: 'en_US',
      AppleLanguages: ['en'],
    },
  },
}));

jest.mock('react-native-paper', () => {
  const realModule = jest.requireActual('react-native-paper');
  return {
    ...realModule,
    Portal: ({ children }) => children,
    Button: (props) => <button {...props} />,
    Card: ({ children, ...rest }) => <div {...rest}>{children}</div>,
  };
});
