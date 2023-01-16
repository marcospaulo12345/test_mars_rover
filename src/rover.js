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
        const move = {
            "N": () => this.position.y = Number(this.position.y) + 1,
            "E": () => this.position.x = Number(this.position.x) + 1,
            "S": () => this.position.y = Number(this.position.y) - 1,
            "W": () => this.position.x = Number(this.position.x) - 1,
        };
        move[this.position.cardinalPoint]();
    }

    // change the direction of the Rover
    #changeDirection(direction) {
        if (direction === 'L') {
            this.position.cardinalPoint = this.#changeDirectionForLeft(this.position.cardinalPoint)
        } else {
            this.position.cardinalPoint = this.#changeDirectionForRight(this.position.cardinalPoint)
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

    async saveRover() {
        try {
            let rover = await RoverModel.findOne({where: {name: this.name}});

            if(!rover) {
                rover = await RoverModel.create({
                    name: this.name,
                });
            }
            this.id = rover.dataValues.id
            
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
    async #saveLog(rover_id) {
        return LogDirection.create({
            position_x: this.position.x,
            position_y: this.position.y,
            direction_cardinal_compass: this.position.cardinalPoint,
            rover_id: rover_id
        });
    }

}

module.exports.Rover = Rover;