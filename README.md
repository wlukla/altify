# &#129505; Altify - alternative Spotify client

[View deployed app](https://altify.herokuapp.com)

<img src="https://i.imgur.com/ItF7OBx.png" alt="Altify screenshot" width="250"> <img src="https://i.imgur.com/HZzpUbt.png" alt="Altify screenshot" width="250">

## Tech stack:

- TypeScript
- React
- styled-components
- recoil.js

## Prerequisites

You will need `node` and `yarn` installed globally on your machine

## Installation and Setup Instructions

1. Create Spotify app at [Spotify for Developers](https://developer.spotify.com/dashboard/)
2. In app settings add `http://localhost:4000/login` to the list of Redirect URIs
3. Clone this repo
4. Add `.env` file in project root
5. Copy contents from `.env.example` to newly created `.env`
6. Replace `YOUR_SPOTIFY_APP_CLIENT_ID` with your created Spotify client id
7. Run `yarn` in project root to install dependencies
8. Run `yarn dev` to start a local server
