import React, { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/Login.css'
import { toast } from 'react-toastify';
import axios from 'axios'
import DOMAIN from '../../constant';

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.location.origin}/api/users/register`, {
        email,
        password
      });
      const resp = response.data;

      if (resp?.code === 200) {
        toast.success(resp?.message);
        localStorage.setItem("x-authorization", JSON.stringify(resp.data[0].token));
        localStorage.setItem("auth", JSON.stringify(resp.data[0]))
        navigate(`/dashboard`)
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  return (
    <>
    <div className="custom-form-box">
      <form className="custom-form" onSubmit={handleRegister}>
        <span className="custom-title">Sign up</span>
        <span className="custom-subtitle" style={{ fontWeight: 'bold' }}>Create a free account with your email.</span>
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
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button label="Sign Up" />
      </form>
      <div className="custom-form-section">
        <p>
          Don't Have an account? <NavLink to={"/"}>Sign In</NavLink>
        </p>
      </div>
    </div>
  </>
  )
}

export default RegisterPage
