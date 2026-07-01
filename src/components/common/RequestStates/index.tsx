import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { text } from '@/utils/text';
import type { LoadingStateProps, EmptyStateProps, ErrorStateProps } from '@/components/common/RequestStates/index.types';

export function LoadingState({ label = text.GENERIC_LOADING }: LoadingStateProps) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 8 }}>
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Stack>
  );
}

export function EmptyState({ title = text.GENERIC_EMPTY_TITLE, description = text.GENERIC_EMPTY_DESCRIPTION, action }: EmptyStateProps) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 8, px: 2 }}>
      <Box sx={{ color: 'text.disabled' }}> <InboxOutlinedIcon sx={{ fontSize: 56 }} /> </Box>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center"> {description} </Typography>
      {action && (<Button variant="contained" onClick={action.onClick}> {action.label} </Button>)}
    </Stack>
  );
}

export function ErrorState({ message = text.GENERIC_ERROR_MESSAGE, onRetry }: ErrorStateProps) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 8, px: 2 }}>
      <Box sx={{ color: 'error.main' }}>        <ErrorOutlineIcon sx={{ fontSize: 56 }} />      </Box>
      <Typography variant="h6">{text.GENERIC_ERROR_TITLE}</Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">        {message}      </Typography>
      {onRetry && (<Button variant="outlined" color="error" startIcon={<RefreshIcon />} onClick={onRetry}>  {text.RETRY}</Button>)}
    </Stack>
  );
}
