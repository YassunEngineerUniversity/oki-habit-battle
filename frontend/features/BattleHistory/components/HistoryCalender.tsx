"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Image from 'next/image'
import { useState } from 'react'
import { ProgressType } from '@/types/progress/types'

interface HistoryCalenderProps {
  progresses: ProgressType[]
}

const HistoryCalender = ({progresses}: HistoryCalenderProps) => {
  const progressArray = progresses.map((progress) => {
    return {
      title: "達成",
      start: progress.progress_date,
    }
  })

  const eventValues = [...new Map(progressArray.map((item) => [item.start, item])).values()]
  const [ events, setEvents ] = useState(eventValues)

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        height={530}
        locale="ja"
      />
    </div>
  )
}

function renderEventContent(eventInfo:any) {
  return (
    <>
      <Image className="m-auto" src="/images/icon/archivement-icon.webp" alt="" width={32} height={32}/>
    </>
  )
}

export default HistoryCalender
