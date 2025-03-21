import React, { useState, useRef } from "react";
import "./Authform.css";
import Input from "../Input/Input";
import { useSignupMutation, useLoginMutation } from "../../redux/AuthSlice/AuthSlice";
import gsap from "gsap";
import toast from "react-hot-toast";

interface AuthFormProps {
  setAuthenticate: (authStatus: boolean) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ setAuthenticate }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({ username: "", email: "", password: "" });

  const [signup, { isLoading: signupLoading }] = useSignupMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const authRef = useRef<HTMLDivElement>(null);

  const shakeAnimation = () => {
    if (authRef.current) {
      gsap.fromTo(
        authRef.current,
        { x: -10 },
        {
          x: 10,
          repeat: 5,
          yoyo: true,
          duration: 0.1,
          ease: "power1.inOut",
        }
      );
    }
  };

  const toggleForm = (): void => {
    setIsLogin(!isLogin);
    setErrors({ username: "", email: "", password: "" });
    shakeAnimation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async () => {
    setErrors({ username: "", email: "", password: "" });
    try {
      if (isLogin) {
        await login({ username: formData.username, password: formData.password }).unwrap();
        setAuthenticate(true)
        toast.success("Login Successful!", {
          icon: <img src={"/smartapp.png"} alt="myIcon" style={{ width: "30px", height: "24px" }} />,
          iconTheme: {
            primary: "#ffcc00",
            secondary: "#FFFFFF",
          },
          style: {
            backgroundColor: "#ffcc00",
            color: "#212121"
          }
        })
      } else {
        await signup(formData).unwrap();
        setAuthenticate(true)
        toast.success("Signup Successful! 🎉", {
          icon: <img src={"/smartapp.png"} alt="myIcon" style={{ width: "30px", height: "24px" }} />,
          iconTheme: {
            primary: "#ffcc00",
            secondary: "#FFFFFF",
          },
          style: {
            backgroundColor: "#ffcc00",
            color: "#212121"
          }
        });
      }
    } catch (error: any) {
      if (error?.data?.message) {
        const errorMessage = error.data.message.toLowerCase();
        if (errorMessage.includes("user not found")) {
          setErrors((prev) => ({ ...prev, username: "User not found" }));
        } else if (errorMessage.includes("username")) {
          setErrors((prev) => ({ ...prev, username: error.data.message }));
        } else if (errorMessage.includes("email")) {
          setErrors((prev) => ({ ...prev, email: error.data.message }));
        } else if (errorMessage.includes("password") || errorMessage.includes("invalid")) {
          setErrors((prev) => ({ ...prev, password: error.data.message }));
        }
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div ref={authRef} className="auth-container">
        <h2>{isLogin ? "Login to Your Account" : "Create Account to Get Started"}</h2>

        <Input
          placeholder="e.g. john_doe123"
          inputType="text"
          name="username"
          onChange={handleChange}
          InputError={errors.username}
        />

        {!isLogin && (
          <Input
            placeholder="e.g. johndoe@example.com"
            inputType="email"
            name="email"
            onChange={handleChange}
            InputError={errors.email}
          />
        )}

        <Input
          placeholder="e.g. StrongPass@123"
          inputType="password"
          name="password"
          onChange={handleChange}
          InputError={errors.password}
        />

        <button className="auth-btn" onClick={handleSubmit}>
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={toggleForm} className="toggleBtn">
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>

        {/* <div className="google-auth">
          <img src={googleImg} alt="Google" />
          <p>{isLogin ? "Continue with Google" : "Create Account with Google"}</p>
        </div> */}
      </div>
      {(loginLoading || signupLoading) &&
        <div className='loaderParent'>
          <div className='loader'></div>
        </div>}
    </div>
  );
};

export default AuthForm;
