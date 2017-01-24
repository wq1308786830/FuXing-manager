/**
 * Created by russell on 2016/12/9.
 */
import {Injectable} from "@angular/core";
import {App, Platform} from "ionic-angular";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {
  AccountBean, HouseBean, GarDenStyleBean, AppointBase, AcceptApppoint, HistoryAppoint,
  RepairInfo, MailBaseBean, CleanInfo, RentBillInfo, MoneyPayInfo, HouseSimple, HouseFullInfo, UnRentRefundInfo,
  UnRentInfo
} from "../beans/beans";
import {Observable} from "rxjs/Rx";
import {LoginPage} from "../pages/login/login";


@Injectable()
export class ManagerHttpService {
  static API_HOST: string = "http://joyriver.xicp.net:9999";
  static CONTENT_TYPE_APPLICATION: string = "application/x-www-form-urlencoded;charset=utf-8";

  public token: string;
  public accountInfo: AccountBean;

  constructor(public http: Http, public app: App, public platform: Platform) {
    this.accountInfo = new AccountBean();
    this.token = '';
  }

  public extractData(res: Response) {
    let body = res.json();

    if (body.status === 1) {
      return body.data;
    }

    if (body.status === 10000) {
      throw new Error("请登录");
    } else if (body.status === 0) {
      throw new Error("失败");
    } else if (body.status === 10001) {
      throw new Error("用户未被授权");
    } else if (body.status === 10002) {
      throw new Error("请求参数错误");
    } else {
      throw new Error(body.msg || "error");
    }
  }

  public handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : '服务器错误';

    if (errMsg === "请登录") {
      this.app.getActiveNav().push(LoginPage);
      return null;
    } else {
      return Observable.throw(errMsg);
    }
  }

  /**
   * 基本的post请求
   * @param postUrl
   * @param body
   * @returns {Observable<R>}
   */
  public basePost(postUrl: string, body?: any): Observable<any> {

    let headers = new Headers({'Content-Type': ManagerHttpService.CONTENT_TYPE_APPLICATION});
    let options = new RequestOptions({headers: headers});

    if (!body) {
      body = null;
    }

    return this.http.post(ManagerHttpService.API_HOST + postUrl + '?token=' + this.token, body, options)
      .map(res => {
        return this.extractData(res);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  /**
   * login
   */
  public login(user: any): Observable<string> {
    let body = 'uaccount='+user.uaccount+'&upasswd='+user.upasswd;

    return this.basePost("/auth/login.do", body);
  }

  /**
   * 查看当前物业公司指定园区的户型信息
   * @param gardenid
   * @returns {Observable<any>}
   */
  public gardenListStyle(gardenid?: string): Observable<GarDenStyleBean[]> {

    let body = 'gardenid='+gardenid;

    return gardenid == null ? this.basePost("/garden/liststyle.do", body) : this.basePost("/garden/liststyle.do");
  }

  /**
   * 查看当前物业公司指定园区的房源信息
   * @param gardenid
   * @param buildid
   * @param styleid
   * @returns {Observable<any>}
   */
  public gardenListHouse(gardenid: number, styleid: number): Observable<HouseBean[]> {

    let body = 'gardenid='+gardenid+'&styleid='+styleid;

    return this.basePost("/house/listhouse.do", body);
  }

  /**
   * 预约看房列表
   * @returns {Observable<any>}
   */
  public getAppointList(): Observable<AppointBase[]> {

    return this.basePost("/house/unacptappoints.do");
  }

  /**
   * 接预约看房单
   * @param taskid
   * @returns {Observable<any>}
   */
  public getAcceptAppoint(taskid: string): Observable<any> {

    let body = 'taskid='+taskid;

    return this.basePost("/house/acptappoint.do", body);
  }

  /**
   * 该管家接单后转为待确认状态的预约单
   * @returns {Observable<any>}
   */
  public getAcceptAppointList(): Observable<AcceptApppoint[]> {

    return this.basePost("/house/myacptappoints.do");
  }

  /**
   * 确认或者取消用户的预约
   * @param taskid
   * @param dealContent
   * @param result
   * @returns {Observable<any>}
   */
  public getConfirmAppointById(taskid: string, dealContent: string, result: boolean): Observable<any> {

    let body = 'taskid='+taskid+'&result='+result+'&dealContent='+dealContent;

    return this.basePost("/house/confirmappoint.do", body);
  }

  /**
   * 该管家带看房列表
   * @returns {Observable<any>}
   */
  public getWaitAppointList(): Observable<AppointBase[]> {

    return this.basePost("/house/myseeappoints.do");
  }

  /**
   * 看房结果
   * @param taskid
   * @param seemsg
   * @param seetime
   * @returns {Observable<any>}
   */
  public finishAppointById(taskid: string,  seetime: string, seemsg: string): Observable<any> {

    let body = 'taskid='+taskid+'&seetime='+seetime+'&seemsg='+seemsg+'&seeresult='+true;

    return this.basePost("/house/finishseeappoint.do", body);
  }

  /**
   * 已完成的看房列表
   * @returns {Observable<any>}
   */
  public getAppointedList(): Observable<HistoryAppoint[]> {

    return this.basePost("/house/historyseeappoint.do");
  }

  /**
   * 待维修清单
   * @param pageno
   * @param repaired
   * @returns {Observable<any>}
   */
  public getRepairList(pageno: number, repaired: boolean): Observable<RepairInfo[]> {

    let body = 'pageno='+pageno+'&repaired='+repaired;

    return this.basePost("/repair/list.do", body);
  }

  /**
   * 存储维修单
   * @returns {Observable<any>}
   * @param data
   */
  public saveRepairDetail(data: any): Observable<any> {

    let body = 'id='+data.id+'&price='+data.price+'&repairer='+
      data.repairer+'&repairerphone='+data.repairerphone+'&domsg='+data.domsg;

    return this.basePost("/repair/save.do", body);
  }

  /**
   * 帐单催收
   * @param id
   * @returns {Observable<any>}
   */
  public repairMoneyCall(id: number): Observable<RepairInfo> {

    let body = 'id='+id;

    return this.basePost("/repair/moneycall.do", body);
  }

  /**
   * 待保洁清单
   * @param pageno
   * @param repaired
   * @returns {Observable<any>}
   */
  public getCleanList(pageno: number, repaired: boolean): Observable<CleanInfo[]> {

    let body = 'pageno='+pageno+'&repaired='+repaired;

    return this.basePost("/clean/list.do", body);
  }

  /**
   * 清洁完成
   * @returns {Observable<any>}
   * @param data
   */
  public saveCleanDetail(data: any): Observable<any> {

    let body = 'id='+data.id+'&price='+data.price+'&cleaner='+
      data.cleaner+'&repairerphone='+data.cleanerphone+'&domsg='+data.domsg;

    return this.basePost("/clean/save.do", body);
  }

  /**
   * 帐单催收
   * @param id
   * @returns {Observable<any>}
   */
  public cleanMoneyCall(id: number): Observable<any> {

    let body = 'id='+id;

    return this.basePost("/clean/moneycall.do", body);
  }

  /**
   * 邮件列表
   * @param pageno
   * @param status
   * @returns {Observable<any>}
   */
  public getMailList(pageno: number, status: number): Observable<MailBaseBean[]> {

    let body = 'pageno='+pageno+'&status='+status;

    return this.basePost("/mail/list.do", body);
  }

  /**
   * 接收邮件
   * @param id
   * @param status
   * @returns {Observable<any>}
   */
  public saveMailReceive(id: string, status: number): Observable<any> {

    let body = 'id='+id+'&status='+status;

    return this.basePost("/mail/save.do", body);
  }

  /**
   * 签约单列表
   * @param done
   * @param pageno
   * @returns {Observable<any>}
   */
  public getRentBillList(done: boolean, pageno: number): Observable<HouseSimple[]> {

    let body = 'done='+done+'&pageno='+pageno;

    return this.basePost("/rent/bill.do", body);
  }

  /**
   * 缴费列表
   * @param feetype
   * @param done
   * @param pageno
   * @returns {Observable<any>}
   */
  public getMoneyBillList(feetype: number, done: boolean, pageno: number): Observable<MoneyPayInfo[]> {

    let body = 'feetype='+feetype+'&done='+done+'&pageno='+pageno;

    return this.basePost("/money/bill.do", body);
  }

  /**
   * 缴费单处理，如水费，电费
   * @param billid
   * @returns {Observable<any>}
   */
  public doSaveMoneyBill(billid: string): Observable<any> {

    let body = 'billid='+billid+'&result=1';

    return this.basePost("/money/dobill.do", body);
  }

  /**
   * 查询用户某一项缴费历史
   * @param houseid
   * @param feetype
   * @param done
   * @param pageno
   * @returns {Observable<any>}
   */
  public getPaymentHistoryList(houseid: string, feetype: number, done: boolean, pageno: number): Observable<MoneyPayInfo[]> {

    let body = 'houseid='+houseid+'&feetype='+feetype+'&done='+done+'&pageno='+pageno;

    return this.basePost("/money/bill.do", body);
  }

  /**
   * 查看各房源的详情
   * @param id
   * @returns {Observable<any>}
   */
  public getHouseFullInfo(id: string): Observable<HouseFullInfo> {

    let body = 'id='+id;

    return this.basePost("/house/housefullinfo.do", body);
  }

  /**
   * 与自己相关的退租任务查询
   * @param done
   * @param pageno
   * @returns {Observable<any>}
   */
  public getUnrentList(done: boolean, pageno: number): Observable<UnRentInfo[]> {

    let body = 'done='+done+'&pageno='+pageno;

    return this.basePost("/money/unrentlist.do", body);
  }

  /**
   * 管家的退租确认
   * @returns {Observable<any>}
   * @param data1
   * @param data2
   */
  public saveUnrentDetail(data1: UnRentRefundInfo, data2: UnRentInfo): Observable<any> {

    let body = 'taskid='+data2.taskid+'&netrefund='+data1.netrefund+'&propertyrefund='+
      data1.propertyrefund+'&waterrefund='+data1.waterrefund+'&waternum='+data1.watercount+
      '&electricrefund='+data1.electricrefund+'&electricnum='+data1.electriccount+'&damage='+data1.damage+
      '&totalrefund='+data1.totalrefund+'&pass=true';

    return this.basePost("/money/unrentconfirm.do", body);
  }

  /**
   * 退租价格计算
   * @param data
   * @returns {Observable<any>}
   */
  public getUnrentMoney(data: any): Observable<UnRentRefundInfo> {

    let body = 'taskid='+data.taskid+'&waternum='+data.numWater+'&electricnum='+data.numElectric+'&damage='+data.moneyDamage;

    return this.basePost("/money/unrentmoney.do", body);
  }

}
