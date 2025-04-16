import { useState } from 'react';
import { timeService } from '../../../services/utils/timeService';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const lengths: number[] = [
    15, 30, 45, 60, 120, 0
]
const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM']

export default function DemoTimeSelector() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 mb-6 bg-white rounded-[20px] shadow aspect-square w-[300px] h-[200px]">
            {lengths.map((length) => (
                <button className={`btn bg-gray-200 text-10px`}
                    key={length}
                >{timeService.convertMinsToHrsAndMins(length)}</button>
            ))}
        </div>
    )
}