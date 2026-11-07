function registerStudent(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const student = { name, id, room: "", feePaid: 0 };
  localStorage.setItem(`student-${id}`, JSON.stringify(student));
  alert("Student registered!");
}

function allocateRoom(event) {
  event.preventDefault();
  const id = document.getElementById('allocId').value;
  const room = document.getElementById('roomNo').value;
  const student = JSON.parse(localStorage.getItem(`student-${id}`));
  if (student) {
    student.room = room;
    localStorage.setItem(`student-${id}`, JSON.stringify(student));
    alert("Room allocated!");
  } else {
    alert("Student not found.");
  }
}

function submitFee(event) {
  event.preventDefault();
  const id = document.getElementById('feeId').value;
  const amount = parseInt(document.getElementById('amount').value);
  const student = JSON.parse(localStorage.getItem(`student-${id}`));
  if (student) {
    student.feePaid += amount;
    localStorage.setItem(`student-${id}`, JSON.stringify(student));
    alert("Fee submitted!");
  } else {
    alert("Student not found.");
  }
}

function deleteStudent(id) {
  localStorage.removeItem(`student-${id}`);
  alert(`Student with ID ${id} deleted.`);
  location.reload();
}


function viewRecords() {
  const container = document.getElementById('recordContainer');
  container.innerHTML = "<h3>Registered Students</h3>";
  for (let key in localStorage) {
    if (key.startsWith("student-")) {
      const s = JSON.parse(localStorage.getItem(key));
      container.innerHTML += `<p>${s.name} | ID: ${s.id} | Room: ${s.room} | Fee: ₹${s.feePaid}
      <button onclick="deleteStudent('${s.id}')">Delete</button></p>`;
    }
  }

  container.innerHTML += "<h3>Complaints</h3>";
  const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
  complaints.forEach((c, i) => {
    container.innerHTML += `<p>ID: ${c.id} → ${c.complaint}
    <button onclick="deleteComplaint(${i})">Delete</button></p>`;
  });
}