export type IssueStatus = 'Open' | 'In Progress' | 'Done';

export type IssuePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Issue {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  dueDate: string;
  createdAt: string;
}

export type IssueDraft = Omit<Issue, 'id' | 'createdAt'>;

export interface IssueFilters {
  search: string;
  status: IssueStatus | '';
  priority: IssuePriority | '';
  assignee: string;
}

export type SortField = 'createdAt' | 'dueDate';
export type SortOrder = 'asc' | 'desc';

export interface IssueSort {
  field: SortField;
  order: SortOrder;
}

export interface IssuePagination {
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface IssueListQuery {
  filters: IssueFilters;
  sort: IssueSort;
  pagination: Pick<IssuePagination, 'page' | 'pageSize'>;
}

export const ISSUE_STATUSES: IssueStatus[] = ['Open', 'In Progress', 'Done'];

export const ISSUE_PRIORITIES: IssuePriority[] = [
  'Low',
  'Medium',
  'High',
  'Critical',
];
