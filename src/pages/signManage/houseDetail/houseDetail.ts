/**
 * Created by russell on 2016/12/16.
 */
import {Component, OnInit} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular";
import {Utils} from "../../../services/utils";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {GarDenStyleBean} from "../../../beans/beans";
@Component({
  selector: 'houseDetail',
  templateUrl: 'houseDetail.html'
})

export class HouseDetail implements OnInit {

  mySlideOptions = {
    pager: true,
    autoplay: 2000,
    initialSlide: 1,
    loop: true,

  };

  public agreement: boolean;
  public gardenDetail: GarDenStyleBean;
  public gardenid: number;

  constructor(public loadingCtrl: LoadingController,
              public params: NavParams,
              public util: Utils,
              public httpService: ManagerHttpService) {
    this.gardenDetail = new GarDenStyleBean();
    this.gardenid = params.get("gardenid");
  }

  ngOnInit() {

    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.gardenListStyle(this.gardenid).subscribe( data => {
      loader.dismiss();
      if (data) {
        this.gardenDetail = data[0];
      }
    }, err => {
      loader.dismiss();
    });
  }
}
