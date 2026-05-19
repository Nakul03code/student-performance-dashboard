const form =
  document.getElementById('studentForm');

const chartCanvas =
  document.getElementById('myChart');

let chart;

async function loadChart() {

  const response =
    await fetch('http://localhost:3000/students');

  const students =
    await response.json();

  const labels =
    students.map(student => student.name);

  const marks =
    students.map(student => student.marks);

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(chartCanvas, {

    type: 'bar',

    data: {

      labels: labels,

      datasets: [
        {
          label: 'Student Marks',

          data: marks,

          backgroundColor: [
            '#60a5fa',
            '#f472b6',
            '#34d399',
            '#fbbf24',
            '#a78bfa',
            '#fb7185',
          ],

          borderWidth: 1,
        },
      ],
    },

    options: {

      responsive: true,

      maintainAspectRatio: false,

      scales: {

        y: {
          beginAtZero: true,

          ticks: {
            color: 'white',
          },
        },

        x: {
          ticks: {
            color: 'white',
          },
        },
      },

      plugins: {

        legend: {
          labels: {
            color: 'white',
          },
        },
      },
    },
  });

  renderStudents(students);
}

function renderStudents(students) {

  const studentList =
    document.getElementById('studentList');

  studentList.innerHTML = '';

  students.forEach(student => {

    const div =
      document.createElement('div');

    div.classList.add('student-item');

    div.innerHTML = `

      <div class="student-details">

        <strong>${student.name}</strong>

        • ${student.subject}

        • ${student.marks} Marks

      </div>

      <div class="actions">

        <button
          class="update-btn"
          onclick="updateStudent('${student._id}')"
        >
          Update
        </button>

        <button
          class="delete-btn"
          onclick="deleteStudent('${student._id}')"
        >
          Delete
        </button>

      </div>
    `;

    studentList.appendChild(div);
  });
}

async function updateStudent(id) {

  const newMarks =
    prompt('Enter new marks');

  if (!newMarks) return;

  await fetch(
    `http://localhost:3000/students/${id}`,
    {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        marks: Number(newMarks),
      }),
    },
  );

  loadChart();
}

async function deleteStudent(id) {

  const confirmDelete =
    confirm('Delete this student?');

  if (!confirmDelete) return;

  await fetch(
    `http://localhost:3000/students/${id}`,
    {
      method: 'DELETE',
    },
  );

  loadChart();
}

form.addEventListener(
  'submit',
  async (e) => {

    e.preventDefault();

    const student = {

      name:
        document.getElementById('name').value,

      subject:
        document.getElementById('subject').value,

      marks:
        Number(
          document.getElementById('marks').value
        ),
    };

    await fetch(
      'http://localhost:3000/students',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(student),
      },
    );

    form.reset();

    loadChart();
  },
);

loadChart();