/**
 * Created by russell on 2016/12/22.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, LoadingController} from "ionic-angular";
import {ChargeDetail} from "../chargeDetail/chargeDetail";
@Component({
  selector: 'chargeList',
  templateUrl: 'chargeList.html'
})
export class ChargeList implements OnInit {

  public id: number;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public loadingCtrl: LoadingController) {
    this.id = params.get('id');
  }

  ngOnInit(): void {
    let loader = this.loadingCtrl.create({ content: "正在加载..." });
    loader.present();
    loader.dismiss();
  }


  chargeDetail() {
    this.navCtrl.push(ChargeDetail, {canCharge: false});
  }

}
