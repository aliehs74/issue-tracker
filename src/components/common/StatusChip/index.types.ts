import type { IssueStatus } from '@/types/issue';

export interface StatusChipProps {
  status: IssueStatus;
  size?: 'small' | 'medium';
}
