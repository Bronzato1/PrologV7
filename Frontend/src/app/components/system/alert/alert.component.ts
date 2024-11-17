import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/services/alert.service';
import { AlertType } from '@app/enumerations/alert-type.enumeration';
import { IAlert } from '@app/interfaces/alert.interface';
import { debounceTime, tap } from 'rxjs';

/**
 * Alert component
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  standalone: true
})
export class AlertComponent implements OnInit {

  public showAlert: boolean = false;

  constructor(private alertService: AlertService) { }

  /**
   * The incomming alert object
   */
  public incommingAlert: IAlert = {
    title: '',
    message: '',
    type: AlertType.danger,
  };
  /**
   * Initialize the component
   */
  ngOnInit(): void {

    // We subscribe or listen to new value / alert request.
    this.alertService.alertRequest$
      .pipe(
        //we receive new alert and update the value of the alert object we have in this component.
        // we also make the alert visible.
        tap((alert: IAlert) => {
          this.incommingAlert = alert;
          this.showAlert = true;
        }),
        //we wait for 5 seconds before updating the visibility of the alert
        debounceTime(5000),
        //5 seconds later, we make our alert invisible again and ready for the value.
        tap(() => {
          this.showAlert = false;
        })
      )
      .subscribe();
  }
}
