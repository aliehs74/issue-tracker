import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { useNavigate } from 'react-router-dom';
import { text } from '@/utils/text';
import { API_ENDPOINTS } from '@/services/endpoints';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2} sx={{ py: 10 }}>
      <SentimentDissatisfiedIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
      <Typography variant="h4" fontWeight={700}> {text.NOT_FOUND_CODE} </Typography>
      <Typography variant="body1" color="text.secondary"> {text.NOT_FOUND_MESSAGE} </Typography>
      <Button variant="contained" onClick={() => navigate(API_ENDPOINTS.ISSUES)}> {text.NOT_FOUND_ACTION} </Button>
    </Stack>
  );
}
