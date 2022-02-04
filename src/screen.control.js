var net = require('net');

var HOST = '192.168.35.161';
var PORT = 1515;

// Get Power State 01: [0xAA, 0x11, 0x01, 0x00, 0x12]
// Set Power State 01: [0xAA, 0x11, 0x01, 0x01, 0x13]
// Turn Power Off 01:  [0xAA, 0x11, 0x01, 0x01, 0x00, 0x13]
// Turn Power On 01:   [0xAA, 0x11, 0x01, 0x01, 0x01, 0x14]

let CMD_POWER = function (id, mode) {
	let bytes = [0xAA, 0x11, 0x01, 0x01, 0x01, 0x14];

}

var bytes = [0xAA, 0x11, 0x01, 0x01, 0x01, 0x14]; //[0xAA, 0x00, 0x01, 0x00, 0x01]; //[0xAA, 0xFF, 0x01, 0x01, 0x00, 0x14];
var hexVal = new Uint8Array(bytes);

var client = new net.Socket();

console.log("Single Screen Control v1");

client.connect(PORT, HOST, function(e) {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    console.log('Sending ', hexVal);
    client.write(hexVal);
});

client.on('data', function(data) { // 'data' is an event handler for the client socket, what the server sent
    console.log('DATA: ', typeof data, data);
    client.destroy(); // Close the client socket completely

});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
