/**
 * Created by russell on 2016/12/29.
 */
import {Component, OnInit} from "@angular/core";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
import {LoadingController, NavController} from "ionic-angular";
import {DrawBackDetail} from "../drawBackDetail/drawBackDetail";
@Component({
  selector: 'drawBackList',
  templateUrl: 'drawBackList.html'
})
export class DrawBackList implements OnInit {

  drawBack = 'waitDeal';

  constructor(public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              public util: Utils,
              private httpService: ManagerHttpService) {

  }

  ngOnInit(): void {
  }

  /**
   * 处理退租
   */
  goDealDrawBack() {
    this.navCtrl.push(DrawBackDetail);
  }

  onClickSubmit() {
    let loader = this.loadingCtrl.create({ content: "正在加载..." });
    loader.present();
    loader.dismiss();
  }

  /**
   * tab切换加载对应数据
   */
  segmentChanged() {

    let loader;

    switch (this.drawBack) {
      case 'waitDeal':
        loader = this.loadingCtrl.create({ content: "正在加载..." });
        loader.present();
        loader.dismiss();
        this.util.showAlertMsg("获取数据失败，请重试");
        break;

      case 'dealt':
        loader = this.loadingCtrl.create({ content: "正在加载..." });
        loader.present();
        loader.dismiss();
        this.util.showAlertMsg("获取数据失败，请重试");
        break;

      default:
        break;
    }
  }

  /**
   * 无限加载
   * @param ev
   */
  doInfinite(ev) {
    switch (this.drawBack) {
      case 'waitDeal':
        ev.complete();
        break;

      case 'dealt':
        ev.complete();
        break;

      default:
        break;
    }
  }

}
