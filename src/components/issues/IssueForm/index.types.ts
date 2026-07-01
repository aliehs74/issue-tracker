import type { IssueFormValues } from '@/utils/validation.types';

export interface IssueFormProps {
  defaultValues?: Partial<IssueFormValues>;
  submitting?: boolean;
  submitLabel?: string;
  onSubmit: (values: IssueFormValues) => void;
  onCancel: () => void;
}
