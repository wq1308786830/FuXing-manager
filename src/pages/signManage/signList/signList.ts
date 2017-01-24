/**
 * Created by russell on 2016/12/22.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {HouseDetail} from "../houseDetail/houseDetail";
import {RoomCosts} from "../roomCosts/roomCosts";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
import {RentBillInfo, HouseSimple} from "../../../beans/beans";
@Component({
  selector: 'signList',
  templateUrl: 'signList.html'
})
export class SignList implements OnInit {

  signList = 'waitSign';

  public lists: HouseSimple[];
  public currPage1: number;
  public currPage2: number;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private httpService: ManagerHttpService) {
    this.lists = [];
    this.currPage1 = 1;
    this.currPage2 = 1;
  }

  ngOnInit(): void {
    this.getSegmentData(false);
  }

  getSegmentData(isDone: boolean) {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getRentBillList(isDone, 1).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.lists = data;
      }
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('获取数据失败，请重试');
    });
  }

  getInfiniteData(isDone: boolean, currPage: number, ev) {
    this.httpService.getRentBillList(isDone, currPage).subscribe(data => {
      if (data) {
        this.lists = this.lists.concat(data);
      }
      ev.complete();
    }, err => {
      ev.complete();
    });
  }

  onClickHouseDetail(rentInfo: HouseSimple) {
    this.navCtrl.push(HouseDetail, {id: rentInfo.id});
  }

  onClickRentDetail(rentInfo: HouseSimple) {
    this.navCtrl.push(RoomCosts, {rentInfo: rentInfo});
  }

  segmentChanged() {

    this.lists = [];
    this.currPage1 = 1;
    this.currPage2 = 1;

    switch (this.signList) {
      case 'waitSign':
        this.getSegmentData(false);
        break;

      case 'signed':
        this.getSegmentData(true);
        break;

      default:
        break;
    }
  }

  doInfinite(ev) {
    switch (this.signList) {
      case 'waitSign':
        this.getInfiniteData(false, ++this.currPage1, ev);
        break;

      case 'signed':
        this.getInfiniteData(true, ++this.currPage2, ev);
        break;

      default:
        break;
    }
  }

}
