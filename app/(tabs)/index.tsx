import React, {  } from 'react';
import { Provider } from 'react-redux';
import store, {  } from '../../store';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import PokeApp from '@/components/PokeApp';

const App: React.FC = () => (
  <Provider store={store}>
    <PaperProvider theme={DefaultTheme}>
      <PokeApp />
    </PaperProvider>
  </Provider>
);

export default App;
