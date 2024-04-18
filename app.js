import chalk from "chalk";
import inquirer from "inquirer";
import chalkanimation from "chalk-animation";
const sleep = (ms = 2000) => new Promise(resolve => setTimeout(resolve, ms));
const wellcome = chalkanimation.rainbow("WellCome To My Currency Converter");
await sleep();
wellcome.stop();
let apiLink = "https://v6.exchangerate-api.com/v6/943c89ddff9e557b9f0ed2e4/latest/PKR";
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apiLink);
let countries = Object.keys(data);
async function converter() {
    const currencyConverter = await inquirer.prompt([
        {
            name: "from",
            type: "list",
            message: chalk.magentaBright.bold("Select the currency you're converting from:"),
            choices: countries
        },
        {
            name: "to",
            type: "list",
            message: chalk.magentaBright.bold("\nSelect the currency you're converting to:"),
            choices: countries
        },
        {
            name: "amount",
            type: "number",
            message: chalk.blueBright.italic("\nEnter your amount:")
        }
    ]);
    // function for Converted currency
    let conversionRates = `https://v6.exchangerate-api.com/v6/943c89ddff9e557b9f0ed2e4/pair/${currencyConverter.from}/${currencyConverter.to}`;
    let conversionRatesData = async (data) => {
        let conversionRatesData = await fetch(data);
        let res = await conversionRatesData.json();
        return res.conversion_rate;
    };
    let conversionAmount = await conversionRatesData(conversionRates);
    let convertedAmount = currencyConverter.amount * conversionAmount;
    console.log(`your ${currencyConverter.from}amount converted to ${currencyConverter.to} = ${chalk.redBright.italic(convertedAmount)}`);
}
converter();
