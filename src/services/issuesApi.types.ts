import type { Issue, IssuePagination } from '@/types/issue';

export interface JsonServerPage<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}

export interface IssuesPageResult {
  issues: Issue[];
  pagination: IssuePagination;
}
