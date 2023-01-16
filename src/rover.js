const RoverModel = require('./models/Rover');
const LogDirection = require('./models/LogDirection');

class Rover {
    constructor(name, plateau, landingPosition, instrutions){
        this.name = name;
        this.plateau = plateau;
        this.position = landingPosition;
        this.instrutions = instrutions;
        this.id = null;
    }

    async _startCommand() {
        
        for (var i = 0; i < this.instrutions.length; i++){
            if (this.instrutions[i] === 'L') {
                this.#changeDirection('L');
            } else if (this.instrutions[i] === 'R') {
                this.#changeDirection('R');
            } else {
                this._moveRover();
            }

            await this.#saveLog(this.id);
        }

        return new Promise((resolve, reject) => {
            resolve(this.position),
            reject('Invalid Command')
        })

    }

    // move the Rover across the Plateau
    _moveRover() {
        // replacing if/else with key-value in object
        const move = {
            "N": () => this.position.y = Number(this.position.y) + 1,
            "E": () => this.position.x = Number(this.position.x) + 1,
            "S": () => this.position.y = Number(this.position.y) - 1,
            "W": () => this.position.x = Number(this.position.x) - 1,
        };
        move[this.position.direction_cardinal_compass]();
    }

    // change the direction of the Rover
    #changeDirection(direction) {
        if (direction === 'L') {
            this.position.direction_cardinal_compass = this.#changeDirectionForLeft(this.position.direction_cardinal_compass)
        } else {
            this.position.direction_cardinal_compass = this.#changeDirectionForRight(this.position.direction_cardinal_compass)
        }
    }

    #changeDirectionForRight(direction) {
        let rightPosition = {
            N: 'E', 
            E: 'S', 
            S: 'W', 
            W: 'N', 
        }

        return rightPosition[direction];
    }

    #changeDirectionForLeft(direction) {
        let leftPosition = {
            N: 'W', 
            W: 'S', 
            S: 'E', 
            E: 'N', 
        }

        return leftPosition[direction];
    }

    // Save rover on BD
    async saveRover() {
        try {
            let rover = await RoverModel.findOne({where: {name: this.name}});

            // if rover not found then register
            if(!rover) {
                rover = await RoverModel.create({
                    name: this.name,
                });
            }
            this.id = rover.dataValues.id
            
            // save the log position initial 
            await this.#saveLog(rover.dataValues.id)

            return new Promise((resolve, reject) => {
                if(rover) {
                    resolve(rover)
                } else {
                    reject('failed to save Rover')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    // method for save log
    async #saveLog(rover_id) {
        return LogDirection.create({
            position_x: this.position.x,
            position_y: this.position.y,
            direction_cardinal_compass: this.position.direction_cardinal_compass,
            rover_id: rover_id
        });
    }

}

module.exports.Rover = Rover;