// import React from "react";

// const CalendarPage = () => {
//     return <div>Calendar</div>;
// };

// export default CalendarPage;

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';



const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    
    const onChange = (date) => {
        setDate(date);
    };

    const handleAddEvent = () => {
        const id = new Date().getTime();
        const event = {
            id,
            date,
            title: prompt('Whats the event?'),

        };
        setEvents([...events, event]);
        fetch('/api/add-event', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Event added successfully!', data);
            })
            .catch((error) => console.error(error));
    };


    const handleDeleteEvent = (id) => {
        setEvents(events.filter((event) => event.id !== id));
        fetch(`/api/delete-event/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Event deleted successfully!', data);
            })
            .catch((error) => console.error(error));
    };

    return (
        <PageContainer>
            <CalendarContainer>
                <Calendar className="calendar" onChange={onChange} value={date} />
                <button className="add-event-btn" onClick={handleAddEvent}>
                    Add Event
                </button>
                <EventList>
                    {events.map((event) => (
                        <Event key={event.id}>
                            <EventHeader>
                                <EventTitle>{event.title}</EventTitle>
                                <DeleteEventButton onClick={() => handleDeleteEvent(event.id)}>X</DeleteEventButton>
                            </EventHeader>
                            <EventBody>
                                <EventDate>{event.date.toLocaleDateString()}</EventDate>
                            </EventBody>
                        </Event>
                    ))}
                </EventList>
            </CalendarContainer>
        </PageContainer>
    );
}

export default CalendarPage;


const PageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

const CalendarContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
max-width: 600px;
width: 100%;
padding: 20px;
background-color: white;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const EventList = styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
`;

const Event = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
margin-bottom: 10px;
width: 100%;
`;

const EventHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
`;

const EventTitle = styled.span`
font-weight: bold;
font-size: 18px;
`;

const DeleteEventButton = styled.button`
background-color: red;
color: white;
border: none;
padding: 5px 10px;
border-radius: 5px;
font-size: 16px;
`;

const EventBody = styled.div`
margin-top: 10px;
width: 100%;
display: flex;
justify-content: space-between;
`;

const EventDate = styled.span`
font-size: 14px;
color: #555;
`;

