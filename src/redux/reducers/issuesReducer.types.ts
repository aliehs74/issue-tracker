import type {
  Issue,
  IssueFilters,
  IssuePagination,
  IssueSort,
} from '@/types/issue';

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface IssuesState {
  items: Issue[];
  currentIssue: Issue | null;
  listStatus: AsyncStatus;
  detailStatus: AsyncStatus;
  mutationStatus: AsyncStatus;
  error: string | null;
  filters: IssueFilters;
  sort: IssueSort;
  pagination: IssuePagination;
}
