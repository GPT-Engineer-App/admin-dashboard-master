
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Table, Thead, Tbody, Tr, Th, Td, Button, useDisclosure } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }
  const [sales, setSales] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
   
    fetchSales();
    fetchBookings();
    fetchMembers();
    fetchPayments();
  }, []);

  const fetchSales = async () => {
   
    const response = await fetch("/api/sales");
    const data = await response.json();
    setSales(data);
  };

  const fetchBookings = async () => {
   
    const response = await fetch("/api/bookings");
    const data = await response.json();
    setBookings(data);
  };

  const fetchMembers = async () => {
   
    const response = await fetch("/api/members");
    const data = await response.json();
    setMembers(data);
  };

  const fetchPayments = async () => {
   
    const response = await fetch("/api/payments");
    const data = await response.json();
    setPayments(data);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    onOpen();
  };

  const handleDeleteMember = async (memberId) => {
   
    await fetch(`/api/members/${memberId}`, {
      method: "DELETE",
    });
    fetchMembers();
  };

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Admin Dashboard
      </Heading>
      <Tabs>
        <TabList>
          <Tab>Sales</Tab>
          <Tab>Bookings</Tab>
          <Tab>Members</Tab>
          <Tab>Payments</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Date</Th>
                  <Th>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {sales.map((sale) => (
                  <Tr key={sale.id}>
                    <Td>{sale.id}</Td>
                    <Td>{sale.date}</Td>
                    <Td>{sale.amount}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Date</Th>
                  <Th>Member</Th>
                </Tr>
              </Thead>
              <Tbody>
                {bookings.map((booking) => (
                  <Tr key={booking.id}>
                    <Td>{booking.id}</Td>
                    <Td>{booking.date}</Td>
                    <Td>{booking.member}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {members.map((member) => (
                  <Tr key={member.id}>
                    <Td>{member.id}</Td>
                    <Td>{member.name}</Td>
                    <Td>{member.email}</Td>
                    <Td>
                      <Button size="sm" colorScheme="blue" leftIcon={<FaEdit />} onClick={() => handleEditMember(member)} mr={2}>
                        Edit
                      </Button>
                      <Button size="sm" colorScheme="red" leftIcon={<FaTrash />} onClick={() => handleDeleteMember(member.id)}>
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
          <TabPanel>
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Date</Th>
                  <Th>Amount</Th>
                  <Th>Member</Th>
                </Tr>
              </Thead>
              <Tbody>
                {payments.map((payment) => (
                  <Tr key={payment.id}>
                    <Td>{payment.id}</Td>
                    <Td>{payment.date}</Td>
                    <Td>{payment.amount}</Td>
                    <Td>{payment.member}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Index;
