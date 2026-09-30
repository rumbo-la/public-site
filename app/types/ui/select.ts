export interface SelectOption {
  label: string;
  value?: string;
  disabled?: boolean;
  active?: boolean;
  children?: {
    label: string;
    active: boolean;
  }[];
  specialty?: {
    label: string;
    value: string;
    active: boolean;
    children?: {
      label: string;
      active: boolean;
    }[];
  }[];
}