const studentForm = document.getElementById('studentForm');
const profileCards = document.getElementById('profileCards');
const submitProfileButton = document.getElementById('submitProfileButton');

// Retrieve profiles from localStorage on page load (if any)
let profiles = JSON.parse(localStorage.getItem('profiles')) || [];

renderProfiles();

// Handle form submission
submitProfileButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get form values
  const name = document.getElementById('studentName').value;
  const studentID = document.getElementById('studentID').value;
  const program = document.getElementById('program').value;
  const faculty = document.getElementById('faculty').value;
  const year = document.getElementById('year').value;
  const email = document.getElementById('email').value;
  const birthdate = document.getElementById('birthdate').value;
  const image = document.getElementById('image').files[0];

  // Check if all required fields are filled
  if (!name || !studentID || !program || !faculty || !year || !email || !birthdate || !image) {
    alert("All fields are required. Please fill in all fields.");
    return; // Stop the form submission if any field is missing
  }

  if (image && image.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const profile = {
        name,
        studentID,
        program,
        faculty,
        year,
        email,
        birthdate,
        image: e.target.result
      };
      
      profiles.push(profile);
      localStorage.setItem('profiles', JSON.stringify(profiles)); // Save to localStorage
      renderProfiles();
      studentForm.reset();
      document.getElementById('imagePreview').src = ""; // Clear image preview

      // Close modal manually
      const modal = bootstrap.Modal.getInstance(document.getElementById('addProfileModal'));
      modal.hide();  // Hide the modal after adding the profile
    };
    reader.readAsDataURL(image);
  } else {
    alert("Please upload a valid image.");
  }
});

// Render student profiles below the button
// Render student profiles below the button
function renderProfiles() {
    profileCards.innerHTML = ''; // Clear previous profiles
  
    profiles.forEach((profile, index) => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4', 'profile-card'); // Add profile card styling
      card.innerHTML = `
        <div class="card shadow-sm h-100">
          <img src="${profile.image}" class="card-img-top" alt="Profile Image">
          <div class="card-body">
            <h5 class="card-title">${profile.name}</h5>
            <p class="card-text">ID: ${profile.studentID}</p>
            <p class="card-text">Program: ${profile.program}</p>
            <p class="card-text">Faculty: ${profile.faculty}</p>
            <p class="card-text">Year of Study: ${profile.year}</p>
            <p class="card-text">Email: ${profile.email}</p>
            <p class="card-text">Birth Date: ${profile.birthdate}</p>
            <button class="btn btn-warning btn-sm square-btn" onclick="editProfile(${index})">
            <i class="fa-regular fa-folder"></i>
            </button>
            <button class="btn btn-danger btn-sm square-btn" onclick="deleteProfile(${index})">
            <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        </div>
      `;
      profileCards.appendChild(card);
    });
  }

  
function applySquareButtonStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    .square-btn {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      padding: 0;
    }
    .button-group {
      display: flex;
      justify-content: right; /* Align buttons to the right */
      gap: 10px; /* Add spacing between buttons */
    }
  `;
  document.head.appendChild(style);
}

  // Call this function to add styles when the page loads
  applySquareButtonStyles();
  
// Edit profile
function editProfile(index) {
  const profile = profiles[index];
  // Populate the form with the existing data for editing
  document.getElementById('studentName').value = profile.name;
  document.getElementById('studentID').value = profile.studentID;
  document.getElementById('program').value = profile.program;
  document.getElementById('faculty').value = profile.faculty;
  document.getElementById('year').value = profile.year;
  document.getElementById('email').value = profile.email;
  document.getElementById('birthdate').value = profile.birthdate;
  // Open modal to edit
  const modal = new bootstrap.Modal(document.getElementById('addProfileModal'));
  modal.show();
}

// Delete profile
function deleteProfile(index) {
  profiles.splice(index, 1);
  localStorage.setItem('profiles', JSON.stringify(profiles)); // Update localStorage
  renderProfiles(); // Re-render profiles
}

