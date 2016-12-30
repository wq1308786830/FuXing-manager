/**
 * Created by russell on 2016/12/9.
 */
export class AccountBean {
  uaccount: string;                //账号             //用户名
  upasswd: string;               //密码
  name: string;                   //姓名
  type: string;                   //权限
  accountCode: string;            //
  id: string;                     //号
}

export class GarDenStyleBean {
  gid: number;           //园区ID
  gname: string;          //园区名称
  id: number;            //户型ID
  name: string;           //户型名称
  imgurl: string;            //户型图片地址
  description: string;    //户型说明
  area: number;           //户型面积
  rent: number;           //单价
  rent_unit: number;           //计价单位
  decoration: string;       //装修
  towards: string;        //朝向
}

export class HouseBean {
  bid: number;            //楼号
  bname: number;            //楼号名
  createtime: string;
  status: number;
  pmanMgr: number;        //物业管家ID
  pmanMgrName: string;      //物业管家姓名
  floor: number;
  unit: number;
  name: string;           //户号
  renterManID: number;      //租户id
  renterManName: string;    //租户姓名
  style: GarDenStyleBean;
}

export class ChargeDetailBean {
  uname: string;
  phone: number;
  uaccount: string;
  time: string;
  money: number;
}

export class AppointBase {
  taskid: string;      //工作流中的任务编号
  makerusrid: number;  //创客UID
  appointdt: string;   //创额期望时间
  phone: string;
  makername: string;   //创客姓名
  housestylename: string; //户型名称
  housestyle: number;     //户型ID
  butlerid: number;        //管家ID
}

export class AcceptApppoint {
  taskid: string;      //工作流中的任务编号
  makerusrid: number;  //创客UID
  appointdt: string;   //创额期望时间
  phone: string;
  makername: string;   //创客姓名
  housestylename: string; //户型名称
  housestyle: number;     //户型ID
  butlerid: number;        //管家ID
  acptime: string;        //接收时间
}

export class HistoryAppoint {
  taskid: string;      //工作流中的任务编号
  makerusrid: number;  //创客UID
  appointdt: string;   //创额期望时间
  phone: string;
  makername: string;   //创客姓名
  housestylename: string; //户型名称
  housestyle: number;     //户型ID
  butlerid: number;        //管家ID
  seemsg: string;
  seeresult: boolean;
}

export class RepairInfo {
  id: number;
  repairmsg: string;
  needrepairtime: string;
  house: string;
  phone: string;
  name: string;
  inhome: boolean;
  img: string;                 //报修配图
  price: number;               //维修报价
  repairer: string;            //维修工
  repairerphone: string;       //维修工电话
  domsg: string;               //维修处理意见
  moneyok: boolean;             //是否付费
}

export class CleanInfo {
  id: number;
  cleanmsg: string;
  needcleantime: string;
  house: string;
  phone: string;
  name: string;
  inhome;
  img: string;                 //保洁配图
  price: number;               //保洁报价
  cleaner: string;            //保洁工
  cleanerphone: string;       //保洁工电话
  domsg: string;               //保洁处理意见
  moneyok: boolean;             //是否付费
}

export class MailBaseBean {
  id: number;
  mailno: string;         //快递单号
  mailcom: string;        //快递公司
  status: number;        //状态0未到达   1到达    2签收
  arrivedtime: string;   //到达时间
  signedtime: string;    //签收时间
  mphone: string;    //签收时间
  mname: string;    //签收时间
  mhouse: string;    //签收时间
}
