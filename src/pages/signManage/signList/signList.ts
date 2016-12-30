/**
 * Created by russell on 2016/12/22.
 */
import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {HouseDetail} from "../houseDetail/houseDetail";
import {RoomCosts} from "../roomCosts/roomCosts";
@Component({
  selector: 'signList',
  templateUrl: 'signList.html'
})
export class SignList implements OnInit {

  signList = 'waitSign';

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(): void {
  }

  onClickHouseDetail() {
    this.navCtrl.push(HouseDetail);
  }

  onClickRentDetail() {
    this.navCtrl.push(RoomCosts);
  }

}
