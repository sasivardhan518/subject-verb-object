import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGenerationService {

  constructor() { }

  createData(dataCount: number, propsCountInput: number): object[] {
    let totalCount = 1;
    const data: object[] = Array.from({ length: dataCount }, (_, i) => {
      const tempObj = {};
      for (let propsCount = 0; propsCount < propsCountInput; propsCount++) {
        tempObj['prop' + (propsCount + 1)] = 'value' + (totalCount++);
      }
      return tempObj;
    });

    return data;
  }

}
