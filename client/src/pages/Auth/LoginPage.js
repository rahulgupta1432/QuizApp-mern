import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/Login.css'
import { toast } from 'react-toastify';
import axios from 'axios'
import {API_URL} from '../../constant';
import { useAuth } from '../../context/Auth';
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email,
        password
      });
      const resp = response.data;
      if (resp?.code === 200) {
        toast.success(resp?.message);
        localStorage.setItem("x-authorization", JSON.stringify(resp.data[0].token));
        localStorage.setItem("auth", JSON.stringify(resp.data[0]))
        setAuth({
          ...auth,
          user: resp.data[0].user,
          token: resp.data[0].token
        })

        navigate(`/quiz/maths`)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <>
      <div className="custom-form-box">
        <form className="custom-form" onSubmit={handleLogin}>
          <span className="custom-title">Sign in</span>
          <span className="custom-subtitle" style={{ fontWeight: 'bold' }}>Login into your account.</span>
          <div className="custom-form-container">
            <InputText className="custom-input mt-4" type="email" placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <InputText className="custom-input mt-4" type='password' placeholder="Password"
              value={password}
              onChange={(e) => {
                SetPassword(e.target.value);
              }}
            />
          </div>
          <Button label="Sign In" />
        </form>
        <div className="custom-form-section">
          <p>
            Don't Have an account? <NavLink to={"/register"}>Sign Up</NavLink>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginPage
