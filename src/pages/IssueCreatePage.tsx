import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { createIssueThunk } from '@/redux/actions/issuesActions';
import { IssueForm } from '@/components/issues/IssueForm';
import { text } from '@/utils/text';
import type { IssueFormValues } from '@/utils/validation.types';
import type { IssueDraft } from '@/types/issue';
import { API_ENDPOINTS } from '@/services/endpoints';

export function IssueCreatePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mutationStatus = useAppSelector((state) => state.issues.mutationStatus);

  const handleSubmit = async (values: IssueFormValues) => {
    const draft: IssueDraft = {
      title: values.title,
      description: values.description,
      status: values.status as IssueDraft['status'],
      priority: values.priority as IssueDraft['priority'],
      assignee: values.assignee,
      dueDate: values.dueDate,
    };

    const created = await dispatch(createIssueThunk(draft));

    if (created) {
      toast.success(text.TASK_CREATED_TOAST(created.title));
      navigate(API_ENDPOINTS.ISSUES);

    } else {
      toast.error(text.TASK_CREATE_FAILED_TOAST);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={700}>   {text.CREATE_TASK_TITLE} </Typography>
      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
        <IssueForm
          submitting={mutationStatus === 'loading'}
          submitLabel={text.CREATE_TASK_SUBMIT}
          onSubmit={handleSubmit}
          onCancel={() => navigate(API_ENDPOINTS.ISSUES)}
        />
      </Paper>
    </Stack>
  );
}
