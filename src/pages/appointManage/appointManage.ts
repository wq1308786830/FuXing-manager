/**
 * Created by russell on 2016/12/21.
 */
import {Component} from "@angular/core";
import {NavController, ModalController, LoadingController} from "ionic-angular";
import {DealAppointModal} from "./dealAppointModal";
import {ManagerHttpService} from "../../services/manager-http-service";
import {AppointBase, AcceptApppoint, HistoryAppoint} from "../../beans/beans";
import {Utils} from "../../services/utils";
import {EnsureAppointModal} from "./ensureAppointModal";
@Component({
  selector: 'appointManage',
  templateUrl: 'appointManage.html'
})
export class AppointManage {

  appoint = 'waitAccept';
  public appointList: AppointBase[];
  public waitAppointList: AppointBase[];
  public acceptAppointList: AcceptApppoint[];
  public appointedList: HistoryAppoint[];

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              public httpService: ManagerHttpService) {
    this.appointList = [];
    this.waitAppointList = [];
    this.acceptAppointList = [];
    this.appointedList = [];
  }

  ionViewDidEnter() {
    this.segmentChanged();
  }

  acceptAppoint(taskid: string, event) {

    let loader = this.loadingCtrl.create({content: "接单中..."});
    loader.present();
    this.httpService.getAcceptAppoint(taskid).subscribe(data => {
      loader.dismiss();
      this.segmentChanged();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

  askAppoint(taskid: string) {

    let modal = this.modalCtrl.create(EnsureAppointModal, {taskid: taskid, signPage: this});
    modal.present();
  }

  appraiseAppoint(taskid: string) {
    let modal = this.modalCtrl.create(DealAppointModal, {taskid: taskid, signPage: this});
    modal.present();
  }

  segmentChanged() {
    this.appointList = [];
    this.waitAppointList = [];
    this.acceptAppointList = [];
    this.appointedList = [];
    let loader = this.loadingCtrl.create({content: "加载中..."});
    switch (this.appoint) {
      case 'waitAccept':
        loader.present();
        this.httpService.getAppointList().subscribe(data => {
          loader.dismiss();
          if (data) {
            this.appointList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg(err);
        });
        break;

      case 'waitSure':
        loader.present();
        this.httpService.getAcceptAppointList().subscribe(data => {
          loader.dismiss();
          if (data) {
            this.acceptAppointList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg(err);
        });
        break;

      case 'waitAppoint':
        loader.present();
        this.httpService.getWaitAppointList().subscribe(data => {
          loader.dismiss();
          if (data) {
            this.waitAppointList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg(err);
        });
        break;

      case 'appointed':
        loader.present();
        this.httpService.getAppointedList().subscribe(data => {
          loader.dismiss();
          if (data) {
            this.appointedList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg(err);
        });
        break;

      default:
        break;

    }
  }

  doInfinite(e) {

    switch (this.appoint) {
      case 'waitAccept':
        this.httpService.getAppointList().subscribe(data => {
          if (data) {
            this.appointList = this.appointList.concat(data);
          }
          e.complete();
        }, err => {
          e.complete();
        });
        break;

      case 'waitSure':
        this.httpService.getAcceptAppointList().subscribe(data => {
          if (data) {
            this.acceptAppointList = this.acceptAppointList.concat(data);
          }
          e.complete();
        }, err => {
          e.complete();
        });
        break;

      case 'waitAppoint':
        this.httpService.getWaitAppointList().subscribe(data => {
          if (data) {
            this.waitAppointList = this.waitAppointList.concat(data);
          }
          e.complete();
        }, err => {
          e.complete();
        });
        break;

      case 'appointed':
        this.httpService.getAppointedList().subscribe(data => {
          if (data) {
            this.appointedList = this.appointedList.concat(data);
          }
          e.complete();
        }, err => {
          e.complete();
        });
        break;

      default:
        break;

    }
  }

}

