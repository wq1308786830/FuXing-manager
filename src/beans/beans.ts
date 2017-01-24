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
  price: string;               //维修报价
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
  price: string;               //保洁报价
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

export class RentBillInfo {
  id: string;    //单号
  styleid: string;   //户型
  stylename: string;
  houseid: string;   //房源
  housename: string;
  makerid: string;   //创客
  makername: string;
  makerphone: string;
  createtime: string;  //创建日期
  paytime: string;   //付费日期
  paytransid: string;  //付费单号
  totalmoney: number;  //付费总金额
  houseprice: number;  //房租单价
  furnitureprice: number; //家具单介
  rentcount: number;  //租用的单位数
  rentstart: string;//预计的起租时间
  rentend: string;  //预计的终租时间
  furtures: SimpleFurniture[]; //房间的家具详情
}

export class MoneyPayInfo {
  billid: string;
  makerid: string;
  makername: string;
  houseid: string;
  housename: string;
  feetype: number;
  feetypename: string;
  money: number;
  unit_count: number;
  unit_price: number;
  unit_name: string;
  paysucc: boolean;
  create_time: string;
  result_time: string;
  start_time: string; // 此次计费的有效期
  end_time: string;
  start_num: string;
  end_num: string; // 此次计费的有效数值段
}

export class HouseSimple {
  id: string;         //房号ID
  name: string;     //房号名称
  endtime: string;  //租期结束时间，已租房源查询时有效
}

export class HouseFullInfo {
  houseid: string;
  housename: string;
  rentstart: string;  //租期始
  rentend: string;   //租期终
  rentinfo: HouseRentInfo[]; //租期记录
  style: HouseStyleInfo;   //户型
  maker: HouseMakerInfo; //创客
}

export class SimpleFurniture{
  id: string;
  name: string;
  rentPrice: number;
  needRent: boolean;   //是否标配家具
  count: number;
  rented: boolean;    //是否选择租用
}

export class HouseRentInfo {
  houseid: string; // 房号ID
  housename: string; // 房号名称
  rentprice: number; // 租金
  rentunitname: string; // 计价单位
  deposit: number; // 押金
  rentstart: string; // 租期始
  rentend: string; // 租期终
  createtime: string; // 创建时间
  standarFurnitrues: TblFurnitureExBean[];  //家具
  optionalFurnitrues: TblFurnitureExBean[];  //家具
}

export class TblFurnitureExBean {
  id: string;          //家具ID
  name: string;      //家具名称
  rentPrice: number;  //租金
  rentPriceUnit: number;
  rentUnitName: string;  //计价单位
  damagePrice: number;     //损毁的赔偿金
  price: number;           //家具原价
  deposit: number;         //家具需要的押金
  choosed: boolean;
}

export class HouseToRentInfo {
  id: string;            //房号ID
  name: string;           //房号名称
  rentPrice: number;      //租金
  rentUnitName: string;   //计价单位
  deposit: number;   //押金
  standarFurnitrues: TblFurnitureExBean[];  //标配家具
  optionalFurnitrues: TblFurnitureExBean[]; //选配家具

}

export class HouseStyle {
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

export class HouseStyleInfo {
  gid: string;
  gname: string;
  id: string;
  name: string;
  imgurl: string;
  description: string;
  area: number;
  decoration: string;  //装修
  towards: string;   //朝向
  rent_unit_price: number;
  rent_unit_name: string;
  water_unit_price: number;
  water_unit_name: string;
  electric_unit_price: number;
  electric_unit_name: string;
  net_unit_price: number;
  net_unit_name: string;
  property_unit_price: number;
  property_unit_name: string;
  deposit: number;
}

export class HouseMakerInfo {
  id: string;
  name: string;
  nick: string;
  gender: boolean;
  idCardType: number;
  idCardNo: string;
  birthday: string;
  age: number;
  telPhone: string;
  mobiPhone: string;
  account: string;
  houseid: string;
  contractid: string;
}

export class UnRentInfo {
  id: string;
  rentId: string;
  houseName: string;
  houseId: string;
  makerPhone: string;
  makerName: string;
  makerId: string;
  butlerId: string;
  endHouseTime: string;
  endNetTime: string;
  endPropertyTime: string;
  countHouseMonths: number;
  countNetMonths: number;
  countPropertyMonths: number;
  countWaterNum: number;
  countElectricNum: number;
  priceHouse: number;
  priceNet: number;
  priceProperty: number;
  priceWater: number;
  priceElectric: number;
  unrentTime: string;
  bankCardno: string;
  bankName: string;
  bankUsrName: string;
  bankUsrIdcard: string;
  moneyDeposit: number;
  moneyHouseRefund: number;
  moneyNetRefund: number;
  moneyPropertyRefund: number;
  moneyWaterRefund: number;
  moneyElectricRefund: number;
  moneyDamage: number;
  moneyTotlaRefund: number;
  refundBankNo: string;
  numWater: number;
  numElectric: number;
  msg: string;
  status: number;
  createTime: string;
  lastUpdateTime: string;
  activitiProcId: string;
  taskid: string;
}

export class UnRentRefundInfo {
  houserefund: number;
  houseprice: number;
  housecount: number;

  housedeposit: number;       //押金

  netrefund: number;
  netprice: number;
  netcount: number;

  propertyrefund: number;
  propertyprice: number;
  propertycount: number;

  waterrefund: number;
  waterprice: number;
  watercount: number;

  electricrefund: number;
  electricprice: number;
  electriccount: number;

  damage: number;

  totalrefund: number;
}
