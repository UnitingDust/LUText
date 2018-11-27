import scrapy

class GymSpider(scrapy.Spider):
	name = "gym"
	start_urls = [
		'https://lehighsports.com/sports/2013/6/27/GEN_0627134801.aspx'
	]

	def parse(self, response):
		for row in response.css('table tbody tr'):
			data = {}
			data['dates'] = row.css('td:nth-child(1)::text').extract_first()
			data['day'] = row.css('td:nth-child(2)::text').extract_first()
			# data['hours'] = row.css('td:nth-child(3)::text').extract_first()
			data['hours'] = ''.join(row.xpath(".//td[3]//text()").extract())
			if not data['dates']:
				continue
			yield data