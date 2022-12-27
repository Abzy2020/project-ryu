import React from "react";
import axios from 'axios';


const Weather = () => {
    
    const bottomRef = React.useRef();

    function handleScroll() {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
    const [description, setDescription] = React.useState('');
    
    const getLocation = async () => {
        try {
            const getData = await axios.get(`http://192.168.1.79:3001/coordinates/${latitude}/add/${longitude}`);
            
            console.log(getData.data);
            setDescription(prevDescription => prevDescription = getData.data);
        } catch (err) {
            console.log(err);
        }
        handleScroll();
    }

    const getLongAndLat = async () => {
        try {
            const getData = await axios.get(`http://192.168.1.79:3001/location/`);

            setLongitude(prevLongitude => prevLongitude = getData.data.location.longitude);
            setLatitude(prevLatitude => prevLatitude = getData.data.location.latitude);
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        getLongAndLat();
    }, [])


    return (
        <div className="weather" >
            <span>Your longitude and latitude coordinates are:</span>
            <span id="coords">{latitude}, {longitude}</span>
            <div className="btn">
                <button id="weather-btn" onClick={getLocation}>start</button>
            </div>
            <span id="desc" ref={bottomRef}>{description.toUpperCase()}</span>
        </div>    
    )
}
export default Weather;