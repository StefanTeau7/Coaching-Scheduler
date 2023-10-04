// components/StudentSchedule.js
import { Slot } from '@/models/slot';
import { getCurrentUser } from '@/pages/mockLogin';
import { Box, Button, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TimeComponent from './timeComponent';

function StudentSchedule() {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        // Fetch available slots from your API
        fetch('/api/student/viewAllSlots')
            .then(response => response.json())
            .then(data => setSlots(data));
    }, [reload]);

    const bookSlot = async (slot: Slot) => {
        const user = getCurrentUser();
        await fetch(`/api/student/bookCoach`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                slot_id: slot.id,
                student_id: user.id,
                coach_id: slot.coach_id,
            }),
        }).then(response => response.json()).then(data => {
            if (data.message) {
                alert(data.message);
                setReload(!reload);
            } else {
                alert('Error: ' + data.error);
            }
        });
    };


    return (
        <Flex direction="column" p={4}>
            {slots && slots.map(slot => (
                <Box key={slot.id} p={4} border="1px" borderRadius="md" marginBottom={4}>
                    <TimeComponent start_time={slot.start_time} end_time={slot.end_time} />
                    <Button onClick={() => bookSlot(slot)} colorScheme="teal" size="sm">
                        Book Slot
                    </Button>
                </Box>
            ))}
        </Flex>
    );
}

export default StudentSchedule;
