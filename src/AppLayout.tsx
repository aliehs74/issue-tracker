import { ReactNode } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';
import { text } from '@/utils/text';
import { API_ENDPOINTS } from '@/services/endpoints';

export function AppLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isCreateRoute = location.pathname === '/issues/new';

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ gap: 2 }}>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexGrow: 1, }} onClick={() => navigate(API_ENDPOINTS.ISSUES)} >
            <BugReportOutlinedIcon />
            <Typography variant="h6" component="span" fontWeight={700} noWrap> {text.APP_NAME} </Typography>
          </Box>

          {!isCreateRoute && (<Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => navigate('/issues/new')} > {text.NEW_TASK} </Button>)}
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 2, sm: 4 } }}> {children} </Container>
    </Box>
  );
}
