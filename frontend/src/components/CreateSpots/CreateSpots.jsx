import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewSpot, createSpotImage } from "../../store/spots"; 
import './CreateSpots.css'; 

function CreateSpots() {
  const dispatch = useDispatch(); 

  const [formData, setFormData] = useState({
    country: "",
    address: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
    description: "",
    title: "",
    price: "",
    previewImageUrl: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const [errors, setErrors] = useState([]);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); 

    const spotData = {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      lat: formData.latitude || null, 
      lng: formData.longitude || null, 
      name: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
    };

    try {
      const spot = await dispatch(createNewSpot(spotData)); 
      
      
      const imageData = [
        { url: formData.previewImageUrl, preview: true },
        { url: formData.image1, preview: false },
        { url: formData.image2, preview: false },
        { url: formData.image3, preview: false },
        { url: formData.image4, preview: false },
      ];

      for (const img of imageData) {
        if (img.url) { 
          await dispatch(createSpotImage({ spotId: spot.id, ...img }));
        }
      }

      
      console.log("Spot and images created successfully");
    } catch (err) {
      console.error("Error creating spot or images:", err);
      setErrors(err.errors || [err.message]); 
    }
  };

  return (
    <div className="create-spot-container">
      <h1>Create a new Spot</h1>
      <form onSubmit={handleSubmit} className="create-spot-form">
        <div className="section">
          <h2>Where&apos;s your place located?</h2>
          <p>Guests will only get your exact address once they book a reservation.</p>

          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />

          <label>Street Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />

          <div className="city-state">
            <div>
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </div>

            <div>
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="STATE"
                required
              />
            </div>
          </div>

          <div className="latitude-longitude">
            <div>
              <label>Latitude</label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Latitude"
              />
            </div>

            <div>
              <label>Longitude</label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Longitude"
              />
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please write at least 30 characters"
            required
          ></textarea>
        </div>

        <div className="section">
          <h2>Create a title for your spot</h2>
          <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Name of your spot"
            required
          />
        </div>

        <div className="section">
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <div className="price-wrapper">
            <span>$</span>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price per night (USD)"
              required
            />
          </div>
        </div>

        <div className="section">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type="text"
            name="previewImageUrl"
            value={formData.previewImageUrl}
            onChange={handleChange}
            placeholder="Preview Image URL"
            required
          />
          <input
            type="text"
            name="image1"
            value={formData.image1}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <input
            type="text"
            name="image2"
            value={formData.image2}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <input
            type="text"
            name="image3"
            value={formData.image3}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <input
            type="text"
            name="image4"
            value={formData.image4}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>

        {errors.length > 0 && (
          <ul className="errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}

        <button type="submit" className="create-spot-button">Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpots;
