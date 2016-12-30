/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {FaultRepairDetail} from "../faultRepairDetail/faultRepairDetail";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
import {CleanInfo} from "../../../beans/beans";
import {CleanDetail} from "../cleanDetail/cleanDetail";
@Component({
  selector: 'cleanList',
  templateUrl: 'cleanList.html'
})
export class CleanList implements OnInit {

  cleanList = 'waitClean';
  public waitCleanList: CleanInfo[];
  public dealedCleanList: CleanInfo[];
  public curPage1: number;
  public curPage2: number;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private httpService: ManagerHttpService) {
    this.waitCleanList = [];
    this.dealedCleanList = [];
    this.curPage1 = 0;
    this.curPage2 = 0;
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getCleanList(0, false).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.waitCleanList = data;
      }
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('获取数据失败，请重试');
    });
  }

  //详情
  cleanDetail(data: CleanInfo) {
    this.navCtrl.push(CleanDetail, {data: data});
  }

  //催缴
  callPay(id: number) {
    let loader = this.loadingCtrl.create({content: "操作中..."});
    loader.present();
    this.httpService.cleanMoneyCall(id).subscribe(() => {
      loader.dismiss();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('催缴失败，请重试');
    });
    return false;
  }

  segmentChanged() {

    let loader;
    switch (this.cleanList) {
      case 'waitClean':
        loader = this.loadingCtrl.create({content: "加载中..."});
        loader.present();
        this.httpService.getCleanList(0, false).subscribe(data => {
          loader.dismiss();
          if (data) {
            this.waitCleanList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg('获取数据失败，请重试');
        });
        break;

      case 'dealed':
        loader = this.loadingCtrl.create({content: "加载中..."});
        loader.present();
        this.httpService.getCleanList(0, true).subscribe(data => {
          loader.dismiss();
          if (data) {
            this.dealedCleanList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg('获取数据失败，请重试');
        });
        break;

      default:
        break;
    }
  }

  doInfinite(ev) {

    switch (this.cleanList) {
      case 'waitClean':
        this.httpService.getCleanList(++this.curPage1, false).subscribe(data => {
          ev.complete();
          if (data) {
            this.waitCleanList = this.waitCleanList.concat(data);
          }
        }, err => {
          ev.complete();
        });
        break;

      case 'dealed':
        this.httpService.getCleanList(++this.curPage2, true).subscribe(data => {
          ev.complete();
          if (data) {
            this.waitCleanList = this.dealedCleanList.concat(data);
          }
        }, err => {
          ev.complete();
        });
        break;

      default:
        break;
    }

  }

}




