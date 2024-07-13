import React, { useState } from "react";

const BookingForm = (props) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [guest, setGuest] = useState("");
    const [occasion, setOccasion] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            Object.values(validationErrors).forEach(error => alert(error));
            return;
        }

        props.submitForm({ date, time, guest, occasion, name });
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        props.dispatch({ type: 'UPDATE_TIMES', payload: new Date(selectedDate) });
    };

    const validateForm = () => {
        const errors = {};

        // Check if date is selected and is not in the past
        if (!date) {
            errors.date = "Please select a date.";
        } else if (new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
            errors.date = "Date cannot be in the past.";
        }

        // Check if time is selected
        if (!time) {
            errors.time = "Please select a time.";
        }

        // Check if number of guests is a positive integer
        if (!guest) {
            errors.guest = "Please enter the number of guests.";
        } else if (parseInt(guest) <= 0) {
            errors.guest = "Number of guests must be at least 1.";
        }

        // Check if occasion is selected
        if (!occasion) {
            errors.occasion = "Please select an occasion.";
        }

        // Check if name is entered
        if (!name) {
            errors.name = "Please enter the booking name.";
        }

        return errors;
    };

    // Get today's date in yyyy-MM-dd format for the min attribute of the date input
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    return (
        <header>
            <section>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        {/* Booking Name */}
                        <div>
                            <label htmlFor="book-name">Booking Under Name:</label>
                            <input
                                id="book-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                required
                            />
                            {errors.name && <div className="error">{errors.name}</div>}
                        </div>

                        {/* Date */}
                        <div>
                            <label htmlFor="book-date">Choose Date:</label>
                            <input
                                id="book-date"
                                value={date}
                                onChange={handleDateChange}
                                type="date"
                                min={getTodayDate()}
                                required
                            />
                            {errors.date && <div className="error">{errors.date}</div>}
                        </div>

                        {/* Time */}
                        <div>
                            <label htmlFor="book-time">Choose Time:</label>
                            <select
                                id="book-time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                disabled={props.availableTimes.length === 0}
                                required
                            >
                                <option value="">Select a Time</option>
                                {props.availableTimes.map((availableTime) => {
                                    return <option key={availableTime}>{availableTime}</option>;
                                })}
                            </select>
                            {errors.time && <div className="error">{errors.time}</div>}
                        </div>

                        {/* Guest */}
                        <div>
                            <label htmlFor="book-guest">Number of Guests:</label>
                            <input
                                id="book-guest"
                                value={guest}
                                min="1"
                                onChange={(e) => setGuest(e.target.value)}
                                type="number"
                                required
                            />
                            {errors.guest && <div className="error">{errors.guest}</div>}
                        </div>

                        {/* Occasion */}
                        <div>
                            <label htmlFor="book-occasion">Choose Occasion:</label>
                            <select
                                id="book-occasion"
                                value={occasion}
                                onChange={(e) => setOccasion(e.target.value)}
                                required
                            >
                                <option value="">Select an Occasion</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Anniversary">Anniversary</option>
                                <option value="Regular Dinner">Regular Dinner</option>
                            </select>
                            {errors.occasion && <div className="error">{errors.occasion}</div>}
                        </div>

                        {/* Submit */}
                        <div className="btnReceive">
                            <input
                                aria-label="On Click"
                                type="submit"
                                value="Make your Reservation"
                                disabled={Object.keys(errors).length > 0}
                            />
                        </div>
                    </fieldset>
                </form>
            </section>
        </header>
    );
};

export default BookingForm;
