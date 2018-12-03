import scrapy

class GymSpider(scrapy.Spider):
	name = "gym"
	start_urls = [
		'https://lehighsports.com/sports/2013/6/27/GEN_0627134801.aspx'
	]

	def parse(self, response):
		output = {}
		data = []
		for row in response.css('table tbody tr'):
			temp = {}
			temp['dates'] = row.css('td:nth-child(1)::text').extract_first()
			# data['hours'] = row.css('td:nth-child(3)::text').extract_first()
			temp['hours'] = ''.join(row.xpath(".//td[3]//text()").extract())
			if not temp['dates']:
				continue
			if "Regular Hours" in temp['hours']:
				continue	

			# hardcoding some changes
			if 'August 28' in temp['dates']:
				temp['dates'] = "August 28, August 29, August 30, August 31"
				data.append(temp)
				continue
			if 'December 29' in temp['dates']:
				temp['dates'] = "December 29, December 30, December 31, January 1, January 2"
				data.append(temp)
				continue

			# changing the format of all other date ranges
			temp['hours'] = temp['hours'].replace(u'\xa0', '').replace('\n', '').replace('\t', '').replace('\r', ' ').strip()
			temp['dates'] = temp['dates'].replace(u'\xa0', '').strip()
			if '-' in temp['dates']:
				target_string = temp['dates']
				arr = target_string.split(' ')
				arr = arr[:-1] + arr[-1].split('-')

				month = arr[0]
				start_date = int(arr[1])
				end_date = int(arr[2])

				dates_list = []
				for i in range(start_date, end_date + 1):
					dates_list.append(month + " " + str(start_date))
					start_date += 1
				temp['dates'] = ', '.join(dates_list)
				print(temp['dates'])

			data.append(temp)
		
		output["data"] = data
		yield output