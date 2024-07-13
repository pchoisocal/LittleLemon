import React, { useReducer, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Booking from './Booking';
import ConfirmedBooking from './ConfirmedBooking';

// Defining the functions directly in the file sinde API provided is not working😢
const seededRandom = function(seed) {
    var m = 2**35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
        return (s = s * a % m) / m;
    };
};

const fetchAPI = function(date) {
    let result = [];
    let random = seededRandom(date.getDate());

    for (let i = 17; i <= 23; i++) {
        if (random() < 0.5) {
            result.push(i + ':00');
        }
        if (random() < 0.5) {
            result.push(i + ':30');
        }
    }
    return result;
};

const submitAPI = function(formData) {
    return true;
};

// Function to initialize available times by fetching them from the API
const initializeTimes = () => {
    //console.log('Initializing times...');
    return fetchAPI(new Date());
};

// Reducer function to update available times based on the selected date
const updateTimes = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TIMES':
            //console.log('Updating times...');
            return fetchAPI(action.payload);
        default:
            return state;
    }
};

const Main = () => {
    // Using useReducer to manage the state of available times
    const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

    // useNavigate hook for programmatic navigation
    const navigate = useNavigate();

    // Initialize times when component mounts
    useEffect(() => {
        dispatch({ type: 'UPDATE_TIMES', payload: new Date() });
    }, []);

    // Function to handle form submission
    const submitForm = (formData) => {
        if (submitAPI(formData)) {
            navigate("/confirmed");
        }
    };

    return (
        <main>
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/booking" element={<Booking availableTimes={availableTimes} dispatch={dispatch} submitForm={submitForm} />} />
                <Route path="/confirmed" element={<ConfirmedBooking />} />
            </Routes>
        </main>
    );
};

export default Main;
