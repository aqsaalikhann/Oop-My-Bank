import inquirer from "inquirer";
//Bank Account Class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`Withdrawal of $${amount}successful. Remaining balance: $${this.balance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    //Credit Money
    deposite(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charged if more than $100 is deposited
        }
        this.balance += amount;
        console.log(`Deposit of $${amount}successful. Remaining balance: $${this.balance}`);
    }
    //Check balance
    checkBalance() {
        console.log(`Current balance: $${this.balance}`);
    }
}
//customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//create bank account
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
//Create customers
const customers = [
    new Customer("Faizan", "ali", "male", 29, 3452398772, accounts[0]),
    new Customer("shanzey", "khan", "female", 25, 3452234772, accounts[1]),
    new Customer("aliyan", "raza", "male", 32, 3004239812, accounts[2])
];
//Function to intract with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const Customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (Customer) {
            console.log(`Welcome, ${Customer.firstName} ${Customer.lastName}`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposite", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposite":
                    const DepositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Deposite:"
                    });
                    Customer.account.deposite(DepositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to Withdraw:"
                    });
                    Customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    Customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services.Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number.please try again.");
        }
    } while (true);
}
service();
