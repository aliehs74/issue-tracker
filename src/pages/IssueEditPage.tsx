import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchIssueByIdThunk, clearCurrentIssue, updateIssueThunk } from '@/redux/actions/issuesActions';
import { IssueForm } from '@/components/issues/IssueForm';
import { LoadingState, ErrorState } from '@/components/common/RequestStates';
import { text } from '@/utils/text';
import type { IssueFormValues } from '@/utils/validation.types';
import type { IssueDraft } from '@/types/issue';

export function IssueEditPage() {
  const { id } = useParams<{ id: string }>();
  const issueId = Number(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentIssue, detailStatus, error, mutationStatus } = useAppSelector((state) => state.issues);

  useEffect(() => {
    if (!Number.isNaN(issueId))
      dispatch(fetchIssueByIdThunk(issueId));

    return () => { dispatch(clearCurrentIssue()) }
  }, [dispatch, issueId]);

  const handleSubmit = async (values: IssueFormValues) => {
    const draft: IssueDraft = { title: values.title, description: values.description, status: values.status as IssueDraft['status'], priority: values.priority as IssueDraft['priority'], assignee: values.assignee, dueDate: values.dueDate, };

    const updated = await dispatch(updateIssueThunk(issueId, draft));
    if (updated) {
      toast.success(text.TASK_UPDATED_TOAST(updated.title));
      navigate(`/issues/${updated.id}`);
    } else {
      toast.error(text.TASK_UPDATE_FAILED_TOAST);
    }
  };

  if (Number.isNaN(issueId))
    return <ErrorState message={text.INVALID_TASK_ID} />;

  if (detailStatus === 'loading' || detailStatus === 'idle')
    return <LoadingState label={text.LOADING_TASK} />;

  if (detailStatus === 'failed' || !currentIssue)
    return (<ErrorState message={error ?? text.TASK_NOT_FOUND} onRetry={() => dispatch(fetchIssueByIdThunk(issueId))} />);

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={700}>  {text.EDIT_TASK_TITLE}</Typography>
      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
        <IssueForm
          defaultValues={{ title: currentIssue.title, description: currentIssue.description, status: currentIssue.status, priority: currentIssue.priority, assignee: currentIssue.assignee, dueDate: currentIssue.dueDate, }}
          submitting={mutationStatus === 'loading'}
          submitLabel={text.SAVE_CHANGES}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/issues/${issueId}`)}
        />
      </Paper>
    </Stack>
  );
}