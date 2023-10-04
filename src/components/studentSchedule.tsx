// components/StudentSchedule.js
import { Slot } from '@/models/appointment';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TimeComponent from './timeComponent';

function StudentSchedule() {
    const [slots, setSlots] = useState<Slot[]>([]);

    useEffect(() => {
        // Fetch available slots from your API
        fetch('/api/student/viewAllSlots')
            .then(response => response.json())
            .then(data => setSlots(data));
    }, []);

    const bookSlot = async (slotId: number) => {
        const response = await fetch(`/api/student/bookCoach/${slotId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };


    return (
        <Flex direction="column" p={4}>
            {slots && slots.map(slot => (
                <Box key={slot.id} p={4} border="1px" borderRadius="md" marginBottom={4}>
                    <TimeComponent start_time={slot.start_time} end_time={slot.end_time} />
                    <Button onClick={() => bookSlot(slot.id)} colorScheme="teal" size="sm">
                        Book Slot
                    </Button>
                </Box>
            ))}
        </Flex>
    );
}

export default StudentSchedule;
