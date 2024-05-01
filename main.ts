#!/usr/bin/env node
import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
import chalk from "chalk";

class Customer {
    constructor(
        public firstName: string,
        public lastName: string,
        public age: number,
        public gender: string,
        public mobNum: number,
        public accNum: number
    ) {}
}

interface BankAccount {
    accNum: number;
    balance: number;
}

class Bank {
    customers: Customer[] = [];
    accounts: BankAccount[] = [];

    addCustomer(customer: Customer) {
        this.customers.push(customer);
        this.addAccountNo({ accNum: customer.accNum, balance: 1000000 });
    }

    addAccountNo(account: BankAccount) {
        this.accounts.push(account);
    }

    findAccount(accNum: number): BankAccount | undefined {
        return this.accounts.find(acc => acc.accNum === accNum);
    }

    displayBalance(accNum: number) {
        const account = this.findAccount(accNum);
        if (account) {
            const customer = this.customers.find(c => c.accNum === accNum);
            console.log(`Dear ${chalk.green.bold(customer?.firstName + " " + customer?.lastName)}! Your account balance is Rs ${chalk.blue.bold(account.balance)}`);
        } else {
            console.log(chalk.red.bold("Invalid account number!"));
        }
    }

    withdraw(accNum: number, amount: number) {
        const account = this.findAccount(accNum);
        if (account) {
            if (amount > account.balance) {
                console.log(chalk.red.bold("You have insufficient balance"));
            } else {
                account.balance -= amount;
                console.log(chalk.green.bold("Withdrawal successful!"));
                console.log(`New balance: Rs ${chalk.blue.bold(account.balance)}`);
            }
        } else {
            console.log(chalk.red.bold("Invalid account number!"));
        }
    }

    deposit(accNum: number, amount: number) {
        const account = this.findAccount(accNum);
        if (account) {
            account.balance += amount;
            console.log(chalk.green.bold("Deposit successful!"));
            console.log(`New balance: Rs ${chalk.blue.bold(account.balance)}`);
        } else {
            console.log(chalk.red.bold("Invalid account number!"));
        }
    }
}

const myBank = new Bank();

for (let i = 1; i <= 3; i++) {
    const fName = faker.person.firstName();
    const lName = faker.person.lastName();
    const num = parseInt(faker.phone.number("923#########"));
    const customer = new Customer(fName, lName, 20 * i, "male", num, 1000 + i);
    myBank.addCustomer(customer);
}

async function bankService(bank: Bank) {
    do {
        const { select } = await inquirer.prompt({
            type: "list",
            name: "select",
            message: "Please select the service:",
            choices: ["Check Balance", "Withdraw", "Deposit", "Exit"]
        });

        if (select === "Exit") {
            console.log("Thank you for using our services. Have a great day!");
            break;
        }

        const { accNum } = await inquirer.prompt({
            type: "input",
            name: "accNum",
            message: "Enter your account number:"
        });

        switch (select) {
            case "Check Balance":
                bank.displayBalance(parseInt(accNum));
                break;
            case "Withdraw":
                const { withdrawAmount } = await inquirer.prompt({
                    type: "number",
                    name: "withdrawAmount",
                    message: "Enter the withdrawal amount:"
                });
                bank.withdraw(parseInt(accNum), withdrawAmount);
                break;
            case "Deposit":
                const { depositAmount } = await inquirer.prompt({
                    type: "number",
                    name: "depositAmount",
                    message: "Enter the deposit amount:"
                });
                bank.deposit(parseInt(accNum), depositAmount);
                break;
        }
    } while (true);
}

bankService(myBank);
