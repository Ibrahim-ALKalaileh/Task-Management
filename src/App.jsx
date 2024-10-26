
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from './features/store';
import HomePage from './pages/HomePage';
import { DarkModeProvider } from "./util/DarkModeContext.jsx";
import '../src/styles/global.css';
import setScalableUI from './util/setScalableUi.js';

const App = () => {

  useEffect(() => {
    setScalableUI();
    window.addEventListener('resize', setScalableUI);

    return () => {
      window.removeEventListener('resize', setScalableUI);
    };
  }, []);
  
  return (
    <Provider store={store}>
      <DarkModeProvider>
      <div className="app">
        <HomePage />
      </div>
      </DarkModeProvider>
    </Provider>
  );
};

export default App;
