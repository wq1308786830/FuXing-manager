/**
 * Created by russell on 2016/12/23.
 */
import {Component, OnInit} from "@angular/core";
import {LoadingController, NavParams, ViewController} from "ionic-angular";
import {ManagerHttpService} from "../../services/manager-http-service";
import {Utils} from "../../services/utils";
@Component({
  selector: 'ensureAppointModal',
  templateUrl: 'ensureAppointModal.html'
})
export class EnsureAppointModal implements OnInit {

  public taskid: string;
  public dealContent: string;
  public signPage: any;

  constructor(public loadingCtrl: LoadingController,
              public params: NavParams,
              public util: Utils,
              public viewCtrl: ViewController,
              public httpService: ManagerHttpService) {
    this.taskid = params.get('taskid');
    this.signPage = params.get('signPage');
    this.dealContent = '';
  }

  ngOnInit(): void {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  confirmAppoint(result: boolean) {

    let loader = this.loadingCtrl.create({content: "操作中..."});
    loader.present();

    this.httpService.getConfirmAppointById(this.taskid, this.dealContent, result).subscribe(data => {
      loader.dismiss();
      this.dismiss();
      this.signPage.segmentChanged();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

}
