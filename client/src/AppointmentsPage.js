import React, { useState } from 'react';

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);

    const handleAddAppointment = (appointment) => {
        console.log(appointment);
        fetch("/api/add-appointment", {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json' },
            body: JSON.stringify(appointment)
        })
            .then(response => response.json())
            .then(data => { 
                setAppointments([...appointments, appointment])
                console.log(data);

            })
            .catch(error => console.error(error));
    };
    

    const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
    };

    return (
        <div>
            <h1>Appointments</h1>
            <AppointmentForm onAddAppointment={handleAddAppointment} />
            <AppointmentList appointments={appointments} onDeleteAppointment={handleDeleteAppointment} />
        </div>
    );
};

const AppointmentForm = ({ onAddAppointment }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
      
        const id = new Date().getTime();
        const startDateTime = new Date(start).toISOString();
        const endDateTime = new Date(end).toISOString();
        const appointment = { id, title, start: startDateTime, end: endDateTime };
      
        onAddAppointment(appointment);
        setTitle('');
        setStart('');
        setEnd('');
      };
      
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <br />
            <label>
                Start:
                <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} required />
            </label>
            <br />
            <label>
                End:
                <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} required />
            </label>
            <br />
            <button type="submit">Add Appointment</button>
        </form>
    );
};


const AppointmentList = ({ appointments, onDeleteAppointment }) => {

    return (
        <ul>
            {appointments.map((appointment) => (
                <li key={`${appointment.id}-appointment`}>
                    {appointment.title} ({new Date(appointment.start).toLocaleDateString()} {new Date(appointment.start).toLocaleTimeString()} -{' '}
{new Date(appointment.end).toLocaleDateString()} {new Date(appointment.end).toLocaleTimeString()})

                    <button onClick={() => onDeleteAppointment(appointment.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};


export default AppointmentPage;

