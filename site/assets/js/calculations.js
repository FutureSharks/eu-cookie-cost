import { toWordsReal } from './numberWords.js';

//////////////////////////////////////////
// EU variables
//////////////////////////////////////////
var euPopulation = 449200000;
// https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Digital_economy_and_society_statistics_-_households_and_individuals
// var euInternetPenetrationRate = 0.94;
var euInternetPenetrationRate = 0.90;
// GDPR policy started on 25 May, 2018
// https://eur-lex.europa.eu/content/news/general-data-protection-regulation-GDPR-applies-from-25-May-2018.html
var gdprPolicyStartDate = new Date(2018,4,25,0,0,0,0);
var gdprPolicyStartDateTime = gdprPolicyStartDate.getTime();
// I think the following numbers are more or less made up
// If you want to improve them or the calculations then open a pull request to https://github.com/FutureSharks/eu-cookie-cost
var euAverageSitesVisitedPerYearPerUser = 1200;
var euSitesWithCookiePopups = 0.85;
var euSecondsPerCookiePopup = 5;
// https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Wages_and_labour_costs
// var euAverageHourlyWage = 31.8;
var euAverageHourlyWage = 25;
var cookieCostPerYear = calculateCostPerYear()
var cookieCostPerSecond = cookieCostPerYear / 365 / 24 / 60 / 60
var cookieCostPerMilliSecond = cookieCostPerSecond / 1000

//////////////////////////////////////////
// Other variables
//////////////////////////////////////////
var pageLoadDate = new Date();
var pageLoadDateTime = pageLoadDate.getTime();
var updateTimer;
var totalCostInBigWords =  getCostInBigWords();

//////////////////////////////////////////
// Functions
//////////////////////////////////////////

function numberWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function calculateTotalSecondsClickingPopupsPerYear() {
    var result = euPopulation * euInternetPenetrationRate * euAverageSitesVisitedPerYearPerUser * euSitesWithCookiePopups * euSecondsPerCookiePopup;
    return result;
}

function calculateEuWagePerSecond() {
    var euAverageWagePerSecond = euAverageHourlyWage / 60 / 60;
    return euAverageWagePerSecond;
}

function calculateCostPerYear() {
    var result = calculateTotalSecondsClickingPopupsPerYear() * calculateEuWagePerSecond();
    return result;
}

function getCurrentTotalCost() {
    var nowDate = new Date();
    var nowDateTime = nowDate.getTime();
    var milliSecondsSincePolicyStarted = Math.round((nowDateTime-gdprPolicyStartDateTime));
    var result = Math.round(cookieCostPerMilliSecond*milliSecondsSincePolicyStarted);
    return result;
}

function getCurrentCostSincePageLoad() {
    var nowDate = new Date();
    var nowDateTime = nowDate.getTime();
    var milliSecondsSincePageLoad = Math.round((nowDateTime-pageLoadDateTime));
    var result = Math.round(cookieCostPerMilliSecond*milliSecondsSincePageLoad);
    return result;
}

function updateCost() {
    var totalCost = getCurrentTotalCost()
    var costSincePageLoad = getCurrentCostSincePageLoad()
    document.getElementById("total-cookie-cost").innerHTML = numberWithCommas(totalCost);
    document.getElementById("page-load-cookie-cost").innerHTML = numberWithCommas(costSincePageLoad);
}

function getCostInBigWords() {
    var totalCost = getCurrentTotalCost();
    var totalCostWords = toWordsReal(totalCost, true);
    var totalCostBigWords = totalCostWords.slice(0, 1)
    return totalCostBigWords.toString().replace(",", "") + " euros";
}

updateTimer = setInterval(updateCost, 100);

window.onload = function(){
    document.getElementById('big-number').innerHTML = totalCostInBigWords;
    document.getElementById('big-number-again').innerHTML = totalCostInBigWords;
};
