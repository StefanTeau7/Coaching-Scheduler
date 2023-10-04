// pages/index.tsx
import { User } from '@/models/userModel';
import { Box, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CoachSchedule from '../components/coachSchedule';
import NavBar from '../components/navBar';
import StudentSchedule from '../components/studentSchedule';



const Home: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const user: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null');
        setCurrentUser(user);
        if (!user) {
            window.location.href = '/mockLogin';
        }
    }, []);

    if (!currentUser) {
        return <Box display="flex" justifyContent="center" alignItems="center" width="100vw" height="100vh">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Box>
    }

    function handleLogout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/mockLogin';
    }

    return (
        <Box>
            <NavBar isCoach={currentUser.type === 'coach'} setIsCoach={(isCoach: boolean) => handleLogout()} />
            {currentUser.type === 'coach' ? (
                <CoachSchedule />
            ) : (
                <StudentSchedule />
            )}
        </Box>
    );
}

export default Home;
