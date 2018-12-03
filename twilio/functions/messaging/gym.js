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

    xhr.open("GET", "https://storage.scrapinghub.com/items/359434/2/1");
    xhr.setRequestHeader("Authorization", "Basic ZDM3M2VlMTQxZGIxNDUwZWI2MDc2NTBhZWU0ZDZjY2U6");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "c0a86a23-6131-4e2b-a774-d45a9f1bee57");

    xhr.send(data);


};

function processJSON(json, body) {
    var option;
    var gym_dict = JSON.parse(json);

    var date = new Date();
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var estDate = new Date(date.getTime() + -300 * 60 * 1000);
    var currentDay = estDate.getDay();
    var currentDate = estDate.getDate();
    var currentMonth = estDate.getMonth();
    var JSONDay = '';

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var standard_timings = ['10:00am - 11:00pm', '6:30am - 11:00pm', '6:30am - 11:00pm', '6:30am - 11:00pm', '6:30am - 11:00pm', '6:30am - 10:00pm', '10:00am - 10:00pm'];

    JSONDay += months[currentMonth];
    JSONDay += ' ';
    JSONDay += currentDate;

    var in_dict = false;
    var timing = '';
    for (var i = 0; i < gym_dict.data.length; i++) {
        var row = gym_dict.data[i];

        if (row.dates.includes(JSONDay)) {
            in_dict = true;
            timing = row['hours'];
            break;
        }

    }

    var retval = [];
    retval.push("Taylor Gym Hours for today are: ");
    if (in_dict === false) {
        timing = standard_timings[currentDay];
    }
    retval.push(timing);

    return retval.join('\n');

}