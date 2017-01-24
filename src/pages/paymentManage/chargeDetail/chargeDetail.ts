/**
 * Created by russell on 2016/12/22.
 */
import {Component} from "@angular/core";
import {ChargeDetailBean, MoneyPayInfo} from "../../../beans/beans";
import {NavParams, LoadingController, NavController} from "ionic-angular";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
@Component({
  selector: 'chargeDetail',
  templateUrl: 'chargeDetail.html'
})
export class ChargeDetail {

  public canCharge: boolean;
  public title: string;
  public chargeDetail: ChargeDetailBean;
  public paymentDetail: MoneyPayInfo;

  constructor(public params: NavParams,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private httpService: ManagerHttpService) {
    this.title = '充值详情';
    this.chargeDetail = new ChargeDetailBean;
    this.canCharge = params.get('canCharge');
    this.paymentDetail = params.get('paymentDetail');
  }

  onClickSubmit() {
    let loader = this.loadingCtrl.create({content: "充值中..."});
    loader.present();
    this.httpService.doSaveMoneyBill(this.paymentDetail.billid).subscribe(() => {
      loader.dismiss();
      this.util.showAlertMsg('充值成功');
      this.navCtrl.pop();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('充值失败，请重试');
    });
  }

}
