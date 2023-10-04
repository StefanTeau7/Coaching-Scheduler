import { Button, Input, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

interface reviewAppointmentProps {
    slot: any;
    onReviewAdded: () => void;
}

const ReviewAppointment: React.FC<reviewAppointmentProps> = ({ slot, onReviewAdded }) => {
    const [score, setScore] = useState<number>(0);
    const [notes, setNotes] = useState<string>('');

    const handleSubmit = () => {
        fetch('/api/coach/addReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                slot_id: slot.id,
                satisfaction_score: score,
                notes: notes,
                coach_id: slot.coach_id,
                student_id: slot.student_id,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    onReviewAdded();
                } else {
                    alert('Error: ' + data.error);
                }
            });
    };

    return slot.is_booked ? (
        <VStack spacing={4}>
            <Input
                type="number"
                placeholder="Satisfaction Score (1-5)"
                value={score}
                onChange={(e) => setScore(parseInt(e.target.value))}
            />
            <Input
                type="text"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <Button onClick={handleSubmit}>Submit Review</Button>
        </VStack>
    ) : <Text>Active/Not booked</Text>
}

export default ReviewAppointment;
