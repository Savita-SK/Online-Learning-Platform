const apiUrl = 'http://localhost:5000/api';
const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const courseTitle = document.getElementById('course-title');
const courseDescription = document.getElementById('course-description');
const lessonsContainer = document.getElementById('lessons');
const enrollButton = document.getElementById('enroll-button');

const courseId = new URLSearchParams(window.location.search).get('id');

const loadCourse = async () => {
  if (!courseId) return;

  const response = await fetch(`${apiUrl}/courses/${courseId}`);
  if (!response.ok) {
    courseTitle.textContent = 'Course not found';
    courseDescription.textContent = '';
    return;
  }

  const course = await response.json();
  courseTitle.textContent = course.title;
  courseDescription.textContent = course.description;
  lessonsContainer.innerHTML = course.lessons
    .map(
      (lesson, index) => `
        <div class="lesson-item">
          <h3>Lesson ${index + 1}: ${lesson.title}</h3>
          <p>${lesson.content}</p>
        </div>
      `
    )
    .join('');
};

const enroll = async () => {
  const response = await fetch(`${apiUrl}/courses/${courseId}/enroll`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  if (!response.ok) {
    return alert(data.message || 'Could not enroll');
  }
  alert('Enrolled successfully.');
};

if (courseId) {
  loadCourse();
}

if (enrollButton) {
  enrollButton.addEventListener('click', enroll);
}
