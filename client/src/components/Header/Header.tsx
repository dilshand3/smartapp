import React from 'react'
import ContentToggle from '../ContentToggle/ContentToggle';
import "./Header.css";
import { useLazyLogoutQuery } from '../../redux/AuthSlice/AuthSlice';
import toast from 'react-hot-toast';

interface header {
  setAuthenticated: any
  setshowUrl: any
}

const Header: React.FC<header> = ({ setAuthenticated, setshowUrl }) => {
  const [logout, { isLoading }] = useLazyLogoutQuery();
  const handleLogout = (): void => {
    logout();
    toast.success("LogOut successfully");
    setAuthenticated(false)
  }
  return (
    <div className='container'>
      <ContentToggle setshowUrl={setshowUrl} />
      <button className='logoutbtn' onClick={handleLogout}>Logout</button>
      {isLoading &&
        <div className='loaderParent'>
          <div className='loader'></div>
        </div>}
    </div>
  )
}

export default Header
