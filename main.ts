
#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class customer {
  FirstName: string;
  LastName: string;
  age: number;
  gender: string;
  AccountNumber: string;
  Balance: number;
  constructor(
    a: string,
    b: string,
    c: number,
    d: string,
    e: string,
    f: number
  ) {
    this.FirstName = a;
    this.LastName = b;
    this.age = c;
    this.gender = d;
    this.AccountNumber = e;
    this.Balance = f;
  }
}
console.log(chalk.bold.bgBlueBright("PayPal"));
class myBank {
  customers: customer[] = [];
  async createAcc() {
    const { firstName, lastName, age, gender, accountNumber, balance } =
      await inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: chalk.bold.blueBright("Enter your first name:"),
        },
        {
          type: "input",
          name: "lastName",
          message: chalk.bold.blueBright("Enter your last name:"),
        },
        {
          type: "input",
          name: "age",
          message: chalk.bold.blueBright("Enter your age:"),
        },
        {
          type: "input",
          name: "gender",
          message: chalk.bold.blueBright("Enter your gender:"),
        },
        {
          type: "input",
          name: "accountNumber",
          message: chalk.bold.blueBright("Enter your new account number:"),
        },
        {
          type: "input",
          name: "balance",
          message: chalk.bold.blueBright("Add initial balance:"),
        },
      ]);
    const cus = new customer(
      firstName,
      lastName,
      age,
      gender,
      accountNumber,
      parseFloat(balance)
    );
    this.customers.push(cus);

    console.log(
      chalk.bold.italic.yellowBright(
        `congratulations, Mr/s ${cus.FirstName} ${cus.LastName} your account has been created successfully.`
      )
    );
  }
  async details() {
    const { accountNumber } = await inquirer.prompt({
      type: "input",
      name: "accountNumber",
      message: chalk.bold.cyan("Enter your account number:"),
    });
    const cus = this.customers.find((z) => z.AccountNumber === accountNumber);
    if (cus) {
      console.log(
        chalk.bold.greenBright.underline(`Account Details:
        Name: ${cus.FirstName} ${cus.LastName}
        Age: ${cus.age}
        Gender: ${cus.gender}
        Account Number: ${cus.AccountNumber}
        Balance: ${cus.Balance}`)
      );
    } else {
      console.log(chalk.bold.red(`Account not found!`));
    }
  }
  async debit() {
    const { accountNumber, amount } = await inquirer.prompt([
      {
        type: "input",
        name: "accountNumber",
        message: chalk.bold.cyan("Enter your account number:"),
      },
      {
        type: "input",
        name: "amount",
        message: chalk.bold.cyan("Enter amount to debit:"),
      },
    ]);
    const cus = this.customers.find((z) => z.AccountNumber === accountNumber);
    if (cus) {
      if (cus.Balance >= parseFloat(amount)) {
        cus.Balance -= parseFloat(amount);
        console.log(
          chalk.bold.italic.greenBright(
            `Debited ${amount} from account ${accountNumber}. New balance: ${cus.Balance}`
          )
        );
      } else {
        console.log(chalk.bold.red("Insufficient balance"));
      }
    } else {
      console.log(chalk.red.bold("Account not found:"));
    }
  }
  async credit() {
    const { accountNumber, amount } = await inquirer.prompt([
      {
        type: "input",
        name: "accountNumber",
        message: chalk.bold.cyan("Enter your account number:"),
      },
      {
        type: "input",
        name: "amount",
        message: chalk.bold.cyan("Enter amount to credit:"),
      },
    ]);
    const cus = this.customers.find((z) => z.AccountNumber === accountNumber);
    if (cus) {
      cus.Balance += parseFloat(amount);
      console.log(
        chalk.bold.italic.greenBright(
          `Credited ${amount} to account ${accountNumber}. New balance: ${cus.Balance}`
        )
      );
    } else {
      console.log(chalk.red("Account not found"));
    }
  }
  async start() {
    while (true) {
      const { choice } = await inquirer.prompt({
        type: "list",
        name: "choice",
        message: "Select an option:",
        choices: [
          "Create Account",
          "View Account Details",
          "Debit",
          "Credit",
          "Exit",
        ],
      });
      if (choice === "Create Account") {
        await this.createAcc();
      } else if (choice === "View Account Details") {
        await this.details();
      } else if (choice === "Debit") {
        await this.debit();
      } else if (choice === "Credit") {
        await this.credit();
      } else if (choice === "Exit") {
        console.log(chalk.underline.red.italic("Yor are exit"));
        process.exit();
      }
    }
  }
}
const a = new myBank();
a.start();
