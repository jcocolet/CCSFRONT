import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../servicios/alert.service';
import { Alert, AlertType } from '../../../../modelo/alert.model';

@Component({
  selector: 'app-app-alert-planes-libres',
  templateUrl: './app-alert-planes-libres.component.html',
  styleUrls: ['./app-alert-planes-libres.component.css']
})
export class AppAlertPlanesLibresComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert:Alert)=>{
      if(!alert){
        this.alerts = [];
        return;
      }
      this.alerts.push(alert);
    });
  }


  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
        return;
    }

    // return css class based on alert type
    switch (alert.type) {
        case AlertType.Primary:
            return 'alert alert-primary';
        case AlertType.Success:
            return 'alert alert-success';
        case AlertType.Error:
            return 'alert alert-danger';
        case AlertType.Info:
            return 'alert alert-info';
        case AlertType.Warning:
            return 'alert alert-warning';
    }
}


}

