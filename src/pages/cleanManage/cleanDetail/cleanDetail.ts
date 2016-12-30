/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {LoadingController, NavParams} from "ionic-angular";
import {Utils} from "../../../services/utils";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {RepairInfo, CleanInfo} from "../../../beans/beans";
@Component({
  selector: 'cleanDetail',
  templateUrl: 'cleanDetail.html'
})
export class CleanDetail implements OnInit {

  public data: CleanInfo;

  constructor(public params: NavParams,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private httpService: ManagerHttpService) {
    this.data = params.get('data');
  }

  ngOnInit() {

    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    loader.dismiss();
  }

  onClickSubmit() {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.saveCleanDetail(this.data).subscribe(() => {
      loader.dismiss();
      
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('提交失败，请重试');
    });
  }

}




