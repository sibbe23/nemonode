const token = localStorage.getItem('token')
function decodeToken(token) {
    // Implementation depends on your JWT library
    // Here, we're using a simple base64 decode
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}
document.addEventListener('DOMContentLoaded', async function () {
    const candidateId= localStorage.getItem('memId')
        const id = candidateId;
        const decodedToken = decodeToken(token);
    console.log(decodedToken)

const hasUserManagement = decodedToken.userManagement;
console.log(hasUserManagement)
if (hasUserManagement) {
  document.getElementById('userManagementSection').style.display = 'block';
  document.getElementById('userManagementSections').style.display = 'block';

}

        try {
            const response = await axios.get(`http://localhost:3000/candidate/get-hospital-details/${id}`, {
                headers: {
                    'Authorization': token,
                },
            });

            // Check if the request was successful
            if (response.status) {
                const data = response.data;

                // Update the table with the fetched data
                updateHospitalTable(data);
            } else {
                console.error('Failed to fetch data. Server returned:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    async function updateHospitalTable(data) {
        const hospitalTableBody = document.getElementById('hospitalTableBody');

        // Clear existing rows
        hospitalTableBody.innerHTML = '';

        // Populate the table with the fetched data
        data.forEach(hospital => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span class='badge bg-success'>${hospital.hospitalName}</span></td>
                <td>${hospital.place}</td>
                <td>${hospital.date}</td>
                <td>${hospital.expiry_date}</td>
                <td>${hospital.done_by}</td>
                <td>${hospital.status}</td>
                <td>${hospital.amount}</td>
                <td>${hospital.upload}</td>
                <td>
                <button class="btn border-0 m-0 p-0" onclick="editMedical('${hospital.id}', '${hospital.hospitalName}', '${hospital.place}', '${hospital.date}', '${hospital.expiry_date}', '${hospital.done_by}', '${hospital.status}', '${hospital.amount}', '${hospital.upload}')">
                    <i onMouseOver="this.style.color='seagreen'" onMouseOut="this.style.color='gray'" class="fa fa-pencil"></i>
                </button>
                <button class="btn border-0 m-0 p-0" onclick="deleteMedical('${hospital.id}')">
                    <i onMouseOver="this.style.color='red'" onMouseOut="this.style.color='gray'" class="fa fa-trash"></i>
                </button>
            </td>
            
            `;
            hospitalTableBody.appendChild(row);
        });
    }
      
        const hospitalResponse = await axios.get("http://localhost:3000/others/view-hospital", { headers: { "Authorization": token } });
        console.log(hospitalResponse)
        const hospitals = hospitalResponse.data.hospitals;
        const hospitalNames = hospitals.map(hospital => hospital.hospitalName);
        const hospitalDropdown = document.getElementById('hospital_name');
        hospitalDropdown.innerHTML = ''; // Clear existing options
        for (let i = 0; i < hospitalNames.length; i++) {
            const option = document.createElement('option');
            option.value = hospitalNames[i];
            option.text = hospitalNames[i];
            hospitalDropdown.appendChild(option);
        }

        let dropdownItems = document.querySelectorAll(".dropdown-item");
    
        // Add click event listener to each dropdown item
        dropdownItems.forEach(function(item) {
            item.addEventListener("click", function() {
                // Get the id attribute of the clicked item
                var itemId = item.id;
                const memId= localStorage.getItem('memId')
                // Define the destination URLs based on the clicked item
                var destinationPage = "";
                switch (itemId) {
                    case "personnel":
                        destinationPage = `./edit-candidate-2.html?memId=${memId}`;
                        break;
                    case "discussion":
                        destinationPage =`./edit-discussion.html?memId=${memId}`;
                        break;
                    case "contract":
                        destinationPage = `./add-c-contract.html?memId=${memId}`;
                        break;
                    case "document":
                        destinationPage = `./add-c-document.html?memId=${memId}`;
                        break;
                    case "bank":
                        destinationPage = `./add-c-bank.html?memId=${memId}`;
                        break;
                    case "travel":
                        destinationPage = `./add-c-travel.html?memId=${memId}`;
                        break;
                    case "medicals":
                        destinationPage = `./add-c-medicals.html?memId=${memId}`;
                        break;
                    case "nkd":
                        destinationPage = `./add-c-nkd.html?memId=${memId}`;
                        break;
                    default:
                        // Handle default case or do nothing
                        break;
                }
    
                // Redirect to the destination page¯
                if (destinationPage !== "") {
                    window.location.href = destinationPage;
                }
            });
            
        });

    
      // Add event listener to the submit button
      document.getElementById('medicalForm').addEventListener('submit', async(e)=>{
        try {
            e.preventDefault();
            const memId= localStorage.getItem('memId')

          // Collect form data
          const formData = {
            hospitalName: document.getElementById('hospital_name').value.trim(),
            place: document.getElementById('place').value.trim(),
            date: document.getElementById('date').value.trim(),
            expiry_date: document.getElementById('expiry_date').value.trim(),
            done_by: document.getElementById('done_by').value.trim(),
            status: document.getElementById('status').value.trim(),
            amount: document.getElementById('amount').value.trim(),
            upload: document.getElementById('upload').value.trim(),
        };
          console.log(formData)
          // Send data to the server using Axios with async/await
          const response = await axios.post(`http://localhost:3000/candidate/hospital-details/${memId}`, formData,{headers:{"Authorization":token}});
    
          // Handle success
          console.log('Data sent successfully:', response.data);
          // You can perform additional actions here after a successful submission
        } catch (error) {
          // Handle error
          console.error('Error sending data:', error);
          // You can handle errors and display appropriate messages to the user
        }
      }
      )

    });
    function editMedical(id, hospitalName, place, date, expiry_date, done_by, status, amount, upload) {
        // You can use this function to perform any actions needed for editing
        console.log('Edit clicked for medical ID:', id);
    
        // You can modify this part to send the data to the server for editing
        // Example: Redirect to an edit page with parameters
        window.location.href = `edit-c-medicals.html?id=${id}&hospitalName=${hospitalName}&place=${place}&date=${date}&expiry_date=${expiry_date}&done_by=${done_by}&status=${status}&amount=${amount}&upload=${upload}`;
    }

    document.getElementById('logout').addEventListener('click', function() {
        // Clear local storage
        localStorage.clear();

        // Perform logout actions
        // You may want to redirect to a login page or perform other logout-related tasks

        // For example, redirect to a login page
        window.location.href = './loginpage.html';
    });


function updateDateTime() {
    const dateTimeElement = document.getElementById('datetime');
    const now = new Date();

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        month: 'short',
        day: 'numeric',
        ordinal: 'numeric',
    };

    const dateTimeString = now.toLocaleString('en-US', options);

    dateTimeElement.textContent = dateTimeString;
}

// Update date and time initially and every second
updateDateTime();
setInterval(updateDateTime, 1000);