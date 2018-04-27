import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../../../servicios/alert.service';
import { Alert, AlertType } from '../../../../modelo/alert.model';

@Component({
  selector: 'app-alerta-score',
  templateUrl: './alerta-score.component.html',
  styleUrls: ['./alerta-score.component.css']
})
export class AlertaScoreComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
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

