import React from 'react';
import "./Authform.css";
import Input from '../Input/Input';

const AuthForm : React.FC = () => {
  return (
    <div className='auth-container'>
      <Input placeholder='e.g. john_doe123' inputType='text'/>
      <Input placeholder='e.g. johndoe@example.com' inputType='text'/>
      <Input placeholder='e.g. StrongPass@123' inputType='password'/>
    </div>
  )
}

export default AuthForm;
