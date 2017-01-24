/**
 * Created by russell on 2016/12/30.
 */
import {Component, OnInit, ElementRef, ViewChild, Renderer} from "@angular/core";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {Utils} from "../../../services/utils";
import {LoadingController, NavController} from "ionic-angular";
@Component({
  selector: 'cardBindForm',
  templateUrl: 'cardBindForm.html'
})
export class CardBindForm implements OnInit {
  @ViewChild('house') ionSelect: ElementRef;

  public formDetail: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private render: Renderer,
              private httpService: ManagerHttpService) {
    this.formDetail = {
      cardNo: '',
      startDate: '2016-01-01T00:00:00+01:00',
      buildingItem: {
        buildingid: '',
        buildingName: ''
      },
      houseItem: {
        houseid: '',
        houseName: ''
      },
      endDate: '2017-01-01T00:00:00+01:00',
      name: '',
      phoneNo: ''
    }
  }

  ngOnInit(): void {
  }

  getSelData() {
    let loader = this.loadingCtrl.create({ content: "正在提交..." });
    loader.present();
    loader.dismiss();
    this.util.showAlertMsg("提交失败，请重试");
  }

  onClickSubmit() {
    let loader = this.loadingCtrl.create({ content: "正在提交..." });
    loader.present();
    loader.dismiss();
    this.util.showAlertMsg("提交失败，请重试");
  }
}
