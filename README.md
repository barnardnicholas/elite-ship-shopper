# Elite Ship Shopper

Find where to buy all modules for a ship build. Enter your start system (populated systems only for now), max range in lightyears (default 20), a ship if you don't already have it, and choose the modules you want to buy. Hit search to see an itinerary of systems & stations within range, with modules stocked for each one. Does not include planetary outposts.

## To use:

- Clone the repository from Github
- Navigate to project directory in terminal and run `npm install` to install packages
- Fetch and process the data for the app by running `npm run fetch-process-data`
- Start the app running locally by running `npm start`
- Open a browser and navigate to http://localhost:3000 if necessary.

## Notes:

- The app uses data from EDDB. The results gleaned from here are may not be 100% accurate due to the constraints of fetching the data.
- The app only runs locally for now, using the instructions outlined above. I am working on hosting it.

## Roadmap:

- Hosting!
- Import Coriolis builds!
