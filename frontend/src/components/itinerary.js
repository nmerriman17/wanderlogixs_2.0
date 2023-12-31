import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AppHeader from '../components/header.js';
import './itinerary.css';

function Itinerary() {
    const [events, setEvents] = useState([]);
    const [eventForm, setEventForm] = useState({
        eventName: '',
        location: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        description: '',
        notification: ''
    });
    const [errors, setErrors] = useState({});
    const [editingEventId, setEditingEventId] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/itinerary', { method: 'GET' });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingEventId ? `/api/itinerary/${editingEventId}` : '/api/itinerary';
        const method = editingEventId ? 'PUT' : 'POST';
        
        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventForm)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const newEvent = await response.json();
            if (editingEventId) {
                setEvents(events.map(event => event.event_id === editingEventId ? newEvent : event));
            } else {
                setEvents([...events, newEvent]);
            }
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ form: 'Error submitting form' });
        }
    };

    const handleEditEvent = (event) => {
        setEditingEventId(event.event_id);
        setEventForm(event);
    };

    const handleDeleteEvent = async (event_id) => {
        try {
            const response = await fetch(`/api/itinerary/${event_id}`, { method: 'DELETE' });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            setEvents(events.filter(event => event.event_id !== event_id));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const resetForm = () => {
        setEventForm({
            eventName: '',
            location: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            description: '',
            notification: ''
        });
        setEditingEventId(null);
        setErrors({});
    };

    return (
        <>
            <AppHeader />
            <div className='calendar-form-container'>
                <div className="calendar-header">
                    <div className="calendar-text">Your Itinerary</div>
                    <div className="underline"></div>
                </div>
                <form onSubmit={handleSubmit} className="itinerary-form">
                    {/* Event Name Input */}
                    <div className="form-row">
                        <div className="input">
                            <input
                                type="text"
                                name="eventName"
                                value={eventForm.eventName}
                                onChange={handleInputChange}
                                placeholder="Event Name"
                            />
                            {errors.eventName && <div className="error">{errors.eventName}</div>}
                        </div>

                        {/* Location Input */}
                        <div className="input">
                            <input
                                type="text"
                                name="location"
                                value={eventForm.location}
                                onChange={handleInputChange}
                                placeholder="Location"
                            />
                            {errors.location && <div className="error">{errors.location}</div>}
                        </div>
                    </div>

                    {/* Date and Time Inputs */}
                    <div className="form-row">
                        <div className="input">
                            <input
                                type="date"
                                name="startDate"
                                value={eventForm.startDate}
                                onChange={handleInputChange}
                                placeholder="Start Date (YYYY-MM-DD)"
                            />
                            {errors.startDate && <div className="error">{errors.startDate}</div>}
                        </div>
                        <div className="input">
                            <input
                                type="time"
                                name="startTime"
                                value={eventForm.startTime}
                                onChange={handleInputChange}
                                placeholder="Start Time (HH:MM)"
                            />
                            {errors.startTime && <div className="error">{errors.startTime}</div>}
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input">
                            <input
                                type="date"
                                name="endDate"
                                value={eventForm.endDate}
                                onChange={handleInputChange}
                                placeholder="End Date (YYYY-MM-DD)"
                            />
                            {errors.endDate && <div className="error">{errors.endDate}</div>}
                        </div>
                        <div className="input">
                            <input
                                type="time"
                                name="endTime"
                                value={eventForm.endTime}
                                onChange={handleInputChange}
                                placeholder="End Time (HH:MM)"
                            />
                            {errors.endTime && <div className="error">{errors.endTime}</div>}
                        </div>
                    </div>

                    {/* Description and Notification */}
                    <div className="form-row description-row">
                        <div className="input full-width">
                            <textarea
                                name="description"
                                value={eventForm.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                            />
                            {errors.description && <div className="error">{errors.description}</div>}
                        </div>
                    </div>

                    <div className="form-row button-row">
                        <div className="input reminder-select">
                            <label>
                                Set Reminder:
                                <select
                                    name="notification"
                                    value={eventForm.notification}
                                    onChange={handleInputChange}>
                                    <option value="none">None</option>
                                    <option value="15min">15 minutes before</option>
                                    <option value="30min">30 minutes before</option>
                                    <option value="1hour">1 hour before</option>
                                    <option value="1day">1 day before</option>
                                </select>
                            </label>
                            {errors.notification && <div className="error">{errors.notification}</div>}
                        </div>
                        
                        <div className="itinerary-submit-container">
                            <button type="submit" className="btn trip-btn-primary submit">Submit</button>
                            <button type="button" className="btn trip-btn-secondary submit" onClick={resetForm}>Cancel</button>
                        </div>
                    </div>
                </form>

                {/* Calendar Component */}
                <div className="calendar-container">
                    <Calendar
                        value={new Date()}
                        tileContent={({ date, view }) => (
                            view === 'month' && events.map(event => {
                                const eventStartDate = new Date(event.startDate);
                                const eventEndDate = new Date(event.endDate);
                                if (date >= eventStartDate && date <= eventEndDate) {
                                    return (
                                        <div key={event.event_id} className="calendar-event">
                                            <span>{event.eventName}</span>
                                            <button onClick={() => handleEditEvent(event)}>Edit</button>
                                            <button onClick={() => handleDeleteEvent(event.event_id)}>Delete</button>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        )}
                    />
                </div>
            </div>
        </>
    );
}

export default Itinerary;