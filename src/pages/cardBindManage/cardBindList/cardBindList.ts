/**
 * Created by russell on 2016/12/30.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {Utils} from "../../../services/utils";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {CardBindForm} from "../cardBindForm/cardBindForm";
@Component({
  selector: 'cardBindList',
  templateUrl: 'cardBindList.html'
})
export class CardBindList implements OnInit {

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private httpService: ManagerHttpService) {

  }


  ngOnInit(): void {
  }

  addCardBind() {
    this.navCtrl.push(CardBindForm);
  }

  doInfinite(ev) {
    ev.complete();
  }

}
