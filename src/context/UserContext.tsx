import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile, mockUserProfiles } from "@/data/mockData";

interface UserContextType {
  user: string | null;
  userProfile: UserProfile | null;
  login: (username: string) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "user";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem(LOCAL_STORAGE_KEY)
  );
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedUser ? mockUserProfiles[storedUser] || null : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, user);
      setUserProfile(mockUserProfiles[user] || null);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setUserProfile(null);
    }
  }, [user]);

  const login = (username: string) => setUser(username);
  const logout = () => setUser(null);
  const updateProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    // In a real app, this would update the server
  };

  return (
    <UserContext.Provider value={{ user, userProfile, login, logout, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("UserContext를 Provider로 감싸주세요.");
  return ctx;
};
