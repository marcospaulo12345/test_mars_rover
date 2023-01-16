const { Model, DataTypes } = require('sequelize');

class LogDirection extends Model {
    static init(sequelize) {
        super.init({
            position_x: DataTypes.INTEGER,
            position_y: DataTypes.INTEGER,
            direction_cardinal_compass: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'log_directions'
        })
    }
    static associate(models) {
        this.belongsTo(models.Rover, {foreignKey: 'rover_id', as: 'rover'})
    }
}

module.exports = LogDirection;