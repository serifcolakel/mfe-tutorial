import { useState } from 'react';

import { ENV } from '../../common';
import { login, LoginRequest, refreshToken } from '../../services';

export function usePlatziStoreAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (info: LoginRequest) => {
    setLoading(true);

    const response = await login(info);

    const result = {
      success: false,
      message: 'Please check your email and password and try again.',
      title: 'Login Failed',
    };

    if (response.success && response.data) {
      localStorage.setItem(ENV.NX_ACCESS_TOKEN_KEY, response.data.access_token);
      localStorage.setItem(
        ENV.NX_REFRESH_TOKEN_KEY,
        response.data.refresh_token
      );

      result.success = true;
      result.message = 'You have successfully logged in!';
      result.title = 'Login Success';
    } else {
      setError('Please check your email and password and try again.');
    }

    setLoading(false);

    return result;
  };

  const handleRefreshToken = async () => {
    const token = localStorage.getItem(ENV.NX_REFRESH_TOKEN_KEY);

    if (token) {
      const response = await refreshToken({ refreshToken: token });

      if (response.success && response.data) {
        localStorage.setItem(
          ENV.NX_ACCESS_TOKEN_KEY,
          response.data.access_token
        );
        localStorage.setItem(
          ENV.NX_REFRESH_TOKEN_KEY,
          response.data.refresh_token
        );
      } else {
        setError(response.message);
      }
    }
  };

  const onResetError = () => setError(null);

  return {
    loading,
    error,
    handleRefreshToken,
    handleLogin,
    onResetError,
  };
}
