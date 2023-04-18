// import React from "react";


// const HomePage = () => {
//     return <div>Profile</div>;
    
// };

// export default HomePage;
import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(appointments);
  useEffect(() => {
    const fetchData = async () => {
      const appointmentResponse = await fetch('/api/appointments');
      const appointmentData = await appointmentResponse.json();
      console.log(appointmentData);

      if (Array.isArray(appointmentData)) {
        setAppointments(appointmentData);

        
      } else if (typeof appointmentData === 'object' && appointmentData !== null) {
        console.log("else if ");
        // Convert object to array
        // const appointmentArray = Object.values(appointmentData);
        setAppointments(appointmentData.appointments);

      
      } else {
        console.error('API response is not an array or object:', appointmentData);
      }

      const taskResponse = await fetch('/api/tasks');
      const taskData = await taskResponse.json();
      console.log(taskData);
      if (Array.isArray(taskData)) {
        setTasks(taskData);
      } else if (typeof taskData === 'object' && taskData !== null) {
        // Convert object to array
        // const taskArray = Object.values(taskData);
        setTasks(taskData.tasks);
      } else {
        console.error('API response is not an array or object:', taskData);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Upcoming</h1>
      <h1>Upcoming Appointments:</h1>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment) => {
            console.log((appointment));
                        return <li key={appointment.id}>
              {appointment.title} ({new Date(appointment.start).toLocaleDateString()} -{' '}
              
              {new Date(appointment.end).toLocaleDateString()})
            </li>
})
        ) : (
          <li>No upcoming appointments</li>
        )}
      </ul>

      <h1>Upcoming Tasks:</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <li key={task.id}>
                {task.title} ({new Date(task.dueDate).toLocaleDateString()})
              </li>
            ))
          ) : (
            <li>No upcoming tasks</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
