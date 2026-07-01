import text from "@/utils/text";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import type { ConfirmDialogProps } from "./index.types";

export default function ConfirmDialog({ open, title = text.ARE_YOU_SURE, onClose, onConfirm }: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>

            <DialogTitle>{title}</DialogTitle>

            <DialogContent />

            <DialogActions>
                <Button onClick={onClose}>{text.CANCEL}</Button>
                <Button color="error" variant="contained" onClick={onConfirm}>{text.DELETE}</Button>
            </DialogActions>

        </Dialog>
    );
}