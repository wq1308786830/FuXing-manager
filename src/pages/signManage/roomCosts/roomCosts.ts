/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, LoadingController} from "ionic-angular";
import {HouseBean, GarDenStyleBean} from "../../../beans/beans";
import {ManagerHttpService} from "../../../services/manager-http-service";
@Component({
  selector: 'roomCosts',
  templateUrl: 'roomCosts.html'
})
export class RoomCosts implements OnInit {

  public gardenDetail: GarDenStyleBean;
  public houseList: HouseBean[];
  public houseDetail: any;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public loadingCtrl: LoadingController,
              public httpService: ManagerHttpService) {
    this.gardenDetail = params.get("gardenDetail");
    this.houseDetail = {};
    this.houseList = [];
  }

  ngOnInit() {

    let loader = this.loadingCtrl.create({content: "加载中..."});
    // loader.present();

  }
}
