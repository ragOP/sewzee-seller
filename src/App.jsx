import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import './App.css'
import RouterComponent from './routers/RouterComponent'

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);


  return <RouterComponent />
}

export default App
