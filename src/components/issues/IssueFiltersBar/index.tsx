import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grow from '@mui/material/Grow';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setFilters, setSort, resetFilters } from '@/redux/actions/issuesActions';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { text } from '@/utils/text';
import { ISSUE_PRIORITIES, ISSUE_STATUSES, type IssueStatus, type IssuePriority } from '@/types/issue';
import { KNOWN_ASSIGNEES } from '@/services/issuesApi';
import styles from './index.module.scss';

const STATUS_LABELS: Record<IssueStatus, string> = { Open: text.STATUS_OPEN, 'In Progress': text.STATUS_IN_PROGRESS, Done: text.STATUS_DONE };
const PRIORITY_LABELS: Record<IssuePriority, string> = { Low: text.PRIORITY_LOW, Medium: text.PRIORITY_MEDIUM, High: text.PRIORITY_HIGH, Critical: text.PRIORITY_CRITICAL };
const SORT_OPTIONS: { value: string; label: string }[] = [{ value: 'createdAt-desc', label: text.SORT_NEWEST_CREATED }, { value: 'createdAt-asc', label: text.SORT_OLDEST_CREATED }, { value: 'dueDate-asc', label: text.SORT_DUE_SOON }, { value: 'dueDate-desc', label: text.SORT_DUE_LATE },];
const SEARCH_DEBOUNCE_MS = 300;

export function IssueFiltersBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.issues.filters);
  const sort = useAppSelector((state) => state.issues.sort);
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebouncedValue(searchInput, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedSearch !== filters.search)
      dispatch(setFilters({ search: debouncedSearch }));
  }, [debouncedSearch]);

  const hasActiveFilters = Boolean(filters.search || filters.status || filters.priority || filters.assignee);

  const handleReset = () => {
    setSearchInput('');
    dispatch(resetFilters());
  };

  return (
    <Box className={styles.bar}>
      <TextField size="small" placeholder={text.SEARCH_PLACEHOLDER} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className={styles.search} slotProps={{ input: { startAdornment: (<InputAdornment position="start"> <SearchIcon fontSize="small" /> </InputAdornment>) } }} />
      <TextField select size="small" label={text.FILTER_STATUS} value={filters.status} onChange={(e) => dispatch(setFilters({ status: e.target.value as IssueStatus | '' }))} className={styles.select} > <MenuItem value="">{text.ALL}</MenuItem> {ISSUE_STATUSES.map((status) => (<MenuItem key={status} value={status}> {STATUS_LABELS[status]} </MenuItem>))} </TextField>
      <TextField select size="small" label={text.FILTER_PRIORITY} value={filters.priority} onChange={(e) => dispatch(setFilters({ priority: e.target.value as IssuePriority | '' }))} className={styles.select} > <MenuItem value="">{text.ALL}</MenuItem> {ISSUE_PRIORITIES.map((priority) => (<MenuItem key={priority} value={priority}> {PRIORITY_LABELS[priority]} </MenuItem>))} </TextField>
      <TextField select size="small" label={text.FILTER_ASSIGNEE} value={filters.assignee} onChange={(e) => dispatch(setFilters({ assignee: e.target.value }))} className={styles.select} > <MenuItem value="">{text.ALL}</MenuItem> {KNOWN_ASSIGNEES.map((assignee) => (<MenuItem key={assignee} value={assignee}> {assignee} </MenuItem>))} </TextField>
      <TextField select size="small" label={text.SORT_LABEL} value={`${sort.field}-${sort.order}`} className={styles.select}
        onChange={(e) => {
          const [field, order] = e.target.value.split('-') as ['createdAt' | 'dueDate', 'asc' | 'desc',];
          dispatch(setSort({ field, order }));
        }}
        slotProps={{ input: { startAdornment: (<InputAdornment position="start"> <SwapVertIcon fontSize="small" /> </InputAdornment>), }, }}
      >
        {SORT_OPTIONS.map((option) => (<MenuItem key={option.value} value={option.value}> {option.label} </MenuItem>))}
      </TextField>

      <Grow in={hasActiveFilters} unmountOnExit>
        <Tooltip title={text.CLEAR_FILTERS}>
          <IconButton onClick={handleReset} size="small" color="error">
            <ClearIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Grow>
    </Box>
  );
}