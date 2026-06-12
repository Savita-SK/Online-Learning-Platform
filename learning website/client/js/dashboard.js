const apiUrl = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const logoutButton = document.getElementById('logout-button');
const courseList = document.getElementById('course-list');
const progressList = document.getElementById('progress-list');

const redirectToLogin = () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
};

const fetchCourses = async () => {
  const response = await fetch(`${apiUrl}/courses`);
  if (response.ok) {
    return await response.json();
  }
  return [];
};

const fetchProgress = async () => {
  const response = await fetch(`${apiUrl}/progress`, {
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    return await response.json();
  }
  if (response.status === 401) redirectToLogin();
  return [];
};

const renderCourses = (courses) => {
  if (!courses.length) {
    courseList.innerHTML = '<p>No courses available.</p>';
    return;
  }

  courseList.innerHTML = courses
    .map(
      (course) => `
        <div class="course-item">
          <h3>${course.title}</h3>
          <p>${course.description}</p>
          <a href="course.html?id=${course._id}">View course</a>
        </div>
      `
    )
    .join('');
};

const renderProgress = (progress) => {
  if (!progress.length) {
    progressList.innerHTML = '<p>No progress yet.</p>';
    return;
  }

  progressList.innerHTML = progress
    .map(
      (item) => `
        <div class="progress-item">
          <h4>${item.course.title}</h4>
          <p>Completed lessons: ${item.completedLessons.length}</p>
          <p>Quiz score: ${item.quizScore}</p>
        </div>
      `
    )
    .join('');
};

const initDashboard = async () => {
  if (!getToken()) return redirectToLogin();

  const [courses, progress] = await Promise.all([fetchCourses(), fetchProgress()]);
  renderCourses(courses);
  renderProgress(progress);
};

if (logoutButton) {
  logoutButton.addEventListener('click', redirectToLogin);
}

if (courseList && progressList) {
  initDashboard();
}
