module.exports = async function (db) {
    return Promise.all(
        [
            db.turtles.create({
                name: 'Leonardo',
                color: 'blue',
                weaponId: 1,
                firstFavouritePizzaId: 1,
                secondFavouritePizzaId: 2 
            }),
            db.turtles.create({
                name: 'Donatello',
                color: 'purple',
                weaponId: 2,
                firstFavouritePizzaId: 2,
                secondFavouritePizzaId: 3
            }),
            db.turtles.create({
                name: 'Mickelangelo',
                color: 'yellow',
                weaponId: 3,
                firstFavouritePizzaId: 3,
                secondFavouritePizzaId: 4
            }),
            db.turtles.create({
                name: 'Rafael',
                color: 'red',
                weaponId: 4,
                firstFavouritePizzaId: 4,
                secondFavouritePizzaId: 1
            })       
        ]
    )
    .then(() => {
        console.log('insert turtles completed');
    })
    .catch((err) => {
        console.log(err);
    })
}