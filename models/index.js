const Turtle = require('./turtle');
const Weapon = require('./weapon');
const Pizza = require('./pizza');


module.exports = (Sequelize, config) => {
    //todo: create object for connecting to db-sequelize
    const sequelize = new Sequelize(config.db,
        config.login,
        config.password,
        {
            host: config.host,
            dialect: config.dialect,
            logging: false
        });
    sequelize.authenticate()
        .then(() => {
            console.log('Success');
        }).catch((err) => {
            console.log('error in connecting', err);
        })

    const turtles = Turtle(Sequelize, sequelize);
    const weapons = Weapon(Sequelize, sequelize);
    const pizzas = Pizza(Sequelize, sequelize);

    //todo: creating relations between tables
    turtles.belongsTo(pizzas, {
        foreignKey: 'firstFavouritePizzaId', 
        as: 'firstFavouritePizza'
    });
    turtles.belongsTo(pizzas, {
        foreignKey: 'secondFavouritePizzaId',
        as: 'secondFavouritePizza'
    });
    turtles.belongsTo(weapons, {
        foreignKey: 'weaponId',
        as: 'weapon'
    })

    return{
        turtles,
        weapons,
        pizzas,

        sequelize: sequelize,
        Sequelize: Sequelize
    };
};