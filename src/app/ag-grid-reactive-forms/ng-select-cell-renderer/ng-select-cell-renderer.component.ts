import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp, ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-ng-select-cell-renderer',
  templateUrl: './ng-select-cell-renderer.component.html',
  styleUrls: ['./ng-select-cell-renderer.component.css']
})
export class NgSelectCellRendererComponent implements ICellRendererAngularComp {
  list: string[];
  formCellGroup: FormGroup;
  params: ICellRendererParams;
  formControlKey: string;
  selectedListValue: string;
  rules = [
    'none1',
    'specifier',
    'subject',
    'none2',
    'verb',
    'none3',
    'object',
    'none4'
  ];
  constructor() { }

  agInit(params: ICellRendererParams) {
    this.params = params;
    this.list = ['specifier', 'subject', 'verb', 'object', 'none'];
    this.formControlKey = params.colDef.field;
    this.selectedListValue = this.params.value;
  }

  refresh(params: any) {
    this.formCellGroup = params.context.gridForm.controls.data.controls[params.rowIndex];
    this.formCellGroup.controls[params.column.colDef.field].patchValue(this.selectedListValue);
    return true;
  }

  getOptions() {
    const data = [];
    this.params.api.forEachNode(node => data.push(node.data.prop2));
    const options = this.optionsToShow(this.params.node.rowIndex, data);
    const list = this.rules.slice(this.rules.indexOf(options.from), this.rules.indexOf(options.to) + 1);
    this.list = _.uniq(_.map(list, item => {
      if (item.indexOf('none') > -1) {
        return 'none';
      } else {
        return item;
      }
    }));
  }


  optionsToShow(index, data) {
    let array = JSON.parse(JSON.stringify(data));
    array[index] = null;
    const tempObj: any = {};
    array = this.removeConsecutiveUniqueVals(array);
    const valIndex = _.indexOf(array, null);
    let ruleIndex;
    let modifiedRules;
    if (array[valIndex - 1]) {
      if (array[valIndex - 1] === 'none') {
        if (array[valIndex - 2]) {
          ruleIndex = this.rules.indexOf(array[valIndex - 2]);
          modifiedRules = Object.assign([], this.rules).reverse().slice(0, this.rules.length - ruleIndex).reverse();
          for (const modifiedRuleVal1 of modifiedRules) {
            if (modifiedRuleVal1.indexOf('none') > -1) {
              tempObj.from = modifiedRuleVal1;
              break;
            }
          }
        } else {
          tempObj.from = this.rules[0];
        }
      } else {
        tempObj.from = array[valIndex - 1];
      }
    } else {
      tempObj.from = this.rules[0];
    }

    if (array[valIndex + 1]) {
      if (array[valIndex + 1] === 'none') {
        if (array[valIndex + 2]) {
          ruleIndex = this.rules.indexOf(array[valIndex + 2]);
          modifiedRules = Object.assign([], this.rules).slice(0, ruleIndex).reverse();
          for (const modifiedRuleVal of modifiedRules) {
            if (modifiedRuleVal.indexOf('none') > -1) {
              tempObj.to = modifiedRuleVal;
              break;
            }
          }
        } else {
          tempObj.to = this.rules[this.rules.length - 1];
        }
      } else {
        tempObj.to = array[valIndex + 1];
      }
    } else {
      tempObj.to = this.rules[this.rules.length - 1];
    }

    return tempObj;
  }

  removeConsecutiveUniqueVals(data) {
    const tempArr = [];
    for (const val of data) {
      if (tempArr[tempArr.length - 1] !== val) {
        tempArr.push(val);
      }
    }
    return tempArr;
  }

}
