import Calendar from 'react-calendar';
import { useState } from 'react';
// import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
export default function DemoCalendar() {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className="p-6 bg-white aspect-square w-[300px] h-[200px] rounded-[20px] shadow w-1/2 overflow-auto">
            <Calendar onChange={onChange} value={value} showNavigation={false}/>
        </div>
    )
}