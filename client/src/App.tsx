import React, { useState, useEffect } from 'react';
import './App.css';
import AuthForm from './components/AuthForm/AuthForm';
import { Toaster } from 'react-hot-toast';
import UrlShortner from './components/UrlShortner/UrlShortner';
import { useCheckUserQuery } from './redux/AuthSlice/AuthSlice';
import Header from './components/Header/Header';
import Todo from './components/Todos/Todo';

const App: React.FC = () => {
  const [Authenticated, setAuthenticated] = useState<boolean>(false);
  const [showUrl, setshowUrl] = useState<boolean>(true)

  const { data, isLoading } = useCheckUserQuery();

  useEffect(() => {
    if (data?.success && data.data) {
      setAuthenticated(true);
    }
  }, [data]);

  return (
    <>
      {Authenticated && <Header setAuthenticated={setAuthenticated} setshowUrl={setshowUrl} />}
      {isLoading &&
        <div className='loaderParent'>
          <div className='loader'></div>
        </div>}
      {!Authenticated && <AuthForm setAuthenticate={setAuthenticated} />}
      {Authenticated ? (showUrl ? <UrlShortner /> : <Todo />) : null}
      <Toaster />
    </>
  );
};

export default App;
