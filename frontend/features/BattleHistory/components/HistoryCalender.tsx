"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Image from 'next/image'
import { useState } from 'react'
import { SelectedStampType, Stamp} from '@/types/stamps/types'
import StampDialog from './StampDialog'

interface HistoryCalenderProps {
  stamps: Stamp[]
}

const HistoryCalender = ({stamps}: HistoryCalenderProps) => {
  const progressArray = stamps.map((stamp) => {
    return {
      title: "達成",
      start: stamp.generated_date,
      extendedProps: {
        stamp: stamp.image_url,
        generatedDate: stamp.generated_date,
      }
    }
  })

  const eventValues = [...new Map(progressArray.map((item) => [item.start, item])).values()]
  const [ events, setEvents ] = useState(eventValues)
  const [open, setOpen] = useState(false)
  const [selectedStamp, setSelectedStamp] = useState<SelectedStampType>({
    stamp: "",
    generatedDate: "",
  })

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
            setSelectedStamp({
              stamp: "",
              generatedDate: "",
            })
            setOpen(false)
          } else {
            console.log(eventInfo.event)
            setSelectedStamp({
              stamp: eventInfo.event.extendedProps.stamp,
              generatedDate: eventInfo.event.extendedProps.generatedDate,
            })
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
