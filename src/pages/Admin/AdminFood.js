import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const FoodList = () => {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/popCorns');
                setFoodItems(response.data);
            } catch (error) {
                console.log('Error fetching food data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container fluid className="p-4">
            <Container>
                <h1 className="p-4 text-center">Food Items</h1>
                <Link to='/admin/food/add' className="btn btn-secondary mb-4">Add New Food</Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodItems.map((food, index) => (
                            <tr key={food.id}>
                                <td>{index + 1}</td>
                                <td><img src={food.img} alt={food.name} width="50px" /></td>
                                <td>{food.name}</td>
                                <td>{food.desc}</td>
                                <td>{food.price.toLocaleString('vi-VN')} VND</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Container>
    );
}

export default FoodList;
