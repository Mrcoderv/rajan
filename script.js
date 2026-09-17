const contentFiles = {
  profile: 'content/profile.json',
  certificates: 'content/certificate.json',
  education: 'content/education.json'
};

const setProfileContent = (profile) => {
  document.querySelectorAll('[data-profile]').forEach((element) => {
    const key = element.dataset.profile;
    if (profile[key]) {
      element.textContent = profile[key];
      if (element.tagName === 'A' && key === 'email') element.href = `mailto:${profile[key]}`;
    }
  });
  const skills = document.querySelector('[data-skills]');
  skills.innerHTML = (profile.skills || []).map((skill) => `<span>${skill}</span>`).join('');
};

const renderCertificates = (certificates) => {
  document.querySelector('[data-certificates]').innerHTML = certificates.map((certificate) => `
    <article class="certificate">
      <div><div class="certificate-top"><span>${certificate.issuer}</span><span>${certificate.date}</span></div>
      <h3>${certificate.title}</h3><p>Credential ID: ${certificate.credentialId}</p></div>
      <a class="credential" href="${certificate.url}" target="_blank" rel="noreferrer">View credential ↗</a>
    </article>`).join('');
};

const renderEducation = (education) => {
  document.querySelector('[data-education]').innerHTML = education.map((item) => `
    <article class="education-item"><time>${item.period}</time><div><h3>${item.degree}</h3><p>${item.description}</p></div><span class="institution">${item.institution}</span></article>`).join('');
};

const loadContent = async () => {
  const [profile, certificates, education] = await Promise.all(Object.values(contentFiles).map((file) => fetch(file).then((response) => response.json())));
  setProfileContent(profile); renderCertificates(certificates); renderEducation(education);
  document.querySelector('#copy-email-btn').addEventListener('click', async (event) => {
    await navigator.clipboard.writeText(profile.email);
    event.currentTarget.textContent = 'Copied';
    setTimeout(() => { event.currentTarget.textContent = 'Copy email'; }, 1800);
  });
};

loadContent().catch((error) => console.error('[portfolio] Could not load editable content:', error));
