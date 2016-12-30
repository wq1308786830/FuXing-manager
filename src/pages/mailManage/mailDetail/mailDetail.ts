/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {ModalController, NavController, NavParams} from "ionic-angular";
import {MailBaseBean} from "../../../beans/beans";
@Component({
  selector: 'mailDetail',
  templateUrl: 'mailDetail.html'
})
export class MailDetail implements OnInit {

  public data: MailBaseBean;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public modalCtrl: ModalController) {
    this.data = params.get('data');
  }

  ngOnInit(): void {
  }

}
