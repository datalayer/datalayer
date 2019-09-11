import * as underscore from 'underscore'

export default class TableData {

  columns: any[]
  columnNames: any[]
  rows: any[]
  comment: string

  constructor(columns?, columnNames?, rows?, comment?) {
    this.columns = columns || []
    this.columnNames = columnNames || []
    this.rows = rows || []
    this.comment = comment || ''
  };

  loadParagraphDisplay(paragraphResult) {

    if (!paragraphResult || paragraphResult.type !== 'TABLE') {
      console.log('Can not load paragraph result.')
      return
    }

    let columns: Array<{name: string, index: number, aggr: string}> = []
    let columnNames = []
    let rows = [];
    let array = [];
    let textRows = paragraphResult.msg.split('\n');
    let comment = '';
    let commentRow = false;

    for (let i = 0; i < textRows.length; i++) {

      let textRow = textRows[i];

      if (commentRow) {
        comment += textRow;
        continue;
      }

      if (textRow === '' || textRow === '<!--TABLE_COMMENT-->') {
        if (rows.length > 0) {
          commentRow = true;
        }
        continue;
      }
      let textCols = textRow.split('\t');
      let cols = [];
      let cols2 = [];
      for (let j = 0; j < textCols.length; j++) {
        let col = textCols[j];
        if (i === 0) {
          columns.push({name: col, index: j, aggr: 'sum'});
        } else {
//          cols.push(col as any);
//          cols2.push({key: (columns[i]) ? columns[i].name : undefined, value: col});
        }
      }
      if (i !== 0) {
//        rows.push(cols);
//        array.push(cols2);
      }
    }

    columnNames = underscore.pluck(columns, 'name')

    this.comment = comment;
    this.columns = columns;
    this.columnNames = columnNames;
    this.rows = rows;

  }

}
