("use strict");
const { Enums } = require("../utils/common");
const { ECONOMY, BUISNESS, PREMIUM_ECONOMY, FIRST_CLASS } = Enums.SEAT_TYPE;
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Airplane, {
        foreignKey: "airplaneId",
        onDelete: "CASCADE",
      });
    }
  }
  Seat.init(
    {
      airplaneId: { allowNull: false, type: DataTypes.INTEGER },
      row: { allowNull: false, type: DataTypes.INTEGER },
      column: { allowNull: false, type: DataTypes.STRING },
      type: {
        type: DataTypes.ENUM,
        values: [BUISNESS, ECONOMY, FIRST_CLASS, PREMIUM_ECONOMY],
        allowNull: false,
        defaultValue: ECONOMY,
      },
    },
    {
      sequelize,
      modelName: "Seat",
    }
  );
  return Seat;
};
