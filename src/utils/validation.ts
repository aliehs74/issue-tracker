import { z } from 'zod';
import type { FieldErrors, Resolver } from 'react-hook-form';
import { ISSUE_PRIORITIES, ISSUE_STATUSES } from '@/types/issue';
import { text } from '@/utils/text';
import type { IssueFormValues } from '@/utils/validation.types';

export const issueFormSchema = z.object({
  title: z.string().trim().min(5, text.TITLE_MIN_EM).max(120, text.TITLE_MAX_EM),
  description: z.string().trim().min(10, text.DESCRIPTION_MIN_EM).max(2000, text.DESCRIPTION_MAX_EM),
  status: z.enum(ISSUE_STATUSES as [string, ...string[]], { message: text.STATUS_REQUIRED_EM }),
  priority: z.enum(ISSUE_PRIORITIES as [string, ...string[]], { message: text.PRIORITY_REQUIRED_EM, }),
  assignee: z.string().trim().min(2, text.ASSIGNEE_MIN_EM).max(60, text.ASSIGNEE_MAX_EM),
  dueDate: z.string().min(1, text.DUE_DATE_REQUIRED_EM).refine((value) => !Number.isNaN(new Date(value).getTime()), { message: text.DUE_DATE_INVALID_EM, }),
});

export const issueFormResolver: Resolver<IssueFormValues> = (values) => {
  const result = issueFormSchema.safeParse(values);

  if (result.success) {
    return { values: result.data, errors: {} };
  }

  const errors: FieldErrors<IssueFormValues> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof IssueFormValues | undefined;
    if (field && !errors[field]) {
      errors[field] = { type: issue.code, message: issue.message };
    }
  }

  return { values: {}, errors };
};
