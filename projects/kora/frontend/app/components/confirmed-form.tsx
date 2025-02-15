import type { User, Booking } from '../../types/shared-types';
import { timeService } from '../../services/utils/timeService'

type Props = {
    eventDate: Date;
    organizer: User | null;
    duration: number | null;
    email: string | undefined;
    name: string | undefined
};

export default function ConfirmationForm({ eventDate, duration, email,name, organizer }: Props) {

    return (
        <div className="card bg-base-100 w-96 shadow-xl justify-self-center">
            <div className="card-body">
                <h2 className="card-title">Booking details: </h2>
                <p>Date : {timeService.displayDate(eventDate)}</p>
                <p>Time : {timeService.hasNoTime(eventDate) ? "Not provided" : timeService.getTimeOnly(eventDate)}</p>
                <p>Duration : {duration ? timeService.convertMinsToHrsAndMins(duration) : "Not provided"}</p>
                <p>Organizer: {organizer?.name}</p>
                <p>Guest Email: {email}</p>
                <p>Guest Name: {name}</p>
            </div>
        </div>
    )
}