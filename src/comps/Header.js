import React from 'react';
import Weather from "./Weather";
import ChatBox from "./ChatBox";
import Map from './Map';

const Header = () => {
    
    return(
        <div className="dragon-bg">
            <div className="header">
                <img id="tail-fg" src="./dragon-tail-1.png" />
                <img id="dragon-head" src="./dragon-full.png" />
                <img id="cloud-1" src="./Vectorcloud-1.png" />
                <img id="cloud-2" src="./Vectorcloud-3.png" />
                <img id="cloud-3" src="./Vectorcloud-2.png" />
                <h1 id="title-txt">TETHER</h1>
                <img id="tail-bg" src="./dragon-tail-2.png" />
            </div>
            <section>
                <Weather />
                <div className="game-sect">
                    <Map />
                    <ChatBox />
                </div>
            </section>
        </div>
    )
}
export default Header;
