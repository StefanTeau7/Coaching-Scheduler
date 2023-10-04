import { getCurrentUser } from '@/pages/mockLogin';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';
interface AddSlotComponentProps {
    onSlotAdded: () => void;
}
const AddSlotComponent: React.FC<AddSlotComponentProps> = ({ onSlotAdded }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [startTime, setStartTime] = React.useState('');
    const [endTime, setEndTime] = React.useState('');

    const handleAddSlot = async () => {
        try {
            const offset = new Date().getTimezoneOffset();
            const currentDate = new Date(new Date().getTime() - (offset * 60 * 1000)).toISOString().split('T')[0];
            const fullStartTime = `${currentDate}T${startTime}:00.000Z`;
            const fullEndTime = `${currentDate}T${endTime}:00.000Z`;
            const userId = getCurrentUser().id;

            await fetch(`/api/coach/addSlot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    startTime: fullStartTime,
                    endTime: fullEndTime,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                    } else {
                        alert('Error: ' + data.error);
                    }
                });;
            onClose();
            onSlotAdded();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleTimeChange = (e: any) => {
        // Get the hours and minutes from the input value
        const [hours, minutes] = e.target.value.split(':').map(Number);

        // Create a new date object with those hours and minutes
        const date = new Date();
        date.setHours(hours, minutes);

        // Add 2 hours
        date.setHours(date.getHours() + 2);

        // Format the date object back to a time string in HH:MM format
        const endTimeString = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

        // Update the state
        setStartTime(e.target.value);
        setEndTime(endTimeString);
    }


    return (
        <>
            <Button colorScheme="teal" ml={4} onClick={onOpen}>
                Add Availability Slot
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Availability Slot</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Start Time</FormLabel>
                            <Input type="time" value={startTime} onChange={handleTimeChange} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>End Time</FormLabel>
                            <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                        </FormControl>
                        <Button colorScheme="teal" mt={4} onClick={handleAddSlot}>
                            Add Slot
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddSlotComponent;
