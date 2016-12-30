/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
import {MailBaseBean} from "../../../beans/beans";
import {MailDetail} from "../mailDetail/mailDetail";
@Component({
  selector: 'mailReceive',
  templateUrl: 'mailReceive.html'
})
export class MailReceive implements OnInit {

  receiveTag = 'waitArrive';

  public statusFlag: boolean;
  public idList: string;

  public waitArriveList: MailBaseBean[];
  public arrivedList: MailBaseBean[];
  public receivedList: MailBaseBean[];
  public curPage1: number;
  public curPage2: number;
  public curPage3: number;

  private static WAIT_ARRIVE = 0; //未到达
  private static ARRIVED = 1; //已到达
  private static RECEIVED = 2;  //已签收

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private httpService: ManagerHttpService) {
    this.statusFlag = false;
    this.idList = '';
    this.waitArriveList = [];
    this.arrivedList = [];
    this.receivedList = [];
    this.curPage1 = 0;
    this.curPage2 = 0;
    this.curPage3 = 0;
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getMailList(0, MailReceive.WAIT_ARRIVE).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.waitArriveList = data;
      }
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('获取数据失败，请重试');
    });
  }

  /**
   * 详情
   */
  mailDetail(data: MailBaseBean) {
    this.navCtrl.push(MailDetail, {data: data});
  }

  /**
   * 提交
   */
  onClickSubmit() {

    let loader = this.loadingCtrl.create({content: "操作中..."});
    loader.present();

    switch (this.receiveTag) {
      case 'waitArrive':
        this.httpService.saveMailReceive(this.idList, 1).subscribe(data => {
          loader.dismiss();
          this.waitArriveList = data;
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg('提交失败，请重试');
        });
        break;

      case 'arrived':
        this.httpService.saveMailReceive(this.idList, 2).subscribe(data => {
          loader.dismiss();
          this.arrivedList = data;
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg('提交失败，请重试');
        });
        break;

      default:
        break;
    }
  }

  /**
   * segment tab项切换监听
   */
  segmentChanged() {

    this.idList = '';
    let loader;

    switch (this.receiveTag) {
      case 'waitArrive':
        loader = this.loadingCtrl.create({content: "加载中..."});
        loader.present();
        this.httpService.getMailList(0, MailReceive.WAIT_ARRIVE).subscribe(data => {
          loader.dismiss();
          if (data) {
            this.waitArriveList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg('获取数据失败，请重试');
        });
        break;

      case 'arrived':
        loader = this.loadingCtrl.create({content: "加载中..."});
        loader.present();
        this.httpService.getMailList(0, MailReceive.ARRIVED).subscribe(data => {
          loader.dismiss();
          if (data) {
            this.waitArriveList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg('获取数据失败，请重试');
        });
        break;

      case 'received':
        loader = this.loadingCtrl.create({content: "加载中..."});
        loader.present();
        this.httpService.getMailList(0, MailReceive.RECEIVED).subscribe(data => {
          loader.dismiss();
          if (data) {
            this.waitArriveList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg('获取数据失败，请重试');
        });
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
    switch (this.receiveTag) {
      case 'waitArrive':
        this.httpService.getMailList(++this.curPage1, MailReceive.WAIT_ARRIVE).subscribe(data => {
          ev.complete();
          if (data) {
            this.waitArriveList = data;
          }
        }, err => {
          ev.complete();
        });
        break;

      case 'arrived':
        this.httpService.getMailList(++this.curPage2, MailReceive.ARRIVED).subscribe(data => {
          ev.complete();
          if (data) {
            this.arrivedList = data;
          }
        }, err => {
          ev.complete();
        });
        break;

      case 'received':
        this.httpService.getMailList(++this.curPage2, MailReceive.RECEIVED).subscribe(data => {
          ev.complete();
          if (data) {
            this.arrivedList = data;
          }
        }, err => {
          ev.complete();
        });
        break;

      default:
        break;
    }
  }

  /**
   * 操作idList（需要提交的id组合成一个字符串用逗号间隔）
   * @param id
   */
  checkedItem(id: number) {

    if (this.idList.indexOf('' + id) == 0) {
      this.idList = this.idList.replace(new RegExp(id + ','), '');
    } else if (this.idList.indexOf('' + id) > 0) {
      this.idList = this.idList.replace(new RegExp(',' + id), '');
    } else {
      if (this.idList.length) {
        this.idList += ',' + id;
      } else {
        this.idList += '' + id;
      }
    }
  }

}




