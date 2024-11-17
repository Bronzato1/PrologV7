import { AlertType } from "../enumerations/alert-type.enumeration";

export interface IAlert {
    title: string;
    message: string;
    type: AlertType;
  }