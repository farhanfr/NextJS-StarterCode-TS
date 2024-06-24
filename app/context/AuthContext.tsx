import { createContext, useState, useContext } from 'react';

interface AuthDataContextState {
  phoneNumber: string;
  setData: (data: string) => void;
}

const DataContext = createContext<AuthDataContextState | null>(null);

export const AuthDataProvider: React.FC<{ children: React.ReactNode; initialData?: string }> = ({
  children,
  initialData,
}) => {
  const [data, setData] = useState<string>(initialData ?? "");

  return (
    <DataContext.Provider value={{ phoneNumber: data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): AuthDataContextState => useContext(DataContext)!;