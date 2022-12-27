import React from 'react';
import axios from 'axios';

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            city: "",
            state: ""
        }
    }

    componentDidMount() {
        this.locateUser();
    }

    locateUser = async () => {
        const config = {
            method: 'GET',
            url: 'http://192.168.1.79:3001/location/'
        }

        const location = await axios.request(config);
        this.setState({
            city: location.data.city.name,
            state: location.data.area.name,
        })
    }

    render() {
        return(
            <div className="map-screen">
                <iframe
                    id="map-view"
                    className="map-view"
                    width="850px"
                    height="600px"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAxrGSdDukOL15sBwLLANcanGnQD8KJzaw&q=${this.state.city}, ${this.state.state}&zoom=50`}>
                </iframe>
            </div>
        )
    }
}
export default Map;