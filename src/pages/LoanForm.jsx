import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const LoanForm = () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId || !token) {
            console.log("Missing userId or token, redirecting to /login");
            navigate("/login");
            return;
        }

        const fetchUserData = async () => {
            try {
                console.log("Fetching application for userId:", userId);
                console.log("Using token:", token);
                const res = await fetch(`${API_URL}/api/loan/application/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                console.log("API response:", data);
                if (res.ok) {
                    setUserData(data);
                } else {
                    console.error("Failed to fetch application data:", data.message);
                    setError(data.message || "Failed to load application data");
                    navigate("/login");
                }
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                setError("Something went wrong while fetching your data");
                navigate("/login");
            }
        };

        fetchUserData();
    }, [userId, token, navigate]);

    if (error) {
        return (
            <Container className="text-center mt-5">
                <p className="text-danger">{error}</p>
            </Container>
        );
    }

    if (!userData) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" /> <p>Loading your application...</p>
            </Container>
        );
    }

    return (
        <Container>
            <div className="application-card">
                <h1 className="form-heading">Welcome, {userData.name}!</h1>
                <p className="text-muted">Your Loan application ID is: <strong>{userId}</strong></p>
                <hr />
                <h4>Application Details</h4>
                <div className="application-details">
                    <p><strong>Email:</strong> {userData.email || "Not available"}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <p><strong>Monthly Income:</strong> ₹{userData.monthlyIncome}</p>
                    <p><strong>City:</strong> {userData.city}</p>
                    <p><strong>State:</strong> {userData.state}</p>
                </div>
            </div>
        </Container>
    );
};

export default LoanForm;
