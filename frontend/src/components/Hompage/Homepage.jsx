import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa"; 
import { fetchSpots } from "../../store/spots";
import './Homepage.css'; 

const Homepage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots)); 

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <div className="homepage">
            <div className="spots-container">
                {spots.map((spot) => (
                    <div key={spot.id} className="spot-tile">
                        <img src={spot.previewImage} alt={spot.name} className="spot-image" />
                        <div className="spot-details">
                            <div className="spot-details-wrapper">
                                <h3>
                                    {spot.city}, {spot.state}
                                </h3>
                                <span className="spot-rating">
                                    {Array.from({ length: 5 }, (v, i) => (
                                        <FaStar key={i} className={i < Math.round(spot.avgRating) ? 'filled-star' : 'empty-star'} />
                                    ))}
                                </span>
                            </div>
                            <div className="spot-price">${spot.price} night</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Homepage;
