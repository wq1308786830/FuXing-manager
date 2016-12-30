/**
 * Created by russell on 2016/12/29.
 */
import {Component, OnInit} from "@angular/core";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
import {NavController, LoadingController} from "ionic-angular";
@Component({
  selector: 'drawBackDetail',
  templateUrl: 'drawBackDetail.html'
})
export class DrawBackDetail implements OnInit {

  constructor(public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              public util: Utils,
              private httpService: ManagerHttpService) {

  }

  ngOnInit(): void {
    let loader = this.loadingCtrl.create({ content: "正在加载..." });
    loader.present();
    loader.dismiss();
    this.util.showAlertMsg("获取数据失败，请重试");
  }

  onClickSubmit() {
    let loader = this.loadingCtrl.create({ content: "正在提交..." });
    loader.present();
    loader.dismiss();
    this.navCtrl.pop();
    this.util.showAlertMsg("提交失败，请重试");
  }

}
