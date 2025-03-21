import React from 'react';
import "./toggleBtn.css";

interface toggleBtn {
    active: boolean;
    onToggle: () => void;
}

const ToggleBtn: React.FC<toggleBtn> = ({ active, onToggle }) => {
    return (
        <>
            <label><input title="title" checked={active} name="dummy" type="checkbox" className="bubble" onChange={onToggle} /></label>
        </>
    )
}

export default ToggleBtn;
