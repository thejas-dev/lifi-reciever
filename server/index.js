const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const app = express();
const SerialPort =require('serialport');
const parsers = SerialPort.parsers;

app.use(cors());
app.use(express.json());

let PORT = 3001;

const parser = new parsers.Readline({
    delimiter: '\r\n'
});

const port = new SerialPort(
    '//./COM5',{
    baudRate: 9600,
    autoOpen:true
});
port.pipe(parser)

app.get('/',(req,res)=>{
	res.send(`<h1>Hello</h1>`)
})



const server = app.listen(PORT,()=>{
	console.log(`Server Started on ${PORT} `);
})

const io= socket(server,{
	cors:{
		origin:"http://192.168.1.5:3000",
		methods: ["GET","POST"],
		allowedHeaders:["my-custom-header"],
		credentials:true,
	},
});

io.on("connection",(socket)=>{
	global.chatSocket = socket;
	console.log("member connected");
	socket.on("data",({data})=>{
		console.log(data)
		port.write(data,function(err) {
			if(err){
				return console.log("Error: ")
			}
		})
	})
})

parser.on('data', function(data) {
    console.log(data);
    
    io.emit('data', data);
});