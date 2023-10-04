import { User } from '@/models/userModel';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';

const mockUsers: User[] = [
    { id: 1, type: 'coach', name: 'Coach A' },
    { id: 2, type: 'student', name: 'Student A' },
    { id: 3, type: 'coach', name: 'Coach B' },
    { id: 4, type: 'student', name: 'Student B' }
    // ... add more mock users as needed
];

export function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

export default function MockLogin() {

    async function createUser(user: User) {
        await fetch(`/api/coach/createCoach`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.id,
                name: user.name,
            }),
        });
    }

    const handleLogin = (user: User) => {
        createUser(user);
        // Store the "logged in" user somewhere accessible, like the local storage or a state management library
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to the dashboard or appropriate page
        window.location.href = '/';
    };

    return (
        <Box p={5} boxShadow="lg" bg="white" maxW="400px" mx="auto" mt={10} borderRadius="md">
            <Heading mb={5} size="lg">Select a User to Login</Heading>
            <VStack spacing={4}>
                {mockUsers.map(user => (
                    <Button key={user.id} onClick={() => handleLogin(user)} colorScheme="teal" variant="outline">
                        {user.name} ({user.type})
                    </Button>
                ))}
            </VStack>
        </Box>
    );
}