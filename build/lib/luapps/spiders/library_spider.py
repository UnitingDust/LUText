import scrapy
import re
import json

class LibrarySpider(scrapy.Spider):
	name = "library"
	start_urls = [
		'https://library.lehigh.edu/about/hours-and-locations'
	]

	def parse(self, response):
		outp = {}
		curr_key = ''
		for row in response.css('#libhours > *'):
			txt = ''
			if row.css('dt'):
				txt = row.css('dt::text').extract_first()
				curr_key = txt.split(' ')[0]
				outp[curr_key] = {}
			elif row.css('dd'):
				txt = row.css('dd::text').extract_first()
				if txt[2] == ':':
					temp = txt.split(':')
					outp[curr_key][temp[0]] = ':'.join(temp[1:])
				else:
					outp[curr_key]["FM & LI"] = txt

		if outp:
			yield outp
		# for row in response.css('table tbody tr'):
		# 	data = {}
		# 	data['dates'] = row.css('td:nth-child(1)::text').extract_first()
		# 	data['day'] = row.css('td:nth-child(2)::text').extract_first()
		# 	# data['hours'] = row.css('td:nth-child(3)::text').extract_first()
		# 	data['hours'] = ''.join(row.xpath(".//td[3]//text()").extract())
		# 	if not data['dates']:
		# 		continue
		# 	yield data