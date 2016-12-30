/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {FaultRepairDetail} from "../faultRepairDetail/faultRepairDetail";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
import {RepairInfo} from "../../../beans/beans";
@Component({
  selector: 'faultRepairList',
  templateUrl: 'faultRepairList.html'
})
export class FaultRepairList implements OnInit {

  faultRepairList = 'waitDeal';
  public waitRepairList: RepairInfo[];
  public dealedRepairList: RepairInfo[];
  public curPage1: number;
  public curPage2: number;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private httpService: ManagerHttpService) {
    this.waitRepairList = [];
    this.dealedRepairList = [];
    this.curPage1 = 0;
    this.curPage2 = 0;
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getRepairList(0, false).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.waitRepairList = data;
      }
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('获取数据失败，请重试');
    });
  }

  //详情
  repairDetail(data: RepairInfo) {
    this.navCtrl.push(FaultRepairDetail, {data: data});
  }

  repairDetailWithMoney(data: RepairInfo) {
    this.navCtrl.push(FaultRepairDetail, {data: data});
  }

  //催缴
  callPay(id: number, e) {
    let loader = this.loadingCtrl.create({content: "操作中..."});
    loader.present();
    this.httpService.repairMoneyCall(id).subscribe(() => {
      loader.dismiss();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('获取数据失败，请重试');
    });
    return false;
  }

  segmentChanged() {

    let loader;
    switch (this.faultRepairList) {
      case 'waitDeal':
        loader = this.loadingCtrl.create({content: "加载中..."});
        loader.present();
        this.httpService.getRepairList(0, false).subscribe(data => {
          loader.dismiss();
          if (data) {
            this.waitRepairList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg('获取数据失败，请重试');
        });
        break;

      case 'dealed':
        loader = this.loadingCtrl.create({content: "加载中..."});
        loader.present();
        this.httpService.getRepairList(0, true).subscribe(data => {
          loader.dismiss();
          if (data) {
            this.dealedRepairList = data;
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
    switch (this.faultRepairList) {
      case 'waitDeal':
        this.httpService.getRepairList(++this.curPage1, false).subscribe(data => {
          ev.complete();
          if (data) {
            this.waitRepairList = this.waitRepairList.concat(data);
          }
        }, err => {
          ev.complete();
          this.util.showAlertMsg('获取数据失败，请重试');
        });
        break;

      case 'dealed':
        this.httpService.getRepairList(++this.curPage2, true).subscribe(data => {
          ev.complete();
          if (data) {
            this.dealedRepairList = this.dealedRepairList.concat(data);
          }
        }, err => {
          ev.complete();
          this.util.showAlertMsg('获取数据失败，请重试');
        });
        break;

      default:
        break;
    }

  }

}




