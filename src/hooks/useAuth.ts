import { login, logout } from "../redux/slices/auth";
import { useCustomDispatch, useCustomSelector } from "./redux";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { RootState } from "redux/store";

interface UserInfo {
    username: string;
    password: string;
}


export const useAuth = () => {
    const navigate = useNavigate();
    const isLoading = useCustomSelector((state: RootState) => state.auth.isLoading);
    const dispatch = useCustomDispatch();
    
      
    const [ userInfo, setUserInfo] = useState<UserInfo>({
      'username': '',
      'password': ''
    });
    const [ errors, setErrors] = useState<string | null>("");
  
    const  {username, password} = userInfo;
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserInfo({ ...userInfo, [name]: value });
    }
  
    const sendSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();  
      const valid = !!username && !!password
      valid 
          ? handleLogin('eve.holt@reqres.in', 'cityslicka')
          : setErrors('Todos los campos deben estar llenos')
    }
        

    const handleLogin = async (username: string, password: string) => {
        const result = await dispatch(login({ email: username, password }));
      
        if (login.fulfilled.match(result)) {
          navigate('/dashboard');
        } else {
          console.error('Error en el login:', result.payload);
        }
    };

    const handleLogout =  () => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return { handleLogin, sendSubmit, handleInputChange, errors, username, password, isLoading, handleLogout }

}