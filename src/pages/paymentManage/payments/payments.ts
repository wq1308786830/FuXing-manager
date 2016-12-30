/**
 * Created by russell on 2016/12/22.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {ChargeDetail} from "../chargeDetail/chargeDetail";
import {ChargeList} from "../chargeList/chargeList";
@Component({
  selector: 'payments',
  templateUrl: 'payments.html'
})
export class Payments implements OnInit {

  dealState = 'waitDeal';
  public payItem: string;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController) {
    this.payItem = '1';
  }

  ngOnInit(): void {

  }

  changeItem() {

  }

  chargeDetail() {
    this.navCtrl.push(ChargeDetail, {canCharge: true});
  }

  chargeList(id: number) {
    this.navCtrl.push(ChargeList, {id: id});
  }

  /**
   * 切换tab
   */
  segmentChanged() {

    let loader;
    switch (this.dealState) {

      case 'waitDeal':
        loader = this.loadingCtrl.create({ content: "正在加载..." });
        loader.present();
        break;

      case 'dealed':
        loader = this.loadingCtrl.create({ content: "正在加载..." });
        loader.present();
        break;

      default:
        break;
    }
  }

  doInfinite(ev) {

    switch (this.dealState) {

      case 'waitDeal':
        ev.complete();

        break;

      case 'dealed':
        ev.complete();

        break;

      default:
        ev.complete();
        break;
    }

  }

}
