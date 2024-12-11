import { AlertTypeEnum } from "../enumerations/alert-type.enumeration";

export interface IAlert {
    title: string;
    message: string;
    type: AlertTypeEnum;
  }