export interface PersianDatePickerProps {
  value: string;
  onChange: (isoDate: string) => void;
  label: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}
