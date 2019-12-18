export function convertArrayOfObjectsToCSV(args) {  
  let result, ctr, keys, columnDelimiter, lineDelimiter, data;
  data = args.data || null
  if (data == null || !data.length) {
      return null
  }
  columnDelimiter = args.columnDelimiter || ','
  lineDelimiter = args.lineDelimiter || '\n'
  keys = Object.keys(data[0])
  result = ''
  result += keys.join(columnDelimiter)
  result += lineDelimiter
  data.forEach(function(item) {
      ctr = 0
      keys.forEach(function(key) {
          if (ctr > 0) result += columnDelimiter
          result += item[key]
          ctr++
      });
      result += lineDelimiter
  })
  return result
}

export function downloadCSV(args) {
  let csv = this.convertArrayOfObjectsToCSV({
      data: args.items
  })
  if (csv == null) return
  let filename = args.filename || 'data.csv'
  if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=UTF-8,' + csv
  }
  let data = encodeURI(csv)
  let link = document.createElement('a')
  link.setAttribute('href', data)
  link.setAttribute('download', filename)
  let preloader = document.getElementById('preloader')
  if (preloader != null) {
    preloader.appendChild(link)
  }
  link.click()
}

export function downloadJSON(args) {
    let json = encodeURIComponent(JSON.stringify(args.json))
    let filename = args.filename || 'data.csv'
    if (!json.match(/^data:json/i)) {
        json = 'data:text/csv;charset=UTF-8,' + json
    }
    let link = document.createElement('a')
    link.setAttribute('href', json)
    link.setAttribute('download', filename)
    let preloader = document.getElementById('preloader')
    if (preloader != null) {
      preloader.appendChild(link)
    }
    link.click()
  }
  