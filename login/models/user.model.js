module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "user"
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    }, {
      timestamps: false,  // Disable `createdAt` and `updatedAt` columns
    });
  
    return User;
  };
  