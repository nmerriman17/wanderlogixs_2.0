import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

function Itinerary() {
    const [events, setEvents] = useState([]);
    const [eventForm, setEventForm] = useState({
        eventName: '',
        location: '',
        startDate: '',
        endDate: '',
        startTime: '12:00',
        endTime: '12:00',
        description: '',
        notification: ''
    });

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/itinerary');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventForm({ ...eventForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/itinerary', eventForm);
            fetchEvents();
            setEventForm({
                eventName: '',
                location: '',
                startDate: '',
                endDate: '',
                startTime: '12:00',
                endTime: '12:00',
                description: '',
                notification: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="itinerary-container">
            <form onSubmit={handleSubmit} className="itinerary-form">
                <input type="text" name="eventName" value={eventForm.eventName} onChange={handleInputChange} placeholder="Event Name" />
                <input type="text" name="location" value={eventForm.location} onChange={handleInputChange} placeholder="Location" />
                <input type="date" name="startDate" value={eventForm.startDate} onChange={handleInputChange} />
                <input type="date" name="endDate" value={eventForm.endDate} onChange={handleInputChange} />
                <input type="time" name="startTime" value={eventForm.startTime} onChange={handleInputChange} />
                <input type="time" name="endTime" value={eventForm.endTime} onChange={handleInputChange} />
                <textarea name="description" value={eventForm.description} onChange={handleInputChange} placeholder="Description"></textarea>
                <select name="notification" value={eventForm.notification} onChange={handleInputChange}>
                    <option value="none">No Reminder</option>
                    <option value="15min">15 minutes before</option>
                    <option value="30min">30 minutes before</option>
                    <option value="1hour">1 hour before</option>
                    <option value="1day">1 day before</option>
                </select>
                <button type="submit">Add Event</button>
            </form>
            <div className="calendar-container">
                <Calendar
                    value={new Date()}
                    tileContent={({ date, view }) => {
                        return view === 'month' && events.map(event => {
                            const eventStart = new Date(event.startDate);
                            const eventEnd = new Date(event.endDate);
                            if (date >= eventStart && date <= eventEnd) {
                                return <div key={event.event_id}>{event.eventName}</div>;
                            }
                            return null;
                        });
                    }}
                />
            </div>
        </div>
    );
}

export default Itinerary;
