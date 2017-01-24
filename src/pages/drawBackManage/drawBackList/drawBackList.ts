/**
 * Created by russell on 2016/12/29.
 */
import {Component, OnInit} from "@angular/core";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
import {LoadingController, NavController} from "ionic-angular";
import {DrawBackDetail} from "../drawBackDetail/drawBackDetail";
import {UnRentInfo} from "../../../beans/beans";
@Component({
  selector: 'drawBackList',
  templateUrl: 'drawBackList.html'
})
export class DrawBackList implements OnInit {

  drawBack = 'waitDeal';

  public unrentList: UnRentInfo[];
  public currPage1: number;
  public currPage2: number;

  constructor(public loadingCtrl: LoadingController,
              public navCtrl: NavController,
              public util: Utils,
              private httpService: ManagerHttpService) {
    this.unrentList = [];
    this.currPage1 = 1;
    this.currPage2 = 1;
  }

  ngOnInit(): void {
    this.segmentChanged();
  }

  /**
   * 处理退租
   */
  goDealDrawBack(data: UnRentInfo) {
    this.navCtrl.push(DrawBackDetail, {data: data, read: false});
  }

  goDetailDrawBack(data: UnRentInfo) {
    this.navCtrl.push(DrawBackDetail, {data: data, read: true});
  }

  getSegmentData(done: boolean, pageno: number) {
    let loader = this.loadingCtrl.create({content: "正在加载..."});
    loader.present();
    this.httpService.getUnrentList(done, pageno).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.unrentList = data;
      }
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

  getInfiniteData(ev, done: boolean, pageno: number) {
    this.httpService.getUnrentList(done, pageno).subscribe(data => {
      if (data) {
        this.unrentList = this.unrentList.concat(data);
      }
      ev.complete();
    }, err => {
      ev.complete();
    });
  }

  /**
   * tab切换加载对应数据
   */
  segmentChanged() {
    this.unrentList = [];
    this.currPage1 = 1;
    this.currPage2 = 1;
    switch (this.drawBack) {
      case 'waitDeal':
        this.getSegmentData(false, 1);
        break;

      case 'dealt':
        this.getSegmentData(true, 1);
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
        this.getInfiniteData(ev, false, ++this.currPage1);
        break;

      case 'dealt':
        this.getInfiniteData(ev, true, ++this.currPage2);
        break;

      default:
        ev.complete();
        break;
    }
  }

}
