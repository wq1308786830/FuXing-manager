/**
 * Created by russell on 2016/12/22.
 */
import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {ChargeDetail} from "../chargeDetail/chargeDetail";
import {ChargeList} from "../chargeList/chargeList";
import {MoneyPayInfo} from "../../../beans/beans";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
@Component({
  selector: 'payments',
  templateUrl: 'payments.html'
})
export class Payments {

  dealState = 'waitDeal';
  public payItem: number;
  public lists: MoneyPayInfo[];
  public currPage1: number;
  public currPage2: number;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private httpService: ManagerHttpService) {
    this.payItem = 2;
    this.lists = [];
    this.currPage1 = 1;
    this.currPage2 = 1;
  }

  changeItem() {
    this.segmentChanged();
  }

  ionViewDidEnter() {
    this.segmentChanged();
  }

  chargeDetail(paymentDetail: MoneyPayInfo) {
    this.navCtrl.push(ChargeDetail, {canCharge: true, paymentDetail: paymentDetail});
  }

  chargeList(paymentDetail: MoneyPayInfo) {
    this.navCtrl.push(ChargeList, {paymentDetail: paymentDetail, feetype: this.payItem});
  }

  getSegmentData(feetype: number, isDone: boolean) {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getMoneyBillList(feetype, isDone, 1).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.lists = data;
      }
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('获取数据失败，请重试');
    });
  }

  getInfiniteData(feetype: number, isDone: boolean, currPage: number, ev) {
    this.httpService.getMoneyBillList(feetype, isDone, currPage).subscribe(data => {
      if (data) {
        this.lists = this.lists.concat(data);
      }
      ev.complete();
    }, err => {
      ev.complete();
    });
  }

  /**
   * 切换tab
   */
  segmentChanged() {

    this.currPage1 = 1;
    this.currPage2 = 1;
    this.lists = [];
    let flag = false;
    if (this.payItem == 2 || this.payItem == 3) {
      flag = true;
    }

    switch (this.dealState) {

      case 'waitDeal':
        this.getSegmentData(this.payItem, flag);
        break;

      case 'dealed':
        this.getSegmentData(this.payItem, true);
        break;

      default:
        break;
    }
  }

  doInfinite(ev) {

    switch (this.dealState) {

      case 'waitDeal':
        this.getInfiniteData(this.payItem, false, ++this.currPage1, ev);
        break;

      case 'dealed':
        this.getInfiniteData(this.payItem, true, ++this.currPage2, ev);
        break;

      default:
        ev.complete();
        break;
    }

  }

}
