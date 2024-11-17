import { Injectable } from '@angular/core';
import { IAlert } from '@app/interfaces/alert.interface';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  private alertRequest = new ReplaySubject<IAlert>();

  alertRequest$ = this.alertRequest.asObservable();

  constructor() { }

  showAlert(alert: IAlert) {
    this.alertRequest.next(alert);
  }
}
