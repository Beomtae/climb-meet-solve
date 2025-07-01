import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "user";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem(LOCAL_STORAGE_KEY)
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, user);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [user]);

  const login = (username: string) => setUser(username);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("UserContext를 Provider로 감싸주세요.");
  return ctx;
};
