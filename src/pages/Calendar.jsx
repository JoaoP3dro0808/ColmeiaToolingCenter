import React from 'react';
import Colmeia from '../components/Colmeia';
import tool_icon from '../images/tool_icon.png';
import CalendarPic from '../images/calendar.png';

export default function Calendar() {
    const meusLinks = [
    ];
  
    return (
        <div className="relative h-screen">
        <Colmeia links={meusLinks} />

        <img
            src={CalendarPic}
            alt="Calendário"
            className="
                absolute top-1/2 left-1/2
                w-64 sm:w-96 md:w-[600px] lg:w-[900px]
                -translate-x-1/2 -translate-y-1/2
            "
        />
        </div>
    );
}