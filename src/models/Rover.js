const { Model, DataTypes } = require('sequelize');

class Rover extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'rovers'
        })
    }
    static associate(models) {
        this.hasMany(models.LogDirection, {foreignKey: 'rover_id', as: 'logs' })
    }
}

module.exports = Rover;