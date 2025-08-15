// src/contexts/UserContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import { UserProps } from 'src/types/user';
import { getAllUsers } from '../convexCLient/report';

type UserContextType = {
  users: UserProps[];
  loading: boolean;
  error: string | null;
};

export const UserContext = createContext<UserContextType>({
  users: [],
  loading: false,
  error: null,
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers as UserProps[]);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError('Failed to load user data');
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, error }}>
      {children}
    </UserContext.Provider>
  );
}