import React, { useState } from 'react';
import axios from 'axios';

function StudentLogin() {
    const [studentID, setStudentID] = useState('');
    const [password, setPassword] = useState(''); // Adding password input
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!studentID || !password) {
            setError('Please enter both Student ID and Password');
            return;
        }

        setError('');
        setLoading(true);
        try {
            const res = await axios.post('/api/students/login', { rollNumber: studentID, password });
            alert(res.data.message);
            localStorage.setItem('token', res.data.token);
        } catch (error) {
            setError('Login failed. Check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Student Login</h2>
            <div className="mb-3">
                <label className="form-label">Student ID</label>
                <input
                    type="text"
                    className="form-control"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button
                className="btn btn-primary"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </div>
    );
}

export default StudentLogin;
