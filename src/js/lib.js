export function Purchase(name, category, price) {
    this.name = name;
    this.category = category;
    this.price = price;
}

function SumByCategory(category, sum) {
    this.category = category;
    this.sum = sum;
}

export function grouping(purchases) {
    let categories = [];

    nextCategory:
        for (let i = 0; i < purchases.length; i++) {
            let str = purchases[i].category;
            for (let j = 0; j < categories.length; j++) {
                if (categories[j] === str) continue nextCategory;
            }

            categories.push(str);
        }

    let group = [];

    for (let i = 0; i < categories.length; i++) {
        let total = 0;
        for (const purchase of purchases) {
            if (categories[i] === purchase.category)
                total += purchase.price;
        }
        group.push(new SumByCategory(categories[i], total));
    }

    return group;
}

export function findMostExpensivePurchase(purchases) {
    let current = purchases[0];

    for (const purchase of purchases) {
        if (current.price < purchase.price) {
            current = purchase;
        }
    }

    return current;
}

export function findMostExpensiveCategory(groups) {
    let current = groups[0];

    for (const group of groups) {
        if (current.sum < group.sum) {
            current = group;
        }
    }

    return current;
}

export function calculateTotal(purchases) {
    let total = 0;

    for (const purchase of purchases) {
        total += purchase.price;
    }

    return total;
}

export function countPurchases(purchases) {
    let count = 0;

    for (const purchase of purchases) {
        count++;
    }

    return count;
}

export function calculate(a, b) {
    const total = a + b;
    return total;
}
