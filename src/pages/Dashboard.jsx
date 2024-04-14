import {
  Box,
  Button,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Dashboard() {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>Dashboard</Heading>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Flex>
    </Flex>
  );
}