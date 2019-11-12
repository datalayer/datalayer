import * as React from 'react'
import * as moment from 'moment'
import 'moment-duration-format'

export const ParagraphStatus = {
  READY:    'READY',
  PENDING:  'PENDING',
  RUNNING:  'RUNNING',
  FINISHED: 'FINISHED',
  ABORT:    'ABORT',
  ERROR:    'ERROR'
}

// export interface IDuration extends moment.Duration {
//   format(template:string): string;
// }

export let isParagraphRunning = (paragraph) => {
  if (!paragraph) return false
  let status = paragraph.status
  if (!status) return false
  return status === ParagraphStatus.PENDING || status === ParagraphStatus.RUNNING
}  

export let getExecutionMessage = function (paragraph) {
//  let momentDurationFormatSetup = require("moment-duration-format")
  const end = paragraph.dateFinished
  const start = paragraph.dateStarted
  let timeMs = Date.parse(end) - Date.parse(start)
  if (isNaN(timeMs) || timeMs < 0) {
    if (isResultOutdated(paragraph)) {
      return <div>'outdated'</div>
    }
    return <div></div>
  }
  const durationFormat = (moment.duration((timeMs / 1000), 'seconds') as any).format('h [hrs] m [min] s [sec]')
  const endFormat = moment(paragraph.dateFinished).format('MMMM DD YYYY, h:mm:ss A')
  let user = (paragraph.user === undefined || paragraph.user === null) ? 'anonymous' : paragraph.user
  let desc = `Took ${durationFormat}. Last updated by ${user} at ${endFormat}.`
  if (isResultOutdated(paragraph)) { desc += ' (outdated)' }
  return <div>{desc}</div>
}

export let getElapsedTime = function (paragraph) {
  return <div>{'Started ' + moment(paragraph.dateStarted).fromNow() + '.'}</div>
}

export let isResultOutdated = function (paragraph) {
  if (paragraph.dateUpdated !== undefined && Date.parse(paragraph.dateUpdated) > Date.parse(paragraph.dateStarted)) {
    return true
  }
  return false
}

export let getStatusClassNames = function(paragraph) {
  let statusClassNames = "ms-fontColor-tealLight"
  if (paragraph.status == ParagraphStatus.ERROR) {
    statusClassNames = "ms-fontColor-red ms-fontWeight-semibold"
  }
  else if (paragraph.status == ParagraphStatus.PENDING) {
    statusClassNames = "ms-fontColor-magenta ms-fontWeight-semibold"
  }
  else if (paragraph.status == ParagraphStatus.ABORT) {
    statusClassNames = "ms-fontColor-orangeLighter ms-fontWeight-semibold"
  }
  else if (paragraph.status == ParagraphStatus.RUNNING) {
    statusClassNames = "ms-fontColor-blue ms-fontWeight-semibold"
  }
  return statusClassNames
}
