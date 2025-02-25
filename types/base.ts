export interface ResponseBase {
  data?: any;
  status: number;
  mensaje: string;
  tieneError: boolean
  error: {
    message: string;
    metadata: string;
  }
}

export interface SelectOption {
  label: string;
  value: string;
}
