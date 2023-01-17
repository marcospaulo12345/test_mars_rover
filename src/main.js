const prompt = require('prompt-sync')();

require('./database/index');

const Rover = require("./rover").Rover;

//get user instructions
function inputIntructions() {
    const landingPosition = prompt('Landing Position: ');
    const instrution = prompt('Instruction: ');

    const [x, y, z] = landingPosition.split(' ');

    return {instrution, x, y, z};
}

//creates and saves the Rover in the database
async function createRover(roverName, plateauSize, x, y, z, instrution) {
    let rover = new Rover(roverName, plateauSize.split(' ').map(Number), {x: Number(x), y: Number(y), direction_cardinal_compass: z}, instrution.split(''))

    await rover.saveRover();

    return new Promise((resolve, reject) => {
        if(rover) {
            resolve(rover)
        } else {
            reject('failed to create Rover')
        }
    })
}

async function main() {
    const rovers = ['rover1', 'rover2'];

    const plateauSize = prompt('Plateau Size (Ex: 5 5): ');

    for(var i in rovers) {
        console.log('Instructions: ', rovers[i])
        
        const {instrution, x, y, z} = inputIntructions();

        const rover = await createRover(rovers[i], plateauSize, x, y, z, instrution);

        //starts commands to move the Rover
        const positionEnd = await rover._startCommand();

        if(positionEnd) {
            console.log('Final Position', positionEnd.x, positionEnd.y, positionEnd.direction_cardinal_compass);
        }

        console.log('\n')
    }
}

main();