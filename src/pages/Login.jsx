import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
                navigate("/application");
            } else {
                localStorage.removeItem("token"); 
                localStorage.removeItem("userId");
                alert(data.message || "Invalid credentials!");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Something went wrong. Please try again!");
        }
    };

    return (
        <Container>
            <h1>Already an User? Login Below</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="w-100">Submit</Button>
            </Form>
        </Container>
    );
};

export default Login;
