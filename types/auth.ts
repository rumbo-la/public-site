import type { ResponseBase } from "./base";

export interface IBrowserInfo {
  ip: string | null | unknown,
  dispositivo: string | null,
  navegador: string | null,
}

export interface ILoginRequest {
  clave: string;
  numeroDocumento: string;
  tipoDocumento: number
}

export interface ILoginResponse {
  bearerToken: string;
  creationDate: string;
  expiryDate: string;
  refreshToken: string;
  tieneError: boolean;
}

export interface IUser {
  first_name: string;
  last_name: string;
  age: number;
  created_at: string;
  updated_at: string | null;
  gender: string;
}

export interface IStage {
  icono: string;
  idEtapa: number;
  nombre: string;
}

export interface ITopic {
  slug: string;
  idTema: number;
  nombre: string;
}

export interface IUser {
  idUsuario: string;
  idTipoDocumento: 1,
  idNivelLogro: 1,
  nroDocumento: string;
  ruc: string;
  nombre: string;
  apellido: string;
  correo: string;
  aceptoPoliticasDePrivacidad: boolean,
  aceptoUsarSusDatosPersonales: boolean,
  haValidadoSuCorreo: boolean,
  tieneActivoNewsletter: boolean,
  etapas: IStage[]
  temas: ITopic[]
  estado: string;
  haCambiadoDeNivel: boolean,
  tieneCursosPendienteCertificacion: boolean,
  fechaCreacion: string;
  numeroCelular: string;
}

export interface IUserResponse extends ResponseBase {
  tieneError: boolean;
  mensaje: string;
  data: IUser
}