import type { IssuePriority } from '@/types/issue';

export interface PriorityChipProps {
  priority: IssuePriority;
  size?: 'small' | 'medium';
}
