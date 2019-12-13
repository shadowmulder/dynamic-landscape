import React from 'react';
import './App.css';

//redux store
import { Provider } from 'react-redux';
import { configureStore } from './store/configStore';

//Theme
import Theme from './theme';
import { ThemeProvider } from '@material-ui/styles';

//Views
import { Map } from './map/map.page.component';
import { Navigation } from './shared/components/navigation/navigation.container.component';
import StypeWrapper from './shared/components/styleWrapper';


const App: React.FC = () => {
  const store = configureStore();

  return (
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <StypeWrapper>
          <Navigation />
          <Map />
        </StypeWrapper>
      </Provider>
     </ThemeProvider>
  );
};

export default App;
