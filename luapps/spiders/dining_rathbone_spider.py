import scrapy
import re
import json

class DiningSpider(scrapy.Spider):
	name = "dining_rathbone"
	start_urls = [
		'https://menus.sodexomyway.com/BiteMenu/Menu?menuId=394&locationId=97451005&whereami=http://lehigh.sodexomyway.com/dining-near-me/rathbone'
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
				if food["meal"] == "Breakfast Diner":
					outp[days[i]]["Breakfast"].append(food["formalName"])
				if food["meal"] == "Lunch":
					outp[days[i]]["Lunch"].append(food["formalName"])
				if food["meal"] == "Dinner":
					outp[days[i]]["Dinner"].append(food["formalName"])

		if outp:
			yield outp