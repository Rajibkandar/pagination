import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    let navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('api/login/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.data.token);
                setMessage('Login successful!');
                navigate('/jobs')
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Login failed.');
                localStorage.removeItem('token');
                alert('Please enter valid credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1 className="text-center mt-4">Soft Build Solution</h1>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center"><h1>Login</h1></div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-primary mb-3">Login</button>
                            </form>
                            {message && <p className="mt-3">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
