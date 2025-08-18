import { createContext, useContext, useState, type ReactNode } from "react";

type AppContextType = {
    search: string;
    setSearch: (value: string) => void;
    isChoosen: boolean,
    setIsChoosen: (value: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState<string>('');
    //Xác định khi người dùng chọn vào ô chữ gợi ý ở thanh tìm kiếm
    const [isChoosen, setIsChoosen] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{ search, setSearch, isChoosen, setIsChoosen }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext phải được dùng trong AppProvider");
    }

    return context
}