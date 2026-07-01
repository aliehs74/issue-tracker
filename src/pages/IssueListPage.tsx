import { useCallback, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchIssuesThunk, deleteIssueThunk, setPage, } from '@/redux/actions/issuesActions';
import { IssueFiltersBar } from '@/components/issues/IssueFiltersBar';
import { IssueList } from '@/components/issues/IssueList';
import { IssuesTableSkeleton } from '@/components/issues/IssuesTableSkeleton';
import { ConfirmDialog } from '@/components/common/confirmDialog';
import { EmptyState, ErrorState } from '@/components/common/RequestStates';
import { text } from '@/utils/text';
import { toPersianDigits } from '@/utils/jalali';
import type { Issue } from '@/types/issue';

export function IssueListPage() {
  const dispatch = useAppDispatch();
  const { items, listStatus, error, filters, sort, pagination, mutationStatus } = useAppSelector((state) => state.issues);
  const [issueToDelete, setIssueToDelete] = useState<Issue | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadIssues = useCallback(() => {
    dispatch(fetchIssuesThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters.search, filters.status, filters.priority, filters.assignee, sort.field, sort.order, pagination.page, pagination.pageSize,]);

  useEffect(() => { loadIssues(); }, [loadIssues]);
  const pageCount = useMemo(() => Math.max(1, Math.ceil(pagination.totalCount / pagination.pageSize)), [pagination.totalCount, pagination.pageSize]);
  const hasActiveFilters = Boolean(filters.search || filters.status || filters.priority || filters.assignee);

  const handleConfirmDelete = async () => {
    if (!issueToDelete) return;

    setDeleting(true);
    const ok = await dispatch(deleteIssueThunk(issueToDelete.id));
    setDeleting(false);

    setIssueToDelete(null);

    if (ok) {
      toast.success(text.TASK_DELETED_TOAST(issueToDelete.title));
      loadIssues();
    } else {
      toast.error(text.TASK_DELETE_FAILED_TOAST);
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" spacing={1}      >
        <Typography variant="h5" fontWeight={700}> {text.TASK_LIST_TITLE} </Typography>
        {pagination.totalCount > 0 && (
          <Typography variant="body2" color="text.secondary"> {toPersianDigits(pagination.totalCount)} {text.ITEMS_COUNT_SUFFIX} </Typography>)}
      </Stack>

      <IssueFiltersBar />

      {listStatus === 'loading' && (<IssuesTableSkeleton rowCount={pagination.pageSize} />)}
      {listStatus === 'failed' && (<ErrorState message={error ?? undefined} onRetry={loadIssues} />)}
      {listStatus === 'succeeded' && items.length === 0 && (
        <EmptyState title={hasActiveFilters ? text.NO_RESULTS_TITLE : text.NO_TASKS_TITLE} description={hasActiveFilters ? text.NO_RESULTS_DESCRIPTION : text.NO_TASKS_DESCRIPTION} />
      )}

      {listStatus === 'succeeded' && items.length > 0 && (
        <>
          <IssueList issues={items} onDeleteRequest={setIssueToDelete} />
          {pageCount > 1 && (
            <Box display="flex" justifyContent="center" pt={1}>
              <Pagination count={pageCount} page={pagination.page} onChange={(_, page) => dispatch(setPage(page))} color="primary" />
            </Box>
          )}
        </>
      )}

      <ConfirmDialog open={Boolean(issueToDelete)} title={text.DELETE_TASK_TITLE} description={text.DELETE_TASK_CONFIRM_TEMPLATE(issueToDelete?.title ?? '')} confirmLabel={text.DELETE} destructive loading={deleting || mutationStatus === 'loading'} onConfirm={handleConfirmDelete} onCancel={() => setIssueToDelete(null)} />
    </Stack>
  );
}