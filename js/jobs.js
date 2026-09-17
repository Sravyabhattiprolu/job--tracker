const jobsList = document.getElementById("jobs-list");
const jobMessage = document.getElementById("job-message");
const searchInput = document.getElementById("job-search");
const experienceFilter = document.getElementById("experience-filter");
const refreshButton = document.getElementById("refresh-jobs");

let liveJobs = [];

async function loadJobs(forceRefresh = false) {
  const savedJobs = localStorage.getItem("liveJobs");
  const savedTime = localStorage.getItem("liveJobsTime");
  const sixHours = 6 * 60 * 60 * 1000;

  if (!forceRefresh && savedJobs && savedTime && Date.now() - savedTime < sixHours) {
    liveJobs = JSON.parse(savedJobs);
    jobMessage.textContent = "Showing recently updated job opportunities.";
    showJobs();
    return;
  }

  try {
    jobMessage.textContent = "Loading fresh job opportunities…";

    const response = await fetch(
      "https://remotive.com/api/remote-jobs?category=software-dev&limit=50"
    );

    if (!response.ok) {
      throw new Error("Unable to load jobs");
    }

    const data = await response.json();

    liveJobs = data.jobs;

    localStorage.setItem("liveJobs", JSON.stringify(liveJobs));
    localStorage.setItem("liveJobsTime", Date.now());

    jobMessage.textContent = `${liveJobs.length} current opportunities found.`;
    showJobs();
  } catch (error) {
    jobMessage.textContent =
      "Could not load live jobs right now. Please check your internet and try again.";
  }
}

function isFresherJob(job) {
  const text = (job.title + " " + job.description).toLowerCase();

  return /intern|junior|entry.level|graduate|fresher|trainee|apprentice/.test(text);
}

function showJobs() {
  const searchText = searchInput.value.toLowerCase().trim();
  const level = experienceFilter.value;

  const filteredJobs = liveJobs.filter(function (job) {
    const searchableText =
      `${job.title} ${job.company_name} ${job.category}`.toLowerCase();

    const matchesSearch = searchableText.includes(searchText);

    const matchesLevel =
      level === "all" ||
      (level === "fresher" && isFresherJob(job)) ||
      (level === "experienced" && !isFresherJob(job));

    return matchesSearch && matchesLevel;
  });

  jobsList.innerHTML = "";

  if (filteredJobs.length === 0) {
    jobsList.innerHTML =
      "<p class='empty-message'>No jobs match your search. Try another keyword.</p>";
    return;
  }

  filteredJobs.slice(0, 12).forEach(function (job) {
    const card = document.createElement("article");
    card.className = "job-card";

    const levelText = isFresherJob(job)
      ? "Fresher / Entry level"
      : "Experienced role";

    const publishedDate = new Date(job.publication_date).toLocaleDateString();

    card.innerHTML = `
      <div class="job-card-top">
        <div>
          <p class="company-name">${job.company_name}</p>
          <h2>${job.title}</h2>
        </div>
        <span class="job-level">${levelText}</span>
      </div>

      <p class="job-details">
        📍 ${job.candidate_required_location || "Remote"}
        &nbsp; • &nbsp;
        💼 ${job.job_type || "Job type not listed"}
      </p>

      <p class="job-date">Posted: ${publishedDate}</p>

      <div class="job-actions">
        <button class="track-job" data-job-id="${job.id}">
          + Track Application
        </button>

        <a class="view-job" href="${job.url}" target="_blank">
          View & Apply ↗
        </a>
      </div>
    `;

    jobsList.appendChild(card);
  });

  addTrackButtons();
}

function addTrackButtons() {
  const trackButtons = document.querySelectorAll(".track-job");

  trackButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const jobId = Number(button.dataset.jobId);

      const selectedJob = liveJobs.find(function (job) {
        return job.id === jobId;
      });

      const savedApplications =
        JSON.parse(localStorage.getItem("applications")) || [];

      const alreadyTracked = savedApplications.some(function (application) {
        return application.company === selectedJob.company_name &&
          application.role === selectedJob.title;
      });

      if (alreadyTracked) {
        alert("This job is already in your applications list.");
        return;
      }

      savedApplications.push({
        id: Date.now(),
        company: selectedJob.company_name,
        role: selectedJob.title,
        status: "Applied",
        date: new Date().toLocaleDateString()
      });

      localStorage.setItem("applications", JSON.stringify(savedApplications));

      alert("Added to My Applications successfully.");
    });
  });
}

searchInput.addEventListener("input", showJobs);
experienceFilter.addEventListener("change", showJobs);

refreshButton.addEventListener("click", function () {
  loadJobs(true);
});

loadJobs();