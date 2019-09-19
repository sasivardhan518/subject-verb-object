import { DataGenerationService } from './../Shared/data-generation.service';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridOptions, RowNode, ColumnApi, Column } from 'ag-grid-community';
import { TextCellRendererComponent } from './text-cell-renderer/text-cell-renderer.component';
import { NgSelectCellRendererComponent } from './ng-select-cell-renderer/ng-select-cell-renderer.component';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ag-grid-reactive-forms',
  templateUrl: './ag-grid-reactive-forms.component.html',
  styleUrls: ['./ag-grid-reactive-forms.component.css']
})
export class AgGridReactiveFormsComponent implements OnInit {
  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  gridOptions: GridOptions;
  gridForm: FormGroup;
  private gridApi: GridApi;
  private columnApi: ColumnApi;
  constructor(private dataGenerationService: DataGenerationService) { }

  ngOnInit() {
    this.gridForm = new FormGroup({});
    this.rowData = [{ prop2: null }];
    this.preparfeColumnDefs();
    this.prepareGridOptions();
  }

  preparfeColumnDefs() {
    this.columnDefs = [
      {
        headerName: 'ACTIONS',
        cellRendererFramework: TextCellRendererComponent,
      },
      {
        field: 'prop2',
        headerName: 'PROP2',
        cellRendererFramework: NgSelectCellRendererComponent
      }
    ];
  }

  prepareGridOptions() {
    this.gridOptions = {
      rowHeight: 45,
      onBodyScroll: this.refreshFormControls.bind(this),
      rowBuffer: 15000
    };
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    // this.refreshFormControls();
  }

  private refreshFormControls() {
    if (this.gridApi) {
      this.createFormControls();
      this.gridApi.refreshCells({ force: true });
    }
  }

  createFormControls() {
    const allColumns = this.columnApi.getAllColumns();
    const dataArray = new FormArray([]);
    // this.gridApi.forEachNode((rowNode: RowNode, index: number) => {
    this.rowData.forEach((record, index) => {
      const tempFormGroup = new FormGroup({});
      allColumns.forEach((column: Column) => {
        tempFormGroup.setControl(column.getColDef().field, new FormControl());
      });
      dataArray.push(tempFormGroup);
    });
    this.gridForm.removeControl('data');
    this.gridForm.addControl('data', dataArray);
  }

  getContext() {
    return {
      gridForm: this.gridForm,
      rowData: this.rowData
    };
  }

  onSubmit() {
    // console.dir(this.gridForm.value);
    console.log(this.rowData);

    this.gridApi.forEachNode((rowNode: RowNode, rowIndex: number) => {
      console.log(rowNode.data);
    });
  }

}
