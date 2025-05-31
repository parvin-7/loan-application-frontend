import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        phone: '',
        residenceType: '',
        monthlyIncome: '',
        previousLoan: '',
        maritalStatus: '',
        dependencies: '',
        city: '',
        state: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data being sent:", formData);

        try {
            const signupResponse = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await signupResponse.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
                navigate("/application"); // Redirect to LoanForm directly
            } else {
                alert(data.message || "Signup failed! Please try again.");
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Something went wrong!");
        }
    };

    return (
        <Container>
            <h2 className="text-center my-4">Sign up Now!!!</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="tel" name="phone" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Residence Type</Form.Label>
                            <Form.Select name="residenceType" onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Owned">Owned</option>
                                <option value="Rented">Rented</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Monthly Income</Form.Label>
                            <Form.Control type="number" name="monthlyIncome" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Previous Loan</Form.Label>
                            <Form.Select name="previousLoan" onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Marital Status</Form.Label>
                            <Form.Select name="maritalStatus" onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Number of Dependents</Form.Label>
                            <Form.Control type="number" name="dependencies" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" name="state" onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit" className="w-100 mb-3">Submit</Button>

                <p className="text-center">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </Form>
        </Container>
    );
}

export default Signup;
