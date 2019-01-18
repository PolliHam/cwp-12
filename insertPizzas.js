module.exports = async function (db) {
    return Promise.all(
        [
            db.pizzas.create({
                name: 'four seasons',
                description: 'peperoni, ham, champignons, mozzarell, basil',
                calories: 3500
            }),
            db.pizzas.create({
                name: 'country',
                description: 'american souce rancho, onion, cucumbers, champignons, basil, mozzarell',
                calories: 3000
            }),
            db.pizzas.create({
                name: 'bavarian',
                description: 'mustard, hunting sausages, bulgarian pepper, onion, tomatoes, mozzarell',
                calories: 3200
            }),
            db.pizzas.create({
                name: 'hawaiian',
                description: 'cheese sauce, ham, chicken, pineapple, mozzarell',
                calories: 2000
            }),
            db.pizzas.create({
                name: 'mushroom',
                description: 'garlic sauce, ham, champignons, mozzarella, basil',
                calories: 2300
            }) 
        ]
    )
    .then(() => {
        console.log('insert pizzas completed');        
    })
    .catch((err) => {
        console.log(err);
    })
}