import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  hasCompletedOnboarding: boolean;
  permissions?: string[];
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, User> = {
  'trainee1': {
    id: '4',
    username: 'trainee1',
    name: 'John Doe',
    email: 'john@example.com',
    hasCompletedOnboarding: false,
    isActive: false,
    startDate: '2024-02-01',
    endDate: '2024-08-01'
  },
  'trainee2': {
    id: '5',
    username: 'trainee2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    hasCompletedOnboarding: true,
    isActive: true,
    startDate: '2024-01-15',
    endDate: '2024-07-15'
  },
  'trainee3': {
    id: '6',
    username: 'trainee3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    hasCompletedOnboarding: true,
    isActive: false,
    startDate: '2023-12-01',
    endDate: '2024-01-20'
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('ojt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers[username];
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('ojt_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ojt_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('ojt_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}