import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { createContext, useContext, useState } from "react";

const DialogContext = createContext<{
    showDialog: (options?: { title?: string, description?: string, onConfirm?: () => void, onCancel?: () => void, confirmText?: string, cancelText?: string }) => void;
    hideDialog: () => void;
}>({
    showDialog: () => { },
    hideDialog: () => { },
});

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [dialogTitle, setDialogTitle] = useState<string>('Bạn chắc chứ?');
    const [dialogDescription, setDialogDescription] = useState<string>('');
    const [onConfirm, setOnConfirm] = useState<() => void>(() => () => { }); //() => () => {} hàm sẽ chạy 1 lần, trả về hàm rỗng () => {} làm state ban đầu
    const [onCancel, setOnCancel] = useState<() => void>(() => () => { });

    const showDialog = (options?: { title?: string; description?: string, onConfirm?: () => void, onCancel?: () => void }) => {
        if (options?.title) setDialogTitle(options.title);
        if (options?.description) setDialogDescription(options.description);
        if (options?.onConfirm) {
            setOnConfirm(() => options.onConfirm);
        } else {
            setOnConfirm(() => () => { });
        }
        if (options?.onCancel) {
            setOnCancel(() => options.onCancel);
        } else {
            setOnCancel(() => () => { });
        }

        setDialogOpen(true);
    };
    const hideDialog = () => {
        setDialogOpen(false);
        setDialogTitle('Bạn chắc chứ?');
        setDialogDescription('');
    }

    return (
        <DialogContext.Provider value={{ showDialog, hideDialog }}>
            {children}
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogDescription}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => { onCancel() }}>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                onConfirm()
                                hideDialog()
                            }}
                        >
                            Tiếp tục
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </DialogContext.Provider>
    )
}

export const useDialog = () => useContext(DialogContext);