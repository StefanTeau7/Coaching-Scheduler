// components/CoachSchedule.tsx
import { Appointment } from '@/models/appointment';
import { Slot } from '@/models/slot';
import { getCurrentUser } from '@/pages/mockLogin';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import AddSlotComponent from './addSlot';
import PastReviews from './pastReviews';
import ReviewAppointment from './reviewAppointment';
import TimeComponent from './timeComponent';

const CoachSchedule: React.FC = () => {
    const [schedule, setSchedule] = useState<Slot[]>([]);
    const [pastReviews, setPastReviews] = useState<Appointment[]>([]); // for storing past reviews
    const [reload, setReload] = useState(false);

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
            .then(data => {
                if (Array.isArray(data)) {
                    setSchedule(data)
                }
            }
            );

        // Fetch past reviews with details for the coach
        fetch(`/api/coach/getReviewsWithDetails?coach_id=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setPastReviews(data)
                }
            });
    }, [reload]);

    return (
        <Box p={4}>
            <Flex direction="row" mb={4}>
                <Text fontSize="xl">Coach Schedule</Text>
                <AddSlotComponent onSlotAdded={() => setReload(!reload)} />
            </Flex>
            <VStack spacing={4}>
                {schedule && schedule.map((slot, index) => (
                    <HStack key={index} align={"start"} spacing={4}>
                        <TimeComponent start_time={slot.start_time} end_time={slot.end_time} />
                        < ReviewAppointment slot={slot} onReviewAdded={() => setReload(!reload)} />
                    </HStack>
                ))}
            </VStack>
            <PastReviews reviews={pastReviews} />
        </Box >
    );
}

export default CoachSchedule;