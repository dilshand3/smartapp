import React, { useState } from "react";
import "./Input.css";

interface InputProps {
  label?: string;
  placeholder: string;
  inputType: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder, inputType }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = inputType === "password";

  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          className="input-field"
        />
        {isPassword && (
          <button
            type="button"
            className="icon-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <span className="material-icons">visibility</span> :<span className="material-icons">visibility_off</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
