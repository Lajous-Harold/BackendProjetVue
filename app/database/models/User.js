const { DataTypes, Model } = require("sequelize");
const sequelizeClient = require("../connect");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue(
          "firstName",
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        );
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("lastName", value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value) {
        this.setDataValue("password", bcrypt.hashSync(value, 10));
      },
    },
    role: {
      type: DataTypes.ENUM("ADMIN", "USER"),
      defaultValue: "USER",
    },
  },
  {
    modelName: "User",
    sequelize: sequelizeClient,
  }
);

// console.log(User === sequelizeClient.models.User);

// async function synchroWithDb() {
//   await sequelizeClient.sync({ alter: true });
// }

// synchroWithDb();

module.exports = User;
