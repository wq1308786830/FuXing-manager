/**
 * Created by russell on 2017/1/3.
 */
import {Component, OnInit, ViewChild} from "@angular/core";
import {Ng2Echart} from "../../../components/ng2-echart";
import {LoadingController, Platform, NavController} from "ionic-angular";
import {ManagerHttpService} from "../../../services/manager-http-service";
import {DropdownController} from "../../../components/dropdown/dropdown";
import {Utils} from "../../../services/utils";
@Component({
  selector: 'financeChart',
  templateUrl: 'financeChart.html'
})
export class FinanceChart implements OnInit {

  eChartOptions: any;
  eChartOptionsSecurity: any;
  eChartOptionsWeigui: any;

  public curDepartmentId: string;
  public curDateType: number;
  public startDayStr: string;
  public endDayStr: string;
  public incomeType: string;

  @ViewChild('operationchart') operationEchart: Ng2Echart;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public loadingCtrl: LoadingController,
              public httpService: ManagerHttpService,
              public util: Utils,
              public dropdownCtrl: DropdownController) {
    this.curDateType = 1;
  }

  ngOnInit(): void {

    this.eChartOptions = {
      title: {}, tooltip: {}, toolbox: { show: false }, legend: { data: ["完成班次"] },
      xAxis: { time: [] }, yAxis: {},
      series: [{ name: "完成班次", type: "bar", data: [] }],
      dataZoom: [{type: 'inside', start: 0, end: 100}]
    };
  }

  updateDataAndRefresh() {

  }

  /**
   * This function will be called when the user selected a date
   */
  datePickRes(date: any) {
    if (date.type === 'cumtom') {
      this.curDateType = 2;
      this.startDayStr = this.util.getDayTimeStr(date.start,);
      this.endDayStr = this.util.getDayTimeStr(date.end);
      this.updateDataAndRefresh();
    } else if (date.type === 'month') {
      this.curDateType = 1;
      this.endDayStr = this.util.getDayTimeStr(date.month);
      this.updateDataAndRefresh();
    } else if (date.type === 'year') {
      this.curDateType = 0;
      this.endDayStr = this.util.getDayTimeStr(date.year);
      this.updateDataAndRefresh();
    }
  }

}
