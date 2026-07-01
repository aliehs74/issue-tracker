import { text } from '@/utils/text';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import type { ConfirmDialogProps } from '@/components/common/confirmDialog/index.types';

export function ConfirmDialog({ open, title, description, confirmLabel = text.CONFIRM, cancelLabel = text.CANCEL, loading = false, destructive = false, onConfirm, onCancel, }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} disabled={loading} color="inherit"> {cancelLabel} </Button>

        <Button onClick={onConfirm} disabled={loading} variant="contained" color={destructive ? 'error' : 'primary'} startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}