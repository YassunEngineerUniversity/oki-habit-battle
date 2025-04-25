"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Image from 'next/image'
import { useState } from 'react'
import { Stamp} from '@/types/stamps/types'
import StampDialog from './StampDialog'

interface HistoryCalenderProps {
  stamps: Stamp[]
}

const HistoryCalender = ({stamps}: HistoryCalenderProps) => {
  console.log(stamps)

  const progressArray = stamps.map((stamp) => {
    return {
      title: "達成",
      start: stamp.generated_date,
      extendedProps: {
        stamp: stamp.image_url,
      }
    }
  })

  const eventValues = [...new Map(progressArray.map((item) => [item.start, item])).values()]
  const [ events, setEvents ] = useState(eventValues)
  const [open, setOpen] = useState(false)
  const [selectedStamp, setSelectedStamp] = useState<string>("")

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
        eventClick={(eventInfo => {
          if (open) {
            setSelectedStamp("")
            setOpen(false)
          } else {
            setSelectedStamp(eventInfo.event.extendedProps.stamp)
            setOpen(true)
          }
        })}
      />
      <StampDialog open={open} setOpen={setOpen} stamp={selectedStamp} />
    </div>
  )
}

function renderEventContent(eventInfo:any) {
  
  return (
    <>
      <Image className="m-auto cursor-pointer" src={eventInfo.event.extendedProps.stamp} alt="" width={32} height={32} unoptimized/>
    </>
  )
}

export default HistoryCalender
