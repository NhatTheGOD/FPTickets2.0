import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { format, parseISO } from 'date-fns';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TicketSalesChart = () => {
  const [ticketsData, setTicketsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:9999/tickets');
        setTicketsData(res.data);
      } catch (error) {
        console.log('Error fetching ticket data:', error);
      }
    };
    fetchData();
  }, []);

  // Process the data to get the number of tickets sold per day
  const processData = (data) => {
    const salesByDate = {};

    data.forEach(ticket => {
      const date = format(parseISO(ticket.showDate), 'yyyy-MM-dd');
      if (salesByDate[date]) {
        salesByDate[date] += ticket.quantity;
      } else {
        salesByDate[date] = ticket.quantity;
      }
    });

    return Object.keys(salesByDate).map(date => ({
      date,
      tickets: salesByDate[date],
    }));
  };

  const chartData = processData(ticketsData);

  const data = {
    labels: chartData.map(item => item.date),
    datasets: [
      {
        label: 'Tickets Sold',
        data: chartData.map(item => item.tickets),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container className='mt-4'>
      <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2, bgcolor: 'background.paper' }}>
        <h2>Ticket Sales by Date</h2>
        <Bar data={data} options={options} />
      </Box>
    </Container>
  );
};

export default TicketSalesChart;
