import Chip from '@mui/material/Chip';
import { text } from '@/utils/text';
import type { IssueStatus } from '@/types/issue';
import type { StatusChipProps } from '@/components/common/StatusChip/index.types';

const STATUS_CONFIG: Record<IssueStatus, { label: string; color: 'default' | 'warning' | 'success' }> = {
  Open: { label: text.STATUS_OPEN, color: 'default' },
  'In Progress': { label: text.STATUS_IN_PROGRESS, color: 'warning' },
  Done: { label: text.STATUS_DONE, color: 'success' },
};

export function StatusChip({ status, size = 'small' }: StatusChipProps) {
  const config = STATUS_CONFIG[status];
  return (<Chip label={config.label} color={config.color} size={size} variant={config.color === 'default' ? 'outlined' : 'filled'} />);
}
