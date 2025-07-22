import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext<{
    show: () => void;
    hide: () => void;
    visible: boolean;
}>({
    show: () => { },
    hide: () => { },
    visible: false,
});

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [visible, setVisible] = useState(false);

    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    return (
        <LoadingContext.Provider value={{ show, hide, visible }}>
            {children}
            {visible && (
                <div className="fixed inset-0 bg-black/30 z-[9999] pointer-events-auto grid place-items-center">
                    <div className="loaderSpinner" />
                </div>
            )}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);