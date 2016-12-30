/**
 * Created by russell on 2016/12/9.
 */
import {Component} from "@angular/core";
import {NavController, Slides} from "ionic-angular";
import {AppointManage} from "../appointManage/appointManage";
import {Payments} from "../paymentManage/payments/payments";
import {SignList} from "../signManage/signList/signList";
import {FaultRepairList} from "../faultRepairManage/faultRepairList/faultRepairList";
import {CleanList} from "../cleanManage/cleanList/cleanList";
import {MailReceive} from "../mailManage/mailReceive/mailReceive";
import {DrawBackList} from "../drawBackManage/drawBackList/drawBackList";
import {CardBindList} from "../cardBindManage/cardBindList/cardBindList";

@Component({
  selector: 'mainHome',
  templateUrl: 'mainHome.html'
})

//todo: 数据
export class MainHome {

  mySlideOptions = {
    pager: true,
    autoplay: 2000,
    initialSlide: 1,
    loop: true,

  };

  constructor(public navCtrl: NavController) {

  }

  onClickItem(pageIndex: number) {

    switch (pageIndex) {
      case 1:
        this.navCtrl.push(AppointManage);
        break;

      case 2:
        this.navCtrl.push(Payments);
        break;

      case 3:
        this.navCtrl.push(SignList);
        break;

      case 4:
        this.navCtrl.push(FaultRepairList);
        break;

      case 5:
        this.navCtrl.push(CleanList);
        break;

      case 6:
        this.navCtrl.push(DrawBackList);
        break;

      case 7:
        this.navCtrl.push(MailReceive);
        break;

      case 8:
        this.navCtrl.push(CleanList);
        break;

      case 9:
        this.navCtrl.push(CardBindList);
        break;

      default:
        break;
    }
  }

}
