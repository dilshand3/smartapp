import React from 'react'
import TodoInput from '../TodoInput/TodoInput';
import TodoBox from './TodoBox';

const Todo: React.FC = () => {
  return (
    <div>
      <TodoInput />
      <TodoBox/>
    </div>
  )
}

export default Todo;
