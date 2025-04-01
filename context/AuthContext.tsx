/*
 * Copyright 2025 Hal Ng
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { createContext, useState, useContext, useEffect } from 'react';

import { AuthCredentials } from '@/model/Auth';
import { UserService } from '@/services/handler/UserService';

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isSetup: boolean;
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (credentials: AuthCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSetup, setIsSetup] = useState<boolean>(false);
  const userService = new UserService();
  useEffect(() => {
    const checkUser = async () => {
      const hasUser = await userService.hasActiveUser();
      setIsSetup(hasUser);
    };
    checkUser();
  }, []);

  const login = async (credentials: AuthCredentials): Promise<boolean> => {
    try {
      const isValid = await userService.verifyCredential(credentials);
      setIsAuthenticated(isValid);
      return isValid;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const register = async (credentials: AuthCredentials): Promise<void> => {
    try {
      await userService.add(credentials);
      setIsSetup(true);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isSetup,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
