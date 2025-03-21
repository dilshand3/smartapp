import React, { useState } from "react";
import "./Input.css";

interface InputProps {
  label?: string;
  placeholder: string;
  inputType: string;
  name: string;
  InputError?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value? : string
}

const Input: React.FC<InputProps> = ({ label, placeholder, inputType, name, onChange, InputError ,value}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isPassword = inputType === "password";

  return (
    <>
      <div className="input-container">
        {label && <label className="input-label">{label}</label>}
        <div className={`input-wrapper ${InputError ? "error-border" : ""}`}>
          <input
            type={isPassword && !showPassword ? "password" : "text"}
            placeholder={placeholder}
            className={`input-field ${InputError ? "input-error" : ""}`}
            name={name}
            onChange={onChange}
            value={value}
          />
          {isPassword && (
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <span className="material-icons">visibility</span>
              ) : (
                <span className="material-icons">visibility_off</span>
              )}
            </button>
          )}
        </div>
      </div>
      {InputError && <p className="backendError">{InputError}</p>}
    </>
  );
};

export default Input;
