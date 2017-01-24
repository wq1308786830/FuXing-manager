/**
 * Created by russell on 2016/12/16.
 */
import {Component, OnInit} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular";
import {Utils} from "../../../services/utils";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {GarDenStyleBean, HouseFullInfo, HouseStyleInfo} from "../../../beans/beans";
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

  public houseFullInfo: HouseFullInfo;
  public style: HouseStyleInfo;
  public id: string;

  constructor(public loadingCtrl: LoadingController,
              public params: NavParams,
              public util: Utils,
              public httpService: ManagerHttpService) {
    this.houseFullInfo = new HouseFullInfo();
    this.style = new HouseStyleInfo;
    this.id = params.get("id");
  }

  ngOnInit() {

    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getHouseFullInfo(this.id).subscribe( data => {
      loader.dismiss();
      if (data) {
        this.houseFullInfo = data;
        this.style= data.style;
      }
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('获取数据失败，请重试');
    });
  }
}
