let email = document.querySelector("#email");
let password = document.querySelector("#password");
let btn = document.querySelector("#submitte");
let updatebtn = document.querySelector("#Update");
const userDetailContainer = document.querySelector("#user-detail");

let userdata = [];
let datais = localStorage.getItem("data");
if (datais) {
  // If data exists in localStorage, parse it and push it into userdata
  let response = JSON.parse(datais);
  userdata.push(...response);
  // console.log(userdata);
}

// console.log(userdata)
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let useremail = email.value;
  let userpassword = password.value;
  //    console.log(useremail,userpassword)
  savedata(useremail, userpassword);
  renderUserDetails();
  email.value = "";
  password.value = "";
});

function savedata(useremail, pass) {
  let data = { Uemail: useremail, Upass: pass };
  if (userdata.length === 0) {
    // If it's empty, directly push the new data into it
    userdata.push(data);
  } else {
    // If it's not empty, concatenate the new data with the existing data
    userdata = userdata.concat(data);
  }
  localStorage.setItem("data", JSON.stringify(userdata));
  //  console.log(userdata)
}

//rendring data
function renderUserDetails() {
  userDetailContainer.innerHTML = ""; // Clear previous content
  userdata.forEach((item, index) => {
    const detailParagraph = document.createElement("p");
    detailParagraph.classList.add("email-password");
    detailParagraph.textContent = `Email: ${item.Uemail}, Password: ${item.Upass}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("dltbtn");
    deleteButton.addEventListener("click", () => {
      deleteUser(index);
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("dltbtn");
    editButton.addEventListener("click", () => {
      editUser(item.Uemail, item.Upass, index);
    });

    detailParagraph.appendChild(deleteButton);
    detailParagraph.appendChild(editButton);
    userDetailContainer.appendChild(detailParagraph);
    console.log(userdata);
  });
}

function deleteUser(index) {
  userdata.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(userdata));
  renderUserDetails();
}

function editUser(Editemail, Editepass, index) {
  // Set input field values to current user details
  email.value = Editemail;
  password.value = Editepass;
  // Set the index of the currently edited user to the update button's dataset
  updatebtn.dataset.index = index;
  // Hide submit button and show update button
  btn.style.display = "none";
  updatebtn.style.display = "block";
}
updatebtn.addEventListener("click", () => {
  // Get the index of the currently edited user
  const index = parseInt(updatebtn.dataset.index);
  // Update user details in the userdata array
  userdata[index].Uemail = email.value;
  userdata[index].Upass = password.value;
  // Update localStorage
  localStorage.setItem("data", JSON.stringify(userdata));
  // Re-render user details
  renderUserDetails();
  email.value = "";
  password.value = "";
  // Show submit button and hide update button
  btn.style.display = "block";
  updatebtn.style.display = "none";
});

renderUserDetails();
