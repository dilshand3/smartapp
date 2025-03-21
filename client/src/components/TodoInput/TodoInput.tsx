import React, { useState } from 'react';
import "./TodoInput.css";
import { useCreateTodoMutation } from '../../redux/TodoSlice/TodoSlice';
import { useCheckUserQuery } from '../../redux/AuthSlice/AuthSlice';

const TodoInput: React.FC = () => {
    const [Title, setTitle] = useState('');
    const [Todos, setTodos] = useState('');
    const [createTodo, { isLoading }] = useCreateTodoMutation();
    const { refetch } = useCheckUserQuery();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Title.trim() === '' || Todos.trim() === '') return;

        try {
            await createTodo({ Title, Todos }).unwrap();
            setTitle('');
            setTodos('');
            refetch();
        } catch (error) {
            console.error('Failed to create todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='todoFormcontainer'>
            <div className='inputContainer'>
                <input
                    type="text"
                    name="Title"
                    placeholder="Write Title here"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className='titleInput todo'
                />
                <textarea
                    name="Todos"
                    placeholder="Write your todos here..."
                    value={Todos}
                    onChange={(e) => setTodos(e.target.value)}
                    rows={5}
                    required
                    className='todoInput todo'
                />
            </div>
            <button type="submit" className='submitbtn' disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Todo'}
            </button>
        </form>
    );
};

export default TodoInput;
