Weather Application

Overview:
This is a weather application built using Vite and React that fetches real-time weather data from the OpenWeather API. The application allows users to search for any city and view the current weather conditions as well as a 5-day forecast.

Features:
Real-Time Weather Data: Displays current weather data, including temperature, humidity, and wind speed.

    5-Day Forecast: Shows weather predictions for the next five days.
    Responsive UI: The application has a user-friendly interface that adjusts according to screen sizes.

    Loading Indicator: Displays a loading spinner while fetching data from the API.
    Error Handling: Provides feedback when a city is not found or if there is an issue fetching data.

Project Structure:

weather-app/
│
├── public/
│ ├── images/
│ │ ├── clouds.png
│ │ ├── clear.png
│ │ ├── drizzle.png
│ │ ├── mist.png
│ │ ├── rain.png
│ │ ├── snow.png
│ │ ├── humidity.png
│ │ ├── wind.png
│ │ └── search.png
│ └── index.html
│
├── src/
│ ├── components/
│ │ ├── Weather/
│ │ │ ├── Weather.js
│ │ │ └── Weather.css
│ │ ├── FiveDaysPredictions/
│ │ │ ├── FiveDaysPredictions.js
│ │ │ └── FiveDaysPredictions.css
│ │ ├── EachItemCard/
│ │ │ ├── EachItemCard.js
│ │ │ └── EachItemCard.css
│ ├── App.js
│ └── index.js
│
└── README.md

Installation and Setup Instructions:
Prerequisites:
Ensure you have the following installed:
Node.js (version 12 or higher)
npm or yarn

Running the Application
Import the Project: Clone or download the project files into your IDE.

    Install Dependencies: Run the following command in your terminal to install all the necessary dependencies:
                            npm install

Start the Development Server: Use the following command to start the server:
npm run dev

Access the Application: Open your browser and navigate to http://localhost:5173 to view the weather application.

Using the Application: You can now search for any city's weather using the search bar.

Stopping the Server: Simply close the terminal to stop the server. The server will automatically stop.

Restarting the Application: If needed, you can run the application again by executing: npm run dev

Viewing Weather Data: The application will again be available at http://localhost:5173

APIs and Functionality:
OpenWeatherMap API: The application uses two different APIs from OpenWeatherMap to fetch current weather data and 5-day forecasts.
Current Weather API: Used to obtain the current weather for a specified city.
Forecast API: Used to get the weather prediction for the next five days.

API Endpoints:
Current Weather:

    https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=YOUR_API_KEY

5-Day Forecast:

    https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${cityName}&appid=YOUR_API_KEY

Error Handling:

    Try-Catch Method: Used to manage API call errors.
    Async-Await: Implemented to handle asynchronous API calls.

State Management:

    useState Hook: Used to manage and store the state for weather data, errors, and loading status.

    useEffect Hook: Utilized to fetch data, update the state, and handle side effects.

Technologies Used:

    Vite: For fast and efficient build tooling.
    React: For building the user interface.
    Fetch API: To make API calls.
    React Loader Spinner: For displaying loading indicators.
    OpenWeatherMap API: For fetching weather data.

Challenges Faced:

    Data Filtering: Filtering the forecast data to display only one forecast per day.
    Error Handling: Implementing error handling for failed API requests.
    Responsive Design: Ensuring the app is visually appealing on different devices.

Future Improvements

    Enhanced Error Messages: Provide more detailed feedback to the user when a city is not found.
    Additional Weather Data: Include more weather details like UV index, sunrise/sunset times.
    Unit Testing: Add unit tests for components to ensure reliability.

Conclusion

    This project demonstrates the ability to integrate APIs with Vite and React to build a functional and responsive weather application. It was developed with a focus on user experience, error handling, and clean code structure.

Author: Bharat Naik Badavath
Date: 21/08/2024
Program: Internship Program Submission

Feel free to reach out for any questions or clarifications regarding this project.
