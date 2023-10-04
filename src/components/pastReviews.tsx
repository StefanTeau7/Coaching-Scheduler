import { Appointment } from "@/models/appointment";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { formatDate } from "./timeComponent";


interface PastReviewsProps {
    reviews: Appointment[];
}

const PastReviews: React.FC<PastReviewsProps> = ({ reviews }) => {
    return (
        <VStack align="start" spacing={5}>
            <Heading size="md">Past Reviews</Heading>
            {reviews.map((review, index) => {
                return (
                    <Box key={index} w="100%" p={4} boxShadow="sm" borderRadius="md" bgColor="gray.50">
                        <Text fontSize="lg" fontWeight="bold">
                            Time: {review.slot_start_time && formatDate(review.slot_start_time)}
                        </Text>
                        <Text mt={2}>Student: {review.student_name && review.student_name}</Text>
                        <Text mt={2} fontSize="lg" fontWeight="bold">Satisfaction Score: {review.satisfaction_score}</Text>
                        <Text mt={2}>{review.notes}</Text>
                    </Box>
                );
            })}
        </VStack>
    );
}

export default PastReviews;
