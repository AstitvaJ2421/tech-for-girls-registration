let shareClicks = Number(localStorage.getItem('shareCount')) || 0;
let submitted = localStorage.getItem('submitted') === 'true';

const shareBtn = document.getElementById('shareBtn');
const shareCount = document.getElementById('shareCount');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const thankYouMessage = document.getElementById('thankYouMessage');

function updateShareText() {
  shareCount.textContent = `Click count: ${shareClicks}/5`;
}

updateShareText();

if (submitted) {
  form.style.display = 'none';
  thankYouMessage.style.display = 'block';
}

shareBtn.addEventListener('click', () => {
  if (shareClicks >= 5) return;

  shareClicks++;
  localStorage.setItem('shareCount', shareClicks);
  updateShareText();

  const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
  const whatsappUrl = `https://wa.me/?text=${message}`;
  window.open(whatsappUrl, '_blank');

  if (shareClicks === 5) {
    alert("Sharing complete. Please continue.");
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareClicks < 5) {
    alert("Please complete WhatsApp sharing (5 clicks).");
    return;
  }

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const college = document.getElementById('college').value.trim();
  const file = document.getElementById('screenshot').files[0];

  if (!file) {
    alert("Please upload a screenshot.");
    return;
  }

  // OPTIONAL: upload file to external hosting (Cloudinary etc.)

  // send data to Google Sheets Web App
  const formData = new FormData();
  formData.append("Name", name);
  formData.append("Phone", phone);
  formData.append("Email", email);
  formData.append("College", college);
  formData.append("Screenshot", file.name);  // Placeholder — you can replace this with URL if needed

  try {
    await fetch('https://script.google.com/macros/s/AKfycbwX4Oyqz1eWZ1ret_CUs_kfvuMhOEnOTp6Fx1vhtiR1m_TY9_HxUasfhXYI_QLceXnp/exec', {
      method: 'POST',
      body: formData,
    });

    localStorage.setItem('submitted', 'true');
    form.style.display = 'none';
    thankYouMessage.style.display = 'block';
  } catch (err) {
    alert("Submission failed. Please try again.");
    console.error(err);
  }
});
