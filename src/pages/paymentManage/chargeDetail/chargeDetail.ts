/**
 * Created by russell on 2016/12/22.
 */
import {Component, OnInit} from "@angular/core";
import {ChargeDetailBean} from "../../../beans/beans";
import {NavParams} from "ionic-angular";
@Component({
  selector: 'chargeDetail',
  templateUrl: 'chargeDetail.html'
})
export class ChargeDetail implements OnInit{

  public canCharge: boolean;
  public title: string;
  public chargeDetail: ChargeDetailBean;

  constructor(public params: NavParams) {
    this.title = '';
    this.chargeDetail = new ChargeDetailBean;
    this.canCharge = params.get('canCharge');
  }

  ngOnInit(): void {
  }

}
