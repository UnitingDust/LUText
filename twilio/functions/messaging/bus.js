var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

/**
* MORE handler, responds if user texts "more"
*    (or any uppercase variation like "MORE")
* @param {string} tel The incoming telephone number
* @param {string} body The (text) body of the message
* @param {object} from Information about the incoming message: number, zip, city, state, country
* @param {object} to Information about the receiver (your Twilio number): number, zip, city, state, country
* @returns {string}
*/
module.exports = (tel = '', body = '', from = {}, to = {}, callback) => {

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var schedule = processJSON(this.responseText, body);
            callback(null, [schedule].join('\n'));
        }
    });

    xhr.open("GET", "http://bus.lehigh.edu/scripts/busdata.php?format=json");
    xhr.send(data);


};

function processJSON(json, body) {
    var text = JSON.parse(json);

    var currentBus = null;
    var selectedBus = ""; 
    
    if (body.toLowerCase().includes("campus connector")) selectedBus = "Campus Connector";
    else if (body.toLowerCase().includes("tracs")) selectedBus = "T.R.A.C.S.";
    else if (body.toLowerCase().includes("mountaintop express")) selectedBus = "Mountaintop Express";
    else if (body.toLowerCase().includes("packer express")) selectedBus = "Packer Express"; 

    for (var i = 0; i < Object.keys(text).length; i++) { 
        var value = text[i];
        var name = value.name;

        if (selectedBus == "") {
           currentBus = value;
           break;  
        }
        
        else if (name == selectedBus) {
            currentBus = value;
            break;
        }
    }
    
    if (selectedBus == "") {
      return "Please specify which bus service you are looking for";
    }
    
    if (currentBus == null) {
        return selectedBus + " Bus isn't currently running \n";
    }

    var currentStop = currentBus.currentstop;
    if (currentStop.length == 0) currentStop = "N/A";
    var lastStop = currentBus.laststop;
    if (lastStop.length == 0) lastStop = "N/A";

    var stops = [];
        
    stops.push("Currently the bus is at " + currentStop);
    stops.push("The last stop was at " + lastStop);
    stops.push(selectedBus + " Bus Schedule: \n");

    for (var i = 0; i < Object.keys(currentBus.stops).length; i++) {
        var currentStop = currentBus.stops[i];
        
        if (i > 0 && currentStop == stops[stops.length - 1]) continue;
        
        stops.push(currentStop);

    }
    
    return stops.join('\n');
}