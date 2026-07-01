import type { Issue } from '@/types/issue';

export interface IssueListProps {
  issues: Issue[];
  onDeleteRequest: (issue: Issue) => void;
}
