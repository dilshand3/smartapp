import React, { useState, useEffect } from 'react';
import { useCheckUserQuery } from '../../redux/AuthSlice/AuthSlice';
import { useDeleteTodoMutation, useLazySingletodosQuery } from '../../redux/TodoSlice/TodoSlice';
import "./TodoBox.css";
import SingleTodoBox from './SingleTodo';
import toast from 'react-hot-toast';

const TodoBox: React.FC = () => {
  const { data, isLoading: userLoader, refetch } = useCheckUserQuery();
  const [deleteTodo, { isLoading: deleteLoader }] = useDeleteTodoMutation();
  const [fetchSingleTodo] = useLazySingletodosQuery();
  const [todos, setTodos] = useState<any[]>([]);
  const [singleTodoData, setSingleTodoData] = useState<any>(null);

  useEffect(() => {
    if (data?.success && data.data?.todos) {
      const sortedTodos = [...data.data.todos].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      setTodos(sortedTodos);
    }
  }, [data]);

  const handleDeleteTodo = async (Id: string): Promise<void> => {
    try {
      const res: any = await deleteTodo({ Id });
      if (res?.data?.success) {
        toast.success("Todo Deleted");
        refetch();
      } else {
        toast.error(res?.data?.message || "Failed to delete Todo");
      }
    } catch (error) {
      toast.error("Can't delete Todo");
    }
  };

  const handleReadTodo = async (id: string) => {
    try {
      const res: any = await fetchSingleTodo(id);
      if (res?.data?.success) {
        setSingleTodoData(res.data.data);
      } else {
        toast.error("Failed to fetch Todo");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (userLoader || deleteLoader) {
    return (
      <div className='loaderParent'>
        <div className='loader'></div>
      </div>
    );
  }

  if (!todos.length) {
    return (
      <div className="noUrlWrapper">
        <div className='loader'></div>
        <p className='noUrl'>No Todo Found</p>
      </div>
    );
  }

  return (
    <div className="todoListContainer">
      {todos.map((val, index) => (
        <div className="todoItem" key={index}>
          <p className="todoTitle">{val.Title}</p>
          <button className="readTodoBtn" onClick={() => handleReadTodo(val._id)}>Read Todo</button>
          <span
            className="material-icons todoDelete"
            onClick={() => handleDeleteTodo(val._id)}
          >
            delete
          </span>
        </div>
      ))}
      {singleTodoData && <SingleTodoBox todoData={singleTodoData} onClose={() => setSingleTodoData(null)} />}
    </div>
  );
};

export default TodoBox;
