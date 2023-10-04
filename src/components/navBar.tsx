// components/NavBar.tsx
import { Box, Button, Flex } from '@chakra-ui/react';

interface NavBarProps {
  isCoach: boolean;
  setIsCoach: (isCoach: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ isCoach, setIsCoach }) => {
  return (
    <Flex bg="teal.500" p={4} color="white">
      <Box p="2">Stepful Coaching</Box>
      <Flex flexGrow={1} justifyContent="flex-end">
        <Button onClick={() => setIsCoach(!isCoach)}>
          Switch to {isCoach ? 'Student' : 'Coach'} View
        </Button>
      </Flex>
    </Flex>
  );
}

export default NavBar;
