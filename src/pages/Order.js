import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Typography, Grid, Box, FormControl, Input, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";

const Order = () => {
    const { mid } = useParams();
    const [showings, setShowings] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [filteredShowings, setFilteredShowings] = useState([]);
    const [selectedShowing, setSelectedShowing] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [popCorn, setPopCorn] = useState(false);
    const [foods, setFoods] = useState([]);
    const [foodOrders, setFoodOrders] = useState({});
    const [orderEmXinhTuoi, setOrderEmXinhTuoi] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const userLogged = JSON.parse(localStorage.getItem('userLogged'));
        setUser(userLogged);
    }, []);

    useEffect(() => {
        const fetchShowings = async () => {
            try {
                const showingsResponse = await axios.get(`http://localhost:9999/showing`);
                const ticketsResponse = await axios.get(`http://localhost:9999/tickets`);
                const foodsResponse = await axios.get(`http://localhost:9999/popCorns`);
                const selecccc = await axios.get(`http://localhost:9999/onTheaterMovies/${mid}`);
                const showingsData = showingsResponse.data;
                const ticketsData = ticketsResponse.data;
                setMovieSelected(selecccc.data);

                setFoods(foodsResponse.data);

                const updatedShowings = showingsData.map(showing => {
                    const bookedTickets = ticketsData.filter(ticket => ticket.showingId === showing.id);
                    const bookedSeats = bookedTickets.reduce((acc, ticket) => {
                        Object.keys(ticket.seats).forEach(seatClass => {
                            acc[seatClass] = (acc[seatClass] || 0) + ticket.seats[seatClass];
                        });
                        return acc;
                    }, {});

                    const availableSeats = showing.seats.map(seat => {
                        const booked = bookedSeats[seat.class] || 0;
                        const available = seat.totalChairs - booked;
                        return {
                            ...seat,
                            availableChairs: available
                        };
                    });

                    return {
                        ...showing,
                        seats: availableSeats
                    };
                });

                setShowings(updatedShowings);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchShowings();
    }, [mid]);

    useEffect(() => {
        const filterShowingsByDate = () => {
            if (selectedDate.trim() === "") {
                setFilteredShowings(showings.filter(showing => showing.movieId === mid));
            } else {
                setFilteredShowings(showings.filter(showing => showing.movieId === mid && showing.showDate === selectedDate));
            }
        };

        filterShowingsByDate();
    }, [selectedDate, mid, showings]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setSelectedShowing(null);
    };

    const handleShowingSelect = (showing) => {
        setSelectedShowing(showing);
        setSelectedSeats({});
        setTotalPrice(0);
    };

    const handleSeatChange = (event) => {
        const { name, value } = event.target;
        setSelectedSeats(prevSeats => ({
            ...prevSeats,
            [name]: parseInt(value) || 0
        }));
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedSeats, foodOrders, orderEmXinhTuoi]);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        if (selectedShowing) {
            Object.keys(selectedSeats).forEach(seatClass => {
                const quantity = selectedSeats[seatClass];
                const seat = selectedShowing.seats.find(s => s.class === seatClass);
                if (seat) {
                    totalPrice += seat.price * quantity;
                }
            });
        }
    
        Object.keys(foodOrders).forEach(foodId => {
            const food = foods.find(f => parseInt(f.id) === parseInt(foodId));
            if (food) {
                totalPrice += food.price * (foodOrders[foodId] || 0);
            }
        });
    
        if (orderEmXinhTuoi) {
            totalPrice += 500000;
        }
    
        const totalPriceWithVAT = totalPrice * 1.1;
    
        // Round to 2 decimal places
        setTotalPrice(parseFloat(totalPriceWithVAT.toFixed(2)));
    };

    const handleOrder = async () => {
        let isInvalid = false;
        Object.keys(selectedSeats).forEach(seatClass => {
            const quantity = selectedSeats[seatClass];
            const seat = selectedShowing.seats.find(s => s.class === seatClass);
            if (seat && quantity > seat.availableChairs) {
                setError(`Exceeds available seats for ${seatClass} class. Please select fewer seats.`);
                isInvalid = true;
            }
        });

        if (isInvalid) {
            return;
        }

        try {
            const ticketData = {
                movieId: mid,
                showingId: selectedShowing.id,
                seats: selectedSeats,
                foods: foodOrders,
                totalPrice: totalPrice,
                userId: user.id,
                emXinhTuoi: orderEmXinhTuoi, // Include the "+1 Bạn nữ xinh tươi" option
                pay: false // Add the "pay" field with default value false
            };

            // Save the order to the database
            await axios.post('http://localhost:9999/tickets', ticketData);

            // Prepare to handle payment
            setOrderDetails(ticketData);
            setModalOpen(true);
        } catch (error) {
            console.error('Error ordering tickets:', error);
            setError('Error ordering tickets. Please try again later.');
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handlePayment = async () => {
        try {
            // Prepare the data to send to the backend
            const formPay = {
                amount: totalPrice, // Ensure totalPrice is defined and calculated
                description: "FPTtickets - Payment for the order #123456",
            };

            const userId = user.id;
            const userResponse = await axios.get(`http://localhost:9999/users/${userId}`);
            const users = userResponse.data;
            const newTotalAmount = users.totalAmount + totalPrice;

            await axios.put(`http://localhost:9999/users/${userId}`, {
                ...users,
                totalAmount: newTotalAmount
            });
    
            // Send payment request to backend
            const resP = await axios.post(`http://localhost:4000/payment/zalo`, formPay);
    
            // Redirect user to the payment URL
            window.location.href = resP.data.order_url; // Adjust to match your backend response field
    
        } catch (error) {
            console.error("Payment failed:", error);
        }
    };

    const handlePopCornChange = (event) => {
        setPopCorn(event.target.checked);
    };

    const handleFoodQuantityChange = (event, foodId) => {
        const { value } = event.target;
        setFoodOrders(prevFoodOrders => ({
            ...prevFoodOrders,
            [foodId]: parseInt(value) || 0
        }));
    };

    const handleEmXinhTuoiChange = (event) => {
        setOrderEmXinhTuoi(event.target.checked);
    };

    return (
        <Container fluid className="bg-dark text-light">
            <h1 className="text text-success text-center">
                {movieSelected.title}
            </h1>
            <Typography variant="h4" color='error' align="center" gutterBottom>Now ready to Order</Typography>
            <Row>
                <Col md={4}>
                    <img src={movieSelected.img} alt="Movie" />
                </Col>
                <Col md={8}>
                    {error && (
                        <Typography variant="body2" color="error" align="center" gutterBottom>{error}</Typography>
                    )}

                    <FormControl fullWidth>
                        <input
                            type="date"
                            id="date-input"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </FormControl>
                    {selectedDate && (
                        <Box mt={4}>
                            <Typography variant="h4" align="center" gutterBottom>Available Showings: </Typography>
                            {filteredShowings.map(showing => (
                                <Button
                                    variant={selectedShowing && selectedShowing.id === showing.id ? "contained" : "outlined"}
                                    color="primary"
                                    onClick={() => handleShowingSelect(showing)}
                                    key={showing.id}
                                >
                                    {showing.showTime}h - {showing.theater}
                                </Button>
                            ))}
                        </Box>
                    )}

                    {selectedShowing && (
                        <Box mt={4}>
                            <Typography variant="h5" align="center" gutterBottom style={{ color: 'white' }}>
                                Select Seats:
                            </Typography>
                            {selectedShowing.seats.map(seat => (
                                <FormControl fullWidth key={seat.class} style={{ marginTop: '10px' }}>
                                    <InputLabel htmlFor={seat.class} style={{ color: 'white' }}>
                                        {`Class: ${seat.class}, Price: ${seat.price}₫, Available: ${seat.availableChairs}`}
                                    </InputLabel>
                                    <Input
                                        type="number"
                                        id={seat.class}
                                        name={seat.class}
                                        value={selectedSeats[seat.class] || ''}
                                        onChange={handleSeatChange}
                                        inputProps={{ style: { color: 'white', borderColor: 'white' } }}
                                        style={{ color: 'white' }}
                                    />
                                </FormControl>
                            ))}
                        </Box>
                    )}

                    {selectedShowing && (
                        <Box mt={4}>
                            <FormControl className="text-white">
                                <input
                                    type="checkbox"
                                    id="popcorn-checkbox"
                                    checked={popCorn}
                                    onChange={handlePopCornChange}
                                />
                                <label htmlFor="popcorn-checkbox">I want to order food</label>
                            </FormControl>

                            {popCorn && (
                                <>
                                    {foods.map(food => (
                                        <FormControl fullWidth key={food.id}>
                                            <InputLabel htmlFor={food.id} style={{ color: 'white' }}>
                                                {`Food: ${food.name}, Price: ${food.price}₫`}
                                            </InputLabel>
                                            <Input
                                                type="number"
                                                name={food.id}
                                                value={foodOrders[food.id] || ''}
                                                onChange={(event) => handleFoodQuantityChange(event, food.id)}
                                            />
                                        </FormControl>
                                    ))}
                                </>
                            )}
                            <FormControl>
                                <input
                                    type="checkbox"
                                    id="em-xinh-tuoi-checkbox"
                                    checked={orderEmXinhTuoi}
                                    onChange={handleEmXinhTuoiChange}
                                />
                                <label htmlFor="em-xinh-tuoi-checkbox">+1 Bạn nữ xinh tươi</label>
                            </FormControl>
                        </Box>
                    )}

                    {selectedShowing && (
                        <Box mt={4}>
                            <Typography variant="h5" color='success' align="center" gutterBottom>Total Price(vat10%) : {totalPrice.toLocaleString('vi-VN')} Vnd</Typography>
                            <Grid container className="pt-2" justifyContent="center" spacing={2}>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleOrder}
                                    >
                                        Confirm Order
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    )}
                </Col>
            </Row>

            <Dialog open={modalOpen} onClose={handleModalClose}>
                <DialogTitle>Order Confirmation</DialogTitle>
                <DialogContent>
                    <Typography variant="h6">Order Details:</Typography>
                    <Typography variant="body1">Movie: {movieSelected.title}</Typography>
                    <Typography variant="body1">Showing: {selectedShowing?.showTime}h - {selectedShowing?.theater}</Typography>
                    <Typography variant="body1">Seats:</Typography>
                    {Object.keys(selectedSeats).map(seatClass => (
                        <Typography key={seatClass} variant="body2">
                            {`Class: ${seatClass}, Quantity: ${selectedSeats[seatClass]}`}
                        </Typography>
                    ))}
                    <Typography variant="body1">Food Orders:</Typography>
                    {Object.keys(foodOrders).map(foodId => {
                        const food = foods.find(f => parseInt(f.id) === parseInt(foodId));
                        return food ? (
                            <Typography key={foodId} variant="body2">
                                {`${food.name}: ${foodOrders[foodId]} x ${food.price.toLocaleString('vi-VN')}₫`}
                            </Typography>
                        ) : null;
                    })}
                    {orderEmXinhTuoi && (
                        <Typography variant="body2">+1 Bạn nữ xinh tươi: 500,000₫</Typography>
                    )}
                    <h3 className="text-success">
                        Total Price with 10& VAT: {totalPrice.toLocaleString('vi-VN')} Vnd
                    </h3>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePayment} color="primary">
                        Proceed to Payment
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Order;
