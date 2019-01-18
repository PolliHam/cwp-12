const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);

//todo: queries to DB
Labka();

async function Labka() {

    await db.sequelize.sync({force: true});
    await require('./insertPizzas')(db);
    await require('./insertWeapons')(db);
    await require('./insertTurtles')(db);


    //1
    console.log('*****************1*****************');
    console.log('All turtles:');    
    let result = await db.turtles.findAll();
    result.forEach((val) => {
        console.log(val.name);
    });
    console.log();

    //2
    console.log('*****************2*****************');
    console.log('favourite pizza is hawaiian');
    result = await db.turtles.findAll({
        where: {
            '$firstFavouritePizza.name$': 'hawaiian'
        },
        include: [{
            model: db.pizzas,
            as: 'firstFavouritePizza'
        }]
     })
     result.forEach((val) => {
         console.log(val.name);
     });
     console.log();

    //3
    console.log('*****************3*****************');
    console.log('unique favourite pizzas')
    result = await db.turtles.findAll({
        group: 'firstFavouritePizzaId',
        include: [{
            model: db.pizzas,
            as: 'firstFavouritePizza'
        }]
    });
    result.forEach((val) => {
        console.log(val.firstFavouritePizza.name);
    })
    console.log();

    let myTurtle = {name: "Paka", color: "black", "weaponId": 4};

    console.log('*****************4*****************');
    console.log("Insert fifth turtle");
    await db.turtles.create(myTurtle)
        .then(()=> db.turtles.findOrCreate({where: myTurtle}))
        .spread((user, created)=>{
            console.log(user.dataValues);
        });

    console.log('*****************5*****************');
    console.log("Super fat");
    await db.pizzas.update({
            description: 'description'+"SUPER FAT!"
        },
        {
            where:{
                calories:{
                    $gte: 3000
                }
            }
        }
    );
    console.log('*****************6*****************');
    console.log("There are weapons where dps more 100");
    (await db.weapons.findAll({
            where: {
                dps:{
                    $gte: 100
                }
            }
        }
    )).forEach(async (weapon)=> {console.log(weapon.name);});
    //7
    console.log('*****************7*****************');
    console.log('pizza with id=1');
     result = await db.pizzas.findAll({
         where: {
             id: 1
         }
     })
    result.forEach((val) => {
        console.log(val.name);
    })
    console.log();


    console.log('*****************8*****************');
    (await db.turtles.update({
            firstFavouritePizzaId: 2
        },
        {
            where: {
                id: 5
            }, logging: console.log
        }
    )).forEach((row) => {console.log(`Updated!`);});





}