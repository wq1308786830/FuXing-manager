import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController, Platform} from "ionic-angular";
import {Utils} from "../../services/utils"
import {ManagerHttpService} from "../../services/manager-http-service";
import {AccountBean} from "../../beans/beans";
import {MainHome} from "../mainHome/mainHome";

declare var md5;

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  public user: AccountBean;


  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private httpService: ManagerHttpService) {

    this.user = new AccountBean();

  }

  ngOnInit() {
    let phoneNo = localStorage.getItem("phoneNo");
    if (phoneNo) {
      this.user.uaccount = phoneNo;
    }
  }

  login() {
    if (this.user.uaccount && this.user.upasswd) {

      let loader = this.loadingCtrl.create({content: "登录中..."});
      loader.present();

      this.httpService.login(this.user).subscribe(info => {

        if (info) {
          localStorage.setItem("phoneNo", this.user.uaccount);
          this.httpService.token = info;
          this.navCtrl.push(MainHome);
        }
        loader.dismiss();

      }, error => {
        loader.dismiss();
        this.navCtrl.push(MainHome);
        if (error === "ErrorPassword") {
          this.util.showAlertMsg('您输入的用户名和密码不匹配，请重新输入.');
        } else {
          this.util.showAlertMsg('网络连接出现错误，请稍后再试.');
        }
      });

    } else {
      this.util.showAlertMsg('用户名和密码不能为空.');
    }
  }

}
