import React, { useState } from 'react';
import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveNote, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');
const localizer = momentLocalizer(moment);

//const events = [
//    {
//        title:'Evento creado por mi',
//        start: moment().toDate(),
//        end:moment().add(2,'hours').toDate(),
//        notes:'Nota del evento',
//        user:{
//            _id:'123',
//            name:'Rubén'
//        }
//    }
//];

export const CalendarScreen = () => {
    const [lastView, setLastView] = useState(localStorage.getItem('lastView')||'month')
    const dispatch = useDispatch();
    const {events,activeEvent} = useSelector(state=>state.calendar)
    

    const onDoubleClick = (e)=>{
        dispatch(uiOpenModal(null));
    }
    
    const onSelectEvent = (e)=>{
        dispatch(eventSetActive(e));        
    }
    
    const onViewChange = (e)=>{
       localStorage.setItem('lastView',e);
       setLastView(e);
    }
    
    const eventStyleGetter = (event,start,end,isSelected)=>{
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity:0.8,
            display:'block',
            color:'white'
        };
        return {style}
    };
  const handleClickEvent = (e)=>{
    if (activeEvent){
        dispatch(eventClearActiveNote());
    }
    
  }
  return (
    <div className='calendar-screen'>
        <Navbar/>
        <Calendar
            onSelectSlot={handleClickEvent}
            selectable={true}
            localizer={localizer}
            events={events}
            startAccessor="start"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent ={onSelectEvent}
            onView = {onViewChange}
            view={lastView}
            components={{
                event:CalendarEvent
            }}
        />

        <CalendarModal/>
        {
            activeEvent&&<DeleteEventFab/>
        }
        <AddNewFab/>
    </div>
  )
}
