# Job Tracker

A simple web-based Job Tracker application built with HTML, CSS and JavaScript.

The application is containerized using Docker and deployed using Render. GitHub Actions is used to automatically build and test the Docker application whenever changes are pushed to the `main` branch.

## Technologies Used

- HTML
- CSS
- JavaScript
- Nginx
- Docker
- GitHub Actions
- Render

## Project Structure

```text
job-tracker/
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── css/
├── js/
├── applications.html
├── forgot-password.html
├── index.html
├── jobs.html
├── signup.html
├── tracker.html
├── Dockerfile
├── nginx.conf
└── README.md