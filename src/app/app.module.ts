import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {LoginPage} from "../pages/login/login";
import {Utils} from "../services/utils";
import {ManagerHttpService} from "../services/manager-http-service";
import {MainHome} from "../pages/mainHome/mainHome";
import {AppointManage} from "../pages/appointManage/appointManage";
import {DealAppointModal} from "../pages/appointManage/dealAppointModal";
import {Payments} from "../pages/paymentManage/payments/payments";
import {ChargeDetail} from "../pages/paymentManage/chargeDetail/chargeDetail";
import {ChargeList} from "../pages/paymentManage/chargeList/chargeList";
import {HouseDetail} from "../pages/signManage/houseDetail/houseDetail";
import {SignList} from "../pages/signManage/signList/signList";
import {RoomCosts} from "../pages/signManage/roomCosts/roomCosts";
import {FaultRepairDetail} from "../pages/faultRepairManage/faultRepairDetail/faultRepairDetail";
import {FaultRepairList} from "../pages/faultRepairManage/faultRepairList/faultRepairList";
import {EnsureAppointModal} from "../pages/appointManage/ensureAppointModal";
import {CleanDetail} from "../pages/cleanManage/cleanDetail/cleanDetail";
import {CleanList} from "../pages/cleanManage/cleanList/cleanList";
import {MailReceive} from "../pages/mailManage/mailReceive/mailReceive";
import {MailDetail} from "../pages/mailManage/mailDetail/mailDetail";
import {DrawBackList} from "../pages/drawBackManage/drawBackList/drawBackList";
import {DrawBackDetail} from "../pages/drawBackManage/drawBackDetail/drawBackDetail";
import {CardBindList} from "../pages/cardBindManage/cardBindList/cardBindList";
import {CardBindForm} from "../pages/cardBindManage/cardBindForm/cardBindForm";
import {FinanceChart} from "../pages/financeManage/financeChart/financeChart";
import {Ng2DateSelect} from "../components/ng2-dateselect/ng2-dateselect";
import {Ng2DatePicker} from "../components/ng2-datepicker/ng2-datepicker";
import {DropdownCom} from "../components/dropdown/dropdown-component";
import {Ng2Echart} from "../components/ng2-echart";
import {DropdownController} from "../components/dropdown/dropdown";

@NgModule({
  declarations: [
    MyApp,
    Ng2Echart,
    DropdownCom,
    Ng2DatePicker,
    Ng2DateSelect,

    //commom
    LoginPage,

    //home
    MainHome,

    //appointment manege
    AppointManage,
    EnsureAppointModal,
    DealAppointModal,

    //payment manage
    Payments,
    ChargeDetail,
    ChargeList,
    HouseDetail,

    //sign manage
    SignList,
    RoomCosts,
    HouseDetail,

    //repair
    FaultRepairDetail,
    FaultRepairList,

    //clean
    CleanDetail,
    CleanList,

    //mail
    MailDetail,
    MailReceive,

    //draw back
    DrawBackList,
    DrawBackDetail,

    //card bind
    CardBindList,
    CardBindForm,

    //finance
    FinanceChart
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      mode: "ios",
      backButtonText: "",
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Ng2Echart,
    DropdownCom,
    Ng2DatePicker,
    Ng2DateSelect,

    //commom
    LoginPage,

    //home
    MainHome,

    //appointment manege
    AppointManage,
    EnsureAppointModal,
    DealAppointModal,

    //payment manage
    Payments,
    ChargeDetail,
    ChargeList,
    HouseDetail,

    //sign manage
    SignList,
    RoomCosts,
    HouseDetail,

    //repair
    FaultRepairDetail,
    FaultRepairList,

    //clean
    CleanDetail,
    CleanList,

    //mail
    MailDetail,
    MailReceive,

    //draw back
    DrawBackList,
    DrawBackDetail,

    //card bind
    CardBindList,
    CardBindForm,

    //finance
    FinanceChart
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    Utils, ManagerHttpService, DropdownController]
})
export class AppModule {
}
