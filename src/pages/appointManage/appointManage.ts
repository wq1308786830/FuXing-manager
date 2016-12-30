/**
 * Created by russell on 2016/12/21.
 */
import {Component, OnInit} from "@angular/core";
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
export class AppointManage implements OnInit {

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

  ngOnInit(): void {
    this.initData();
  }

  initData() {

    this.httpService.getAppointList().subscribe(data => {
      if (data) {
        this.appointList = data;
      }
    }, err => {
      this.util.showAlertMsg('获取数据失败，请重试');
    });
  }

  acceptAppoint(taskid: string, event) {

    let loader = this.loadingCtrl.create({content: "接单中..."});
    loader.present();

    this.httpService.getAcceptAppoint(taskid).subscribe(data => {

      loader.dismiss();
      this.initData();
    }, err => {

      loader.dismiss();
      this.util.showAlertMsg('接单失败，请重试');
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

    switch (this.appoint) {
      case 'waitAccept':
        this.httpService.getAppointList().subscribe(data => {
          if (data) {
            this.appointList = data;
          }
        }, err => {
          this.util.showAlertMsg('获取数据失败，请重试');
        });
        break;

      case 'waitSure':
        this.httpService.getAcceptAppointList().subscribe(data => {
          if (data) {
            this.acceptAppointList = data;
          }
        }, err => {
          this.util.showAlertMsg('获取数据失败，请重试');
        });
        break;

      case 'waitAppoint':
        this.httpService.getWaitAppointList().subscribe(data => {
          if (data) {
            this.waitAppointList = data;
          }
        }, err => {
          this.util.showAlertMsg('获取数据失败，请重试');
        });
        break;

      case 'appointed':
        this.httpService.getAppointedList().subscribe(data => {
          if (data) {
            this.appointedList = data;
          }
        }, err => {
          this.util.showAlertMsg('获取数据失败，请重试');
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
          e.complete();
          if (data) {
            this.appointList = this.appointList.concat(data);
          }
        }, err => {
          e.complete();
        });
        break;

      case 'waitSure':
        this.httpService.getAcceptAppointList().subscribe(data => {
          e.complete();
          if (data) {
            this.acceptAppointList = this.acceptAppointList.concat(data);
          }
        }, err => {
          e.complete();
        });
        break;

      case 'waitAppoint':
        this.httpService.getWaitAppointList().subscribe(data => {
          e.complete();
          if (data) {
            this.waitAppointList = this.waitAppointList.concat(data);
          }
        }, err => {
          e.complete();
        });
        break;

      case 'appointed':
        this.httpService.getAppointedList().subscribe(data => {
          e.complete();
          if (data) {
            this.appointedList = this.appointedList.concat(data);
          }
        }, err => {
          e.complete();
        });
        break;

      default:
        break;

    }
  }

}

