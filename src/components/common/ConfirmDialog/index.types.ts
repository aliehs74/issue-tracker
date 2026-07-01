export type ConfirmDialogProps = {
    open: boolean;
    title?: string;
    onClose: () => void;
    onConfirm: () => void;
};
