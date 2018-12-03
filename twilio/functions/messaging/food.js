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

    var cafe = "";

    if (body.toLowerCase().includes("lower cort")) cafe = "Lower Cort";
    else if (body.toLowerCase().includes("rathbone")) cafe = "Rathbone";
    else {
        callback(null, ["Please specify a dining place and type of meal"].join('\n'));
        return;
    }

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var food = processJSON(this.responseText, body, cafe);
            callback(null, [String(food)].join('\n'));
        }
    });

    if (cafe == "Rathbone") {
        xhr.open("GET", "https://storage.scrapinghub.com/items/359434/4/1");
        xhr.setRequestHeader("Authorization", "Basic ZDM3M2VlMTQxZGIxNDUwZWI2MDc2NTBhZWU0ZDZjY2U6");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "1dbe1583-0e10-41c9-99bf-59f5d2b0f147");
    } else {
        xhr.open("GET", "https://storage.scrapinghub.com/items/359434/1/1");
        xhr.setRequestHeader("Authorization", "Basic ZDM3M2VlMTQxZGIxNDUwZWI2MDc2NTBhZWU0ZDZjY2U6");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "6a4c2fe5-a758-4018-801d-1ff99a3d120e");
    }


    xhr.send(data);


};


function processJSON(json, body, cafe) {
    var option;
    var text = JSON.parse(json);

    var date = new Date();
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var estDate = new Date(date.getTime() + -300 * 60 * 1000);
    var currentDay = estDate.getDay();
    var JSONDay;

    if (currentDay == 0) {
        JSONDay = text.Sunday;
    } else if (currentDay == 1) {
        JSONDay = text.Monday;
    } else if (currentDay == 2) {
        JSONDay = text.Tuesday;
    } else if (currentDay == 3) {
        JSONDay = text.Wednesday;
    } else if (currentDay == 4) {
        JSONDay = text.Thursday;
    } else if (currentDay == 5) {
        JSONDay = text.Friday;
    } else {
        JSONDay = text.Saturday;
    }

    if (JSONDay == null)
        return null;

    var JSONFood;
    var option;

    if (body.toLowerCase().includes("breakfast")) {
        JSONFood = JSONDay.Breakfast;
        option = "Breakfast";
    } else if (body.toLowerCase().includes("lunch")) {
        JSONFood = JSONDay.Lunch;
        option = "Lunch";
    } else if (body.toLowerCase().includes("dinner")) {
        JSONFood = JSONDay.Dinner;
        option = "Dinner";
    }

    if (JSONFood.length == 0) {
        return "There is no " + option + " Menu for " + cafe + " Today";
    }

    var retval = [];
    retval.push("The " + option + " Menu at " + cafe + " today is: \n");

    for (i = 0; i < JSONFood.length && i < 20; i++) {
        retval.push(JSONFood[i]);
    }

    return retval.join('\n');

}