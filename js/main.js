"use strict";

function addMonths(elem) {
	var annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;
	var months = document.getElementById(elem).getElementsByTagName('input');
	for (i = 0; i < months.length; i++) {
		x = Number(months[i].value);
		annualUseKw += x;
	}
	dailyUseKw = annualUseKw / 365;
	return dailyUseKw;
}

function sunHours() {
	var hrs;
	var theZone = document.forms.solarForm.zone.selectedIndex;
	theZone += 1;
	switch (theZone) {
		case 1: hrs = 6; break;
		case 2: hrs = 5.5; break;
		case 3: hrs = 5; break;
		case 4: hrs = 4.5; break;
		case 5: hrs = 4.2; break;
		case 6: hrs = 3.5; break;
		default: hrs = 0;
	}
	return hrs;
}

function calculatePanel() {
	var userChoice = document.forms.solarForm.panel.selectedIndex;
	var panelOptions = document.forms.solarForm.panel.options;
	var power = panelOptions[userChoice].value;
	var name = panelOptions[userChoice].text;
	return [power, name];
}

function calculateSolar() {
	var dailyUseKw = addMonths('mpc');
	var sunHoursPerDay = sunHours();
	var minKwNeeds = dailyUseKw / sunHoursPerDay;
	var realKwNeeds = minKwNeeds * 1.25;
	var realWattNeeds = realKwNeeds * 1000;
	var panelInfo = calculatePanel();
	var panelOutput = panelInfo[0];
	var panelName = panelInfo[1];
	var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
	var costPerPanel = Number(document.getElementById("cost").value);
	var totalCost = panelsNeeded * costPerPanel;
	var electricityCost = Number(document.getElementById("costPerKwh").value);
	var annualSavings = dailyUseKw * 365 * electricityCost;

	var feedback = `
        <p>Based on your average daily use of ${Math.round(dailyUseKw)} kWh, you will need to purchase ${panelsNeeded} ${panelName} solar panels to offset 100% of your electricity bill.</p>
        <h2>Additional Details</h2>
        <p>Your average daily electricity consumption: ${Math.round(dailyUseKw)} kWh per day.</p>
        <p>Average sunshine hours per day: ${sunHoursPerDay} hours.</p>
        <p>Realistic watts needed per hour: ${Math.round(realWattNeeds)} watts/hour.</p>
        <p>The ${panelName} panel you selected generates about ${panelOutput} watts per hour.</p>
        <p><strong>Estimated installation cost: $${totalCost.toFixed(2)}</strong></p>
        <p><strong>Estimated yearly savings: $${annualSavings.toFixed(2)}</strong></p>
    `;

	document.getElementById('feedback').innerHTML = feedback;
}

document.addEventListener('DOMContentLoaded', function () {
	const darkModeToggle = document.getElementById('darkModeToggle');
	const body = document.body;

	darkModeToggle.addEventListener('click', function () {
		body.classList.toggle('dark-mode');
	});
});
