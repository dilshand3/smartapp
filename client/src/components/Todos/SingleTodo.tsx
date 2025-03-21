import React, { useState } from 'react';
import "./SingleTodo.css";
import { useEdittodosMutation } from '../../redux/TodoSlice/TodoSlice';
import { useCheckUserQuery } from '../../redux/AuthSlice/AuthSlice';
import toast from 'react-hot-toast';

interface SingleTodoProps {
    todoData: any;
    onClose: () => void;
}

const SingleTodoBox: React.FC<SingleTodoProps> = ({ todoData, onClose }) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(todoData.Title);
    const [todo, setTodo] = useState(todoData.Todos);
    const [editTodo, { isLoading }] = useEdittodosMutation();
    const { refetch } = useCheckUserQuery();

    const handleEditSave = async () => {
        if (editMode) {
            try {
                const res: any = await editTodo({
                    id: todoData._id,
                    body: {
                        Title: title,
                        Todos: todo
                    }
                });

                if (res?.data?.success) {
                    refetch();
                    toast.success("Todo Updated Successfully");
                    setEditMode(false);
                } else {
                    toast.error(res?.data?.message || "Failed to update");
                }
            } catch (err) {
                toast.error("Error while updating");
            }
        } else {
            setEditMode(true);
        }
    };

    return (
        <div className='singleTodoContainer'>
            <div className='singleTodoContent'>
                <h3>Todo Details</h3>

                <div className='inputGroup'>
                    <p className='inputTitle'>Title:</p>
                    <input
                        type="text"
                        value={title}
                        disabled={!editMode}
                        onChange={(e) => setTitle(e.target.value)}
                        className='singletodotext'
                    />
                </div>

                <div className='inputGroup'>
                    <p className='inputTitle'>Todo:</p>
                    <input
                        type="text"
                        value={todo}
                        disabled={!editMode}
                        onChange={(e) => setTodo(e.target.value)}
                        className='singletodotext'
                    />
                </div>

                <div className='buttonGroup'>
                    <button onClick={handleEditSave} disabled={isLoading}>
                        {editMode ? (isLoading ? "Saving..." : "Save") : "Edit"}
                    </button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>

    );
};

export default SingleTodoBox;
