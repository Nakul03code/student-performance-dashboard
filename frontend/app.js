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

          borderWidth: 1,

          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
          ],
        },
      ],
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

    div.style.marginBottom = '10px';

    div.innerHTML = `
      <p>
        <strong>${student.name}</strong>
        - ${student.subject}
        - ${student.marks}

        <button onclick="updateStudent('${student._id}')">
          Update
        </button>

        <button onclick="deleteStudent('${student._id}')">
          Delete
        </button>
      </p>
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