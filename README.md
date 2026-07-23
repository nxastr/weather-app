# ☀ Weather App

![Weather App](assets/screenshot.png)

A responsive weather application that displays current weather data using the Open-Meteo API and is containerized with Docker and served through Nginx.

## About the project

This project was developed as a team university assignment. My responsibility was designing and implementing the frontend interface, including the responsive layout, navigation, weather cards, and authentication pages.

After completing the original project, I independently extended the application by integrating the Open-Meteo API. The application now displays current weather data for predefined cities and allows users to search for weather conditions in a chosen location.

I also containerized the application using Docker and configured Nginx to serve the static files with basic security hardening, including security headers, restricted HTTP methods, and disabled version disclosure.

## Features

- Responsive layout
- Weather dashboard interface
- Login and sign-up pages
- Mobile-friendly navigation
- Responsive weather cards
- Responsive clock component
- Modern user interface
- Current weather data from the Open-Meteo API
- City weather search
- Five predefined weather cards
- Dynamic temperature, weather description, and icon updates
- Loading and error messages
- Containerized deployment with Docker and Nginx
- Basic Nginx security hardening

## Technologies

- HTML5
- SCSS
- JavaScript
- Bootstrap 5
- OpenMeteoAPI
- Fetch API
- Docker
- Nginx

## Project structure

```text 
images/         # Images and icons 
js/             # JavaScript files 
style/          # SCSS and CSS styles 
index.html      # Main page 
log-in.html     # Login page 
sign-in.html    # Registration page 

```  

## Installation

Clone the repository:

```bash
git clone https://github.com/nxastr/weather-app.git
```

Open the project folder:

```bash
cd weather-app
```

For local frontend development, run the application using a local server such as Live Server.

## Docker

Make sure Docker Desktop is running.

Build the Docker image:

```bash
docker build -t weather-app .
```

Run the container:

```bash
docker run --name weather-app-container -p 8080:80 -d weather-app
```

Open the application in your browser:

```text
http://localhost:8080
```

Stop the container:

```bash
docker stop weather-app-container
```

Remove the container:

```bash
docker rm weather-app-container
```

## Security

The application is served through a custom Nginx configuration with basic security hardening, including:

- Content Security Policy
- Protection against clickjacking
- MIME sniffing protection
- Referrer Policy
- Permissions Policy
- Disabled Nginx version disclosure
- Restricted HTTP methods

## Future improvements

- Add a multi-day weather forecast
- Allow users to customize predefined cities
- Save selected cities in local storage
- Improve accessibility
- Containerize the application with Docker
- Optimize performance
- Add a CI/CD pipeline with GitHub Actions

## Author

**Zuzanna Chmielewska**  