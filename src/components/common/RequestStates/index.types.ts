export interface LoadingStateProps {
  label?: string;
}

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
}

export interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: EmptyStateAction;
}

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}
