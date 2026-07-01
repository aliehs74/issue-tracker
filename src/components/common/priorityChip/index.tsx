import Chip from '@mui/material/Chip';
import { text } from '@/utils/text';
import type { IssuePriority } from '@/types/issue';
import type { PriorityChipProps } from '@/components/common/priorityChip/index.types';

const PRIORITY_CONFIG: Record<IssuePriority, { label: string; color: 'info' | 'primary' | 'warning' | 'error' }> = {
  Low: { label: text.PRIORITY_LOW, color: 'info' },
  Medium: { label: text.PRIORITY_MEDIUM, color: 'primary' },
  High: { label: text.PRIORITY_HIGH, color: 'warning' },
  Critical: { label: text.PRIORITY_CRITICAL, color: 'error' },
};

export function PriorityChip({ priority, size = 'small' }: PriorityChipProps) {
  const config = PRIORITY_CONFIG[priority];
  return <Chip label={config.label} color={config.color} size={size} />;
}
