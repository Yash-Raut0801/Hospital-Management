// Doctor Login Function
function loginDoctor(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Example login credentials
    if (username === "doctor" && password === "1234") {
      window.location.href = "doctor_dashboard.html"; // Make sure this file exists
    } else {
      document.getElementById("login-error").textContent = "Invalid username or password!";
    }
}

// Add Appointment Function
function addAppointment(event) {
    event.preventDefault();  // Prevent the form from refreshing the page
  
    // Get the patient name and appointment time from the form
    const patientName = document.getElementById('patient-name').value;
    const appointmentTime = document.getElementById('appointment-time').value;
  
    // Check if both fields are filled
    if (patientName && appointmentTime) {
      // Find the appointments table body
      const appointmentsTableBody = document.querySelector('.appointments-table tbody');
      
      // Create a new row for the new appointment
      const newRow = document.createElement('tr');
      
      // Insert new data into the row (Patient Name, Appointment Time, and View Button)
      newRow.innerHTML = ` 
        <td>${patientName}</td>
        <td>${appointmentTime}</td>
        <td><button onclick="window.location.href='patient-details.html?patient=${patientName}'">View</button></td>
      `;
      
      // Append the new row to the table
      appointmentsTableBody.appendChild(newRow);
  
      // Clear the form inputs after submitting
      document.getElementById('patient-name').value = '';
      document.getElementById('appointment-time').value = '';
      
      // Close the form after adding the appointment
      document.getElementById('add-appointment-form').style.display = 'none';
    } else {
      // If any field is missing, show an alert
      alert('Please fill out both fields (Patient Name and Appointment Time).');
    }
}

// Family Login Script
document.getElementById("family-login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const familyName = document.getElementById("family-member-name").value;
    
    if (familyName) {
        // Redirect to Family Dashboard (family_dashboard.html with family parameter)
        window.location.href = `family_dashboard.html?family=${familyName}`;
    } else {
        // If no family name is entered, show an error message
        document.getElementById("login-error").textContent = "Please enter a valid name!";
    }
});

// Family Dashboard Script
window.addEventListener("DOMContentLoaded", function() {
    // Get the family name from the URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const familyName = urlParams.get("family");

    if (!familyName) {
        // If there's no family name in URL, show an error and redirect
        document.getElementById("family-info").innerHTML = "Invalid family data. Please log in again.";
        return;
    }

    // Display the family name in the dashboard header
    document.querySelector('.header h1').innerText = `${familyName}'s Dashboard`;

    // Example patient data (replace this with real data if needed)
    const patientName = "John Doe";  // Example: You might get this from a backend
    const appointments = [
        { patient: "John Doe", time: "10:00 AM" },
        { patient: "John Doe", time: "02:00 PM" }
    ];

    // Display patient information dynamically (this can be pulled from the backend)
    document.getElementById("patient-info").innerHTML = `
        <strong>Name:</strong> ${patientName}<br>
        <strong>Condition:</strong> Stable
    `;

    // Populate the appointments table with dynamic data
    const appointmentsTable = document.getElementById("appointments-table");
    appointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.patient}</td>
            <td>${appointment.time}</td>
            <td><button onclick="viewAppointment('${appointment.patient}')">View</button></td>
        `;
        appointmentsTable.appendChild(row);
    });

    // Function to view appointment details
    window.viewAppointment = function(patientName) {
        window.location.href = `patient-details.html?patient=${patientName}`;
    };
});
