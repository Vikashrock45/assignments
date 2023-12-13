/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let categories_total = {};
  transactions.forEach(transactions => {
    const categories = transactions.category;
    if (!categories_total.hasOwnProperty(categories)) {
      categories_total[categories] = 0;
    }
    categories_total[categories] = transactions.price + categories_total[categories];
  });

  let res = [];
  for (const food in categories_total) {
    res.push({
      "category": food,
      "totalSpent": categories_total[food]
    });
  }
 
  return res;
}

module.exports = calculateTotalSpentByCategory;
