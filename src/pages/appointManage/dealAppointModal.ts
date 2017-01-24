/**
 * Created by russell on 2016/12/22.
 */
import {Component} from "@angular/core";
import {Platform, NavParams, ViewController, LoadingController} from "ionic-angular";
import {ManagerHttpService} from "../../services/manager-http-service";
import {Utils} from "../../services/utils";
@Component({
  selector: 'dealAppointModal',
  templateUrl: 'dealAppointModal.html'
})
export class DealAppointModal {

  public changeDate: string;
  public dealContent: string;
  public taskid: string;
  public signPage: any;

  constructor(public platform: Platform,
              public params: NavParams,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController,
              public util: Utils,
              public httpService: ManagerHttpService) {
    this.changeDate = '2016-01-01T00:00+01:00';
    this.dealContent = '';
    this.taskid = params.get('taskid');
    this.signPage = params.get('signPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onClickSubmit() {

    let dateArr = this.changeDate.split('T');
    this.changeDate = dateArr[0] + ' ' + dateArr[1].split('+')[0].substring(0, 5);

    let loader = this.loadingCtrl.create({content: "提交中..."});
    loader.present();

    this.httpService.finishAppointById(this.taskid, this.changeDate, this.dealContent).subscribe(data => {
      loader.dismiss();
      this.dismiss();
      this.signPage.segmentChanged();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

}
