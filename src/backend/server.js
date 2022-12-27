import express from 'express';
import { Server } from "socket.io";
import http from "http";
import axios from 'axios';
import cors from 'cors';

const PORT = 3001;
const app = express();

app.use(cors());

//use coordinates to get weather info
app.get('/coordinates/:latitude/add/:longitude', (req, res) => {

    const options = {
        method: "GET",
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
            lat: req.params.latitude,
            lon: req.params.longitude,
            appid: "f19bfad4c53b82f7b0fc7f279e616325",
            format: 'json',
        }
    }

    //get desc of weather
    axios.request(options)
    .then((response) => {
        console.log("weather detected: " + response.data.weather[0].description);
        res.json(response.data.weather[0].description);
    }).catch((err) => console.log('err coords'));
})


//get coordinates of a city
app.get('/location/', (req, res) => {

    const options = {
        method: 'GET',
        url: 'https://ip-geo-location.p.rapidapi.com/ip/check',
        params: {
            format: 'json', 
        },
        headers: {
          'X-RapidAPI-Key': '520ac2d656msh3ce62ba56182b80p1c2c02jsn1fe7c483bd86',
          'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
        }
      };

    axios.request(options)
    .then((response) => {
        console.log(response.data.location);
        res.json(response.data);
    })
    .catch((error) => {
        console.log('rate limit');
    });
})


//Socket Chat
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on('user_joined', () => {
        socket.broadcast.emit("show_user", socket.id);
    })

    socket.on('send_message', (data) => {
        console.log("message recieved: " + data.message);
        socket.broadcast.emit('recieve_message', data.message);
    })
})

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})