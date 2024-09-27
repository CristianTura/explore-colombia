import { Provider } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import store, { persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from 'routes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <AppRoutes/>
      </PersistGate>
    </Provider>
  );
}

export default App;
