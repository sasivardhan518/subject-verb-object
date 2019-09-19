import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import * as _ from 'lodash';

@Component({
  selector: 'app-text-cell-renderer',
  templateUrl: './text-cell-renderer.component.html',
  styleUrls: ['./text-cell-renderer.component.css']
})
export class TextCellRendererComponent implements ICellRendererAngularComp {
  formCellGroup: FormGroup;
  params: ICellRendererParams;
  value: string;
  formControlKey: string;
  constructor() { }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.value = params.value;
    this.formControlKey = params.colDef.field;
  }

  refresh(params: any): boolean {
    this.formCellGroup = params.context.gridForm.controls.data.controls[params.rowIndex];
    this.formCellGroup.controls[params.column.colDef.field].patchValue(this.value);
    return true;
  }

  addRow() {
    this.params.api.updateRowData({ add: [{ prop2: null }], addIndex: this.params.rowIndex + 1 });
  }

  copyRow() {
    this.params.api.updateRowData({ add: [_.cloneDeep(this.params.node.data)], addIndex: this.params.rowIndex + 1 });
  }

  deleteRow() {
    this.params.api.updateRowData({ remove: [this.params.node.data] });
  }

}
