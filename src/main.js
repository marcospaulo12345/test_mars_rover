const prompt = require('prompt-sync')();

require('./database/index');

const Rover = require("./rover").Rover;

async function main() {
    const rovers = ['rover1', 'rover2'];

    const plateauSize = prompt('Plateau Size (Ex: 5 5): ');

    for(var i in rovers) {
        console.log('Instructions: ', rovers[i])
        const landingPosition = prompt('Landing Position: ');
        const instrution = prompt('Instruction: ');

        const [x, y, cardinalPoint] = landingPosition.split(' ');

        let rover = new Rover(rovers[i], plateauSize.split('').map(Number), {x: x, y: y, cardinalPoint: cardinalPoint}, instrution.split(''))

        await rover.saveRover();

        const positionEnd = await rover._startCommand();

        console.log('Final Position', positionEnd.x, positionEnd.y, positionEnd.cardinalPoint);
        console.log('\n')
    }



}

main();