LUText is a SMS Text Service that provides students various information about Lehigh University. The student just has to text 
a specific phone number a certain command to get back information.

This project has two components, data scraping and messaging. Data scraping was done via Python and the code was hosted on 
ScrapingHub. Spiders were sent out to Lehigh University's public sites to scrap the needed data. The messaging component was 
hosted on Standard Library which provided the infrastracture needed to host Twilio's API. Data is retrieved via ScrapingHub 
whenever it is needed.
