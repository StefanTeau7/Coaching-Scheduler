// components/CoachSchedule.tsx
import { Slot } from '@/models/appointment';
import { getCurrentUser } from '@/pages/mockLogin';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AddSlotComponent from './addSlot';
import TimeComponent from './timeComponent';

const CoachSchedule: React.FC = () => {
    const [schedule, setSchedule] = useState<Slot[]>([]);

    useEffect(() => {
        const userId = getCurrentUser().id;
        // Fetch schedule from your API
        fetch(`/api/coach/getSlots?coach_id=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => setSchedule(data));
    }, []);

    return (
        <Box p={4}>
            <Text fontSize="xl" mb={4}>Coach Schedule</Text>
            <VStack spacing={4}>
                {schedule.map((slot, index) => (
                    <HStack key={index} spacing={4}>
                        <TimeComponent start_time={slot.start_time} end_time={slot.end_time} />
                    </HStack>
                ))}
            </VStack>
            <AddSlotComponent />
        </Box>
    );
}

export default CoachSchedule;