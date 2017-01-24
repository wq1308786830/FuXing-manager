/**
 * Created by russell on 2016/12/22.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, LoadingController} from "ionic-angular";
import {ChargeDetail} from "../chargeDetail/chargeDetail";
import {MoneyPayInfo} from "../../../beans/beans";
import {ManagerHttpService} from "../../../services/manager-http-service";
@Component({
  selector: 'chargeList',
  templateUrl: 'chargeList.html'
})
export class ChargeList implements OnInit {

  public paymentDetail: MoneyPayInfo;
  public paymentList: MoneyPayInfo[];
  public feetype: number;
  public currPage: number;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public loadingCtrl: LoadingController,
              private httpService: ManagerHttpService) {
    this.paymentDetail = params.get('paymentDetail');
    this.feetype = params.get('feetype');
    this.paymentList = [];
    this.currPage = 1;
  }

  ngOnInit(): void {
    let loader = this.loadingCtrl.create({content: "正在加载..."});
    loader.present();
    this.httpService.getPaymentHistoryList(this.paymentDetail.houseid, this.feetype, true, 1).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.paymentList = data;
      }
    }, err => {
      loader.dismiss();
    });
  }


  chargeDetail(paymentItem: MoneyPayInfo) {
    this.navCtrl.push(ChargeDetail, {canCharge: false, paymentDetail: paymentItem});
  }

  doInfinite(ev) {
    this.httpService.getPaymentHistoryList(this.paymentDetail.houseid, this.feetype, true, ++this.currPage).subscribe(data => {
      if (data) {
        this.paymentList = this.paymentList.concat(data);
      }
      ev.complete();
    }, err => {
      ev.complete();
    });
  }

}
