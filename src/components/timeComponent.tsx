
import { Text } from '@chakra-ui/react';
interface TimeComponentProps {
    start_time: string, end_time: string
}

export function formatDate(isoString: string) {
    const date = new Date(isoString);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}

function TimeComponent({ start_time, end_time }: TimeComponentProps) {

    function showDate(isoString: string) {
        const date = new Date(isoString);
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const monthName = months[date.getUTCMonth()];
        const day = date.getUTCDate();

        return `${monthName} ${day}`;
    }

    return (<Text>{showDate(start_time)}, {formatDate(start_time)} - {formatDate(end_time)}</Text>);
}

export default TimeComponent;