/**
 * Created by russell on 2016/12/29.
 */
import {Component, OnInit} from "@angular/core";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
import {NavController, LoadingController, NavParams} from "ionic-angular";
import {UnRentInfo, UnRentRefundInfo} from "../../../beans/beans";
@Component({
  selector: 'drawBackDetail',
  templateUrl: 'drawBackDetail.html'
})
export class DrawBackDetail implements OnInit {

  public unrentInfo: UnRentInfo;
  public unrentMoney: UnRentRefundInfo;
  public readonly: boolean;

  constructor(public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              public util: Utils,
              public params: NavParams,
              private httpService: ManagerHttpService) {
    this.unrentInfo = params.get('data');
    this.readonly = params.get('read');
    this.unrentMoney = new UnRentRefundInfo;
  }

  ngOnInit(): void {
    if (!this.readonly) {
      this.computeMoney();
    }
  }

  computeMoney() {
    this.httpService.getUnrentMoney(this.unrentInfo).subscribe(data => {
      if (data) {
        this.unrentMoney = data;
        this.unrentInfo.moneyTotlaRefund = data.totalrefund;
      }
    }, err => {
      this.util.showAlertMsg(err);
    });
  }

  numChanged() {
    this.computeMoney();
  }


  onClickSubmit() {
    let loader = this.loadingCtrl.create({content: "正在提交..."});
    loader.present();
    this.httpService.saveUnrentDetail(this.unrentMoney, this.unrentInfo).subscribe(() => {
      loader.dismiss();
      this.util.showAlertMsg("提交成功");
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

}
