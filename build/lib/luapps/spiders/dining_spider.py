import scrapy
import re
import json

class DiningSpider(scrapy.Spider):
	name = "dining"
	start_urls = [
		'https://menus.sodexomyway.com/BiteMenu/Menu?menuId=1344&locationId=97451001&whereami=http://lehigh.sodexomyway.com/dining-near-me/resident-dining'
	]

	def parse(self, response):
		data = re.findall("var nd =(.+?);", response.body.decode("utf-8"), re.S)
		obj = {}
		outp = {}
		days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
		meals = ["Breakfast", "Lunch", 'Dinner']

		if data:
			obj["main"] = json.loads(data[0])

		for i in range(len(days)):
			menuItems = obj["main"][i]['menuItems']
			outp[days[i]] = {}
			for meal in meals:
				outp[days[i]][meal] = []
			for food in menuItems:
				if food["meal"] == "Breakfast":
					outp[days[i]]["Breakfast"].append(food["formalName"])
				if food["meal"] == "Lunch":
					outp[days[i]]["Lunch"].append(food["formalName"])
				if food["meal"] == "DINNER":
					outp[days[i]]["Dinner"].append(food["formalName"])

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