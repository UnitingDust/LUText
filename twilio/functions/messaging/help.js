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

  var retval =[];
  retval.push("Welcome to the LehighText Service! \u{1F44B}");
  retval.push("Here are the following options: \n");
  
  retval.push("To get today's menu: \u{1F372}")
  retval.push("Type: 'What is for [breakfast/lunch/dinner] at [Lower Cort/Rathbone]?'\n");
  
  retval.push("To get the library hours: \u{1F4D5}");
  retval.push("Type: 'What are the library hours today?'\n");
  
  retval.push("To get Taylor Gym \u{1F4AA} hours:");
  retval.push("Type: 'What are the gym hours today?'\n");
  
  retval.push("To get the bus schedule: \u{1F68C}");
  retval.push("Type: 'Where is the [Campus Connector/T.R.A.C.S/Packer Express/Mountaintop Express] bus?'");
  
  var text = retval.join('\n');

  callback(null, [text].join('\n'));
};