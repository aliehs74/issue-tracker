import { useForm, Controller } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { issueFormResolver } from '@/utils/validation';
import type { IssueFormValues } from '@/utils/validation.types';
import { ISSUE_PRIORITIES, ISSUE_STATUSES } from '@/types/issue';
import { text } from '@/utils/text';
import { todayIsoDate } from '@/utils/dateUtils';
import { PersianDatePicker } from '@/components/common/persianDatePicker';
import type { IssueFormProps } from '@/components/issues/IssueForm/index.types';

const STATUS_LABELS: Record<string, string> = { Open: text.STATUS_OPEN, 'In Progress': text.STATUS_IN_PROGRESS, Done: text.STATUS_DONE };
const PRIORITY_LABELS: Record<string, string> = { Low: text.PRIORITY_LOW, Medium: text.PRIORITY_MEDIUM, High: text.PRIORITY_HIGH, Critical: text.PRIORITY_CRITICAL, };
const EMPTY_DEFAULTS: IssueFormValues = { title: '', description: '', status: 'Open', priority: 'Medium', assignee: '', dueDate: todayIsoDate(), };

export function IssueForm({ defaultValues, submitting = false, submitLabel = text.SAVE, onSubmit, onCancel, }: IssueFormProps) {

  const { control, handleSubmit, formState: { errors, isDirty }, } = useForm<IssueFormValues>({ resolver: issueFormResolver, defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues }, });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Controller name="title" control={control} render={({ field }) => (
            <TextField  {...field} label={text.FIELD_TITLE} fullWidth required error={Boolean(errors.title)} helperText={errors.title?.message} />
          )} />
        </Grid>

        <Grid size={12}>
          <Controller name="description" control={control} render={({ field }) => (
            <TextField {...field} label={text.FIELD_DESCRIPTION} fullWidth required multiline minRows={4} error={Boolean(errors.description)} helperText={errors.description?.message} />)} />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="status" control={control} render={({ field }) => (
            <TextField {...field} select label={text.FIELD_STATUS} fullWidth required error={Boolean(errors.status)} helperText={errors.status?.message} >
              {ISSUE_STATUSES.map((status) => (<MenuItem key={status} value={status}> {STATUS_LABELS[status]} </MenuItem>))}
            </TextField>
          )} />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="priority" control={control} render={({ field }) => (
            <TextField {...field} select label={text.FIELD_PRIORITY} fullWidth required error={Boolean(errors.priority)} helperText={errors.priority?.message}  >
              {ISSUE_PRIORITIES.map((priority) => (<MenuItem key={priority} value={priority}> {PRIORITY_LABELS[priority]} </MenuItem>))}
            </TextField>
          )} />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <Controller name="dueDate" control={control} render={({ field }) => (
            <PersianDatePicker value={field.value} onChange={field.onChange} label={text.FIELD_DUE_DATE} required error={Boolean(errors.dueDate)} helperText={errors.dueDate?.message} />
          )} />
        </Grid>

        <Grid size={12}>
          <Controller name="assignee" control={control} render={({ field }) => (
            <TextField {...field} label={text.FIELD_ASSIGNEE} fullWidth required error={Boolean(errors.assignee)} helperText={errors.assignee?.message} />
          )} />
        </Grid>

        <Grid size={12}>
          <Stack direction="row" spacing={1.5} justifyContent="flex-end">
            <Button onClick={onCancel} color="inherit" disabled={submitting}>  {text.CANCEL}</Button>
            <Button type="submit" variant="contained" disabled={submitting || !isDirty}
              startIcon={submitting ? (<CircularProgress size={16} color="inherit" />) : (<SaveOutlinedIcon />)}
            >
              {submitLabel}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
