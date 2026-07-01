import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchIssueByIdThunk, clearCurrentIssue, deleteIssueThunk, } from '@/redux/actions/issuesActions';
import { StatusChip } from '@/components/common/StatusChip';
import { PriorityChip } from '@/components/common/priorityChip';
import { ConfirmDialog } from '@/components/common/confirmDialog';
import { LoadingState, ErrorState } from '@/components/common/RequestStates';
import { formatDate, formatDateTime, isOverdue } from '@/utils/dateUtils';
import { text } from '@/utils/text';
import { navyColor, navyColorDark } from '@/styles/theme';
import { API_ENDPOINTS } from '@/services/endpoints';

export function IssueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const issueId = Number(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentIssue, detailStatus, error, mutationStatus } = useAppSelector((state) => state.issues);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!Number.isNaN(issueId))
      dispatch(fetchIssueByIdThunk(issueId));

    return () => { dispatch(clearCurrentIssue()) }
  }, [dispatch, issueId]);

  const handleDelete = async () => {
    if (!currentIssue) return;
    setDeleting(true);
    const ok = await dispatch(deleteIssueThunk(currentIssue.id));
    setDeleting(false);
    setConfirmOpen(false);

    if (ok) {
      toast.success(text.TASK_DELETED_TOAST(currentIssue.title));
      navigate(API_ENDPOINTS.ISSUES);
    } else {
      toast.error(text.TASK_DELETE_FAILED_TOAST);
    }
  };

  if (Number.isNaN(issueId))
    return <ErrorState message={text.INVALID_TASK_ID} />;

  if (detailStatus === 'loading' || detailStatus === 'idle')
    return <LoadingState label={text.LOADING_TASK} />;

  if (detailStatus === 'failed' || !currentIssue)
    return <ErrorState message={error ?? text.TASK_NOT_FOUND} onRetry={() => dispatch(fetchIssueByIdThunk(issueId))} />

  const overdue = isOverdue(currentIssue.dueDate, currentIssue.status);

  return (
    <Stack spacing={2}>
      <Button variant="contained" startIcon={<ArrowForwardIcon />} onClick={() => navigate(API_ENDPOINTS.ISSUES)} sx={{ alignSelf: 'flex-start', bgcolor: navyColor, '&:hover': { bgcolor: navyColorDark } }}> {text.BACK_TO_LIST} </Button>

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1.5}          >

            <Typography variant="h5" fontWeight={700}> {currentIssue.title} </Typography>

            <Stack direction="row" spacing={1}>
              <Tooltip title={text.EDIT}>
                <IconButton onClick={() => navigate(`/issues/${currentIssue.id}/edit`)}> <EditOutlinedIcon /> </IconButton>
              </Tooltip>

              <Tooltip title={text.DELETE}>
                <IconButton color="error" onClick={() => setConfirmOpen(true)}> <DeleteOutlineIcon /> </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <StatusChip status={currentIssue.status} size="medium" />
            <PriorityChip priority={currentIssue.priority} size="medium" />
          </Stack>

          <Divider />

          <Typography variant="subtitle2" color="text.secondary"> {text.DESCRIPTION_LABEL} </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}> {currentIssue.description} </Typography>

          <Divider />

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack alignItems="center" spacing={0.5}>

                <Stack direction="row" spacing={0.75} alignItems="center">
                  <PersonOutlineIcon color="action" fontSize="small" />
                  <Typography variant="caption" color="text.secondary"> {text.ASSIGNEE_LABEL} </Typography>
                </Stack>

                <Typography variant="body2" fontWeight={600}> {currentIssue.assignee} </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack alignItems="center" spacing={0.5}>

                <Stack direction="row" spacing={0.75} alignItems="center">
                  <EventOutlinedIcon color={overdue ? 'error' : 'action'} fontSize="small" />
                  <Typography variant="caption" color="text.secondary"> {text.DUE_DATE_LABEL} </Typography>
                </Stack>

                <Typography variant="body2" fontWeight={600} color={overdue ? 'error' : 'text.primary'} > {formatDate(currentIssue.dueDate)} </Typography>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Stack alignItems="center" spacing={0.5}>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <ScheduleIcon color="action" fontSize="small" />
                  <Typography variant="caption" color="text.secondary"> {text.CREATED_AT_LABEL} </Typography>
                </Stack>
                <Typography variant="body2" fontWeight={600}> {formatDateTime(currentIssue.createdAt)} </Typography>
              </Stack>
            </Grid>

          </Grid>
        </Stack>
      </Paper>

      <ConfirmDialog
        open={confirmOpen}
        title={text.DELETE_TASK_TITLE}
        description={text.DELETE_TASK_CONFIRM_TEMPLATE(currentIssue.title)}
        confirmLabel={text.DELETE}
        destructive
        loading={deleting || mutationStatus === 'loading'}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </Stack>
  );
}
