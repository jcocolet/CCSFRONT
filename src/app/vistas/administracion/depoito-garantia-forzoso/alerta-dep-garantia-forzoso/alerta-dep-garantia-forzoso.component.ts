import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../servicios/alert.service';
import { Alert, AlertType } from '../../../../modelo/alert.model';

@Component({
  selector: 'app-alerta-dep-garantia-forzoso',
  templateUrl: './alerta-dep-garantia-forzoso.component.html',
  styleUrls: ['./alerta-dep-garantia-forzoso.component.css']
})
export class AlertaDepGarantiaForzosoComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.alertService.getAlert().subscribe((alert: Alert) => {
          if (!alert) {
              // clear alerts when an empty alert is received
              this.alerts = [];
              return;
          }
          // add alert to array
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
