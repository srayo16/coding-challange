import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Header></Header>
      <Home></Home>
    </>
  );
}

export default App;
