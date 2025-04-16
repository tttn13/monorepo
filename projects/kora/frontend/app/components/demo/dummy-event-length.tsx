import { useState } from 'react';
import { timeService } from '../../../services/utils/timeService';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM']

export default function DemoEventSelector() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-white rounded-[20px] shadow aspect-square w-[300px] h-[200px]">
            {timeSlots.map((slot) => (
                <button className={`btn bg-gray-200 text-10px`}
                    key={slot}>{slot}</button>
            ))}
        </div>
    )
}