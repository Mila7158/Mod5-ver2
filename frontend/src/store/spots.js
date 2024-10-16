import { csrfFetch } from './csrf';

const LOAD_SPOTS = "spots/loadSpots";
const CREATE_SPOT = "spots/createSpot";
const CREATE_SPOT_IMAGE = "spots/createSpotImage";

// Action creator for loading spots
const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

// Action creator for creating a spot
const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
});

// Thunk for fetching current user's spots
export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data.Spots));
    } else {
        console.error('Error fetching spots');
    }
};

// Thunk for creating a new spot
export const createNewSpot = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    });

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(createSpot(newSpot)); // Dispatch new spot to reducer
        return newSpot;
    } else {
        const errorData = await response.json();
        return errorData.errors; // Handle validation errors or any other issues
    }
};

export const createSpotImage = (imageData) => async (dispatch) => {
  const { spotId, url, preview } = imageData;

  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    body: JSON.stringify({ url, preview }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const image = await response.json();
    // Optionally dispatch an action if you want to manage state for images
    return image; // Return the created image
  } else {
    const errors = await response.json();
    throw errors; // Throw errors to be handled in the component
  }
};


const initialState = {};

// Reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = {};
            action.spots.forEach(spot => {
                newState[spot.id] = spot;
            });
            return newState;
        }
        case CREATE_SPOT: {
            const newState = { ...state };
            newState[action.spot.id] = action.spot;
            return newState;
        }
        default:
            return state;
    }
};

export default spotsReducer;
