import logo from './logo.svg';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/index';
import Body from './components/Body/index';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
  return (
    <div className="App">
        <ToastContainer />
        <Header />
        <Body />
    </div>
  );
}

export default App;
