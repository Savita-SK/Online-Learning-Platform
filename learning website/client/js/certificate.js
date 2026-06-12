const apiUrl = 'http://localhost:5000/api';
const getToken = () => localStorage.getItem('token');
const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });

const certificateList = document.getElementById('certificate-list');

const loadCertificates = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    certificateList.innerHTML = '<p>Please login to view certificates.</p>';
    return;
  }

  const response = await fetch(`${apiUrl}/certificates/${userId}`, {
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    certificateList.innerHTML = '<p>Unable to load certificates.</p>';
    return;
  }

  const certificates = await response.json();
  if (!certificates.length) {
    certificateList.innerHTML = '<p>No certificates available yet.</p>';
    return;
  }

  certificateList.innerHTML = certificates
    .map(
      (certificate) => `
        <div class="certificate-card">
          <h3>${certificate.course.title}</h3>
          <p>Issued at: ${new Date(certificate.issuedAt).toLocaleDateString()}</p>
          <p><a href="${certificate.certificateUrl}">Download certificate</a></p>
        </div>
      `
    )
    .join('');
};

if (certificateList) {
  loadCertificates();
}
