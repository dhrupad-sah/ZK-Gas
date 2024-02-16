// UserId.js
import { createContext, useContext, useState } from 'react';

const UserId = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const updateId = (id) => {
    setUserId(id);
  };

  return (
    <UserId.Provider value={{ userId, updateId }}>
      {children}
    </UserId.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserId);
  if (!context) {
    throw new Error('useUserId must be used within a UserIdProvider');
  }
  return context;
};
