class ShoppingBasket {
    constructor() {
        this.items = [];
    }

    addItem(quantity, name, price, isImported, isExempt) {
        this.items.push({
            quantity,
            name,
            price,
            isImported,
            isExempt,
        });
    }

    calculateSalesTax(price, taxRate) {
        const rawTaxAmount = (price * taxRate) / 100;
        const roundedTaxAmount = this.roundUpToNearest(rawTaxAmount);
        return roundedTaxAmount;
    }

    roundUpToNearest(amount) {
        return Math.ceil(amount / 0.05) * 0.05;
    }

    printReceipt() {
        let total = 0;
        let totalTaxes = 0;

        this.items.forEach(item => {
            const { quantity, name, price, isImported, isExempt } = item;
            let salesTax = 0;

            if (!isExempt && !isImported) {
                salesTax += this.calculateSalesTax(price, 10);
            }

            if (!isExempt && isImported) {
                salesTax += this.calculateSalesTax(price, 15);
            }

            if (isImported && isExempt) {
                salesTax += this.calculateSalesTax(price, 5);
            }
            const totalWithTax = (price + salesTax) * quantity;
            total += totalWithTax;
            totalTaxes += salesTax * quantity;

            console.log(`${quantity} ${name}: ${totalWithTax.toFixed(2)}`);
        });

        console.log(`Sales Taxes: ${totalTaxes.toFixed(2)}`);
        console.log(`Total: ${total.toFixed(2)}`);
    }
}

// Test cases
const basket1 = new ShoppingBasket();
basket1.addItem(2, 'book', 12.49, false, true);
basket1.addItem(1, 'music CD', 14.99, false, false);
basket1.addItem(1, 'chocolate bar', 0.85, false, true);
console.log('Output 1:');
basket1.printReceipt();
console.log('');

const basket2 = new ShoppingBasket();
basket2.addItem(1, 'imported box of chocolates', 10.00, true, true);
basket2.addItem(1, 'imported bottle of perfume', 47.50, true, false);
console.log('Output 2:');
basket2.printReceipt();
console.log('');

const basket3 = new ShoppingBasket();
basket3.addItem(1, 'imported bottle of perfume', 27.99, true, false);
basket3.addItem(1, 'bottle of perfume', 18.99, false, false);
basket3.addItem(1, 'packet of headache pills', 9.75, false, true);
basket3.addItem(3, 'box of imported chocolates', 11.25, true, true);
console.log('Output 3:');
basket3.printReceipt();
