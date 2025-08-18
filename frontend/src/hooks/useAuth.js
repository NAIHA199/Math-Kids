import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async ({ username, password, userType }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      //await new Promise(resolve => setTimeout(resolve, 2000));
      const res = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          userType,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(JSON.stringify(data));
      }      

      // Mock successful login
      // Lưu token và user vào localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      return { success: true };
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async ({ userType, fullName, email, username, password }) => {
    setIsLoading(true);
    try {
      // Simulate API call
      //await new Promise(resolve => setTimeout(resolve, 2000));
      const res = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          username,
          password,
          userType,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, errors: data.errors || data };
      }
      // Mock successful registration
      return { success: true };
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  return { login, register, logout, isLoading };
};