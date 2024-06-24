import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer} from 'react-toastify'; //Toastify used for Message fancy box
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import summaryApi from './common';

function App() {

  const fetchUSerDetails = async() =>{
      const dataResponse = await fetch(summaryApi.current_user.url,{
        method: summaryApi.current_user.method,
        credentials: 'include' , // for cookies etc
        headers: {
          'content-type': 'application/json',
        },
      })

      const dataApi = await dataResponse.json()
      console.log("datauser", dataResponse);
  }

  useEffect(()=>{
    // user details
    fetchUSerDetails()
  },[])
  return (
    <>
      <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-120px)]'>
        <Outlet />
      </main>
      {/* index.jsx of routes sents the value */}
      <Footer />
    </>
  );
}

export default App;
