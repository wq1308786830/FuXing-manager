/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, LoadingController} from "ionic-angular";
import {
  RentBillInfo, HouseFullInfo, HouseSimple, HouseRentInfo, HouseStyleInfo,
  HouseMakerInfo
} from "../../../beans/beans";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
@Component({
  selector: 'roomCosts',
  templateUrl: 'roomCosts.html'
})
export class RoomCosts implements OnInit{

  public rentInfo: HouseSimple;
  public houseFullInfo: HouseFullInfo;
  public rentinfo: HouseRentInfo;
  public style: HouseStyleInfo;
  public maker: HouseMakerInfo;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public loadingCtrl: LoadingController,
              public util: Utils,
              public httpService: ManagerHttpService) {
    this.rentInfo = params.get("rentInfo");
    this.houseFullInfo = new HouseFullInfo();
    this.rentinfo = new HouseRentInfo();
    this.style = new HouseStyleInfo();
    this.maker = new HouseMakerInfo();
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getHouseFullInfo(this.rentInfo.id).subscribe( data => {
      loader.dismiss();
      if (data) {
        this.houseFullInfo = data;
        this.style = data.style;
        this.rentinfo = data.rentinfo[data.rentinfo.length-1];
        this.maker = data.maker;
      }
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

}
