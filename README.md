# Job Tracker

A beginner-friendly web application for tracking internship and job applications. Users can create a local demo account, sign in, add applications, and browse live remote job opportunities.

## Features

- Create a demo account and sign in
- Keep a browser session until logout
- Add companies, roles, and application status
- View saved applications
- Browse live remote job opportunities
- Track a job from the jobs page

## Technologies

- HTML
- CSS
- JavaScript
- Nginx
- Docker

## Run locally with Live Server

1. Open the project folder in VS Code.
2. Open `index.html`.
3. Click **Go Live** in the bottom-right corner of VS Code.
4. Open the address shown by Live Server, normally `http://127.0.0.1:5500`.

## Run locally with Docker

### Prerequisites

- Docker Engine must be running.
- On Windows, Docker can run through WSL 2.

### Build the image

From the project folder, run:

```bash
sudo docker build -t job-tracker .
```

### Start the container

```bash
sudo docker run --rm -p 8080:80 job-tracker
```

Open the application in a browser:

```text
http://localhost:8080
```

### Stop the container

In the terminal that is running Docker, press `Ctrl + C`.

## Docker setup

The project uses the `nginx:alpine` image. Docker copies the website files into Nginx and exposes port `80` inside the container. Port `8080` on the computer is connected to port `80` in the container.

```text
Browser: localhost:8080
        -> Docker container: port 80
        -> Nginx serves the website
```

## Environment and account note

This is a frontend learning project. Account details, login state, and applications are stored in the browser using `localStorage`.

- Data stays in the same browser and same website address.
- `127.0.0.1:5500` and `localhost:8080` have separate browser storage.
- This is not a secure production authentication system.
- A future production version should use a backend and database, with passwords securely hashed.

## Deployment plan

The next DevOps steps are:

1. Put this repository on GitHub.
2. Deploy the static website using GitHub Pages.
3. Add GitHub Actions to automatically build the Docker image and deploy after code is pushed.

## Project structure

```text
job-tracker/
├── css/                 # Website styles
├── js/                  # JavaScript logic
├── index.html           # Sign-in page
├── signup.html          # Create-account page
├── tracker.html         # Main dashboard
├── applications.html    # Saved applications page
├── jobs.html            # Job opportunities page
├── Dockerfile           # Docker configuration
├── nginx.conf           # Nginx web-server configuration
└── README.md            # Project instructions
```
