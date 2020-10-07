module.exports = function(sequelize, DataTypes) {
  const List = sequelize.define("List", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 140]
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 100]
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 100]
    },
    watched: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    ratingType: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100]
      }
    },
    rating: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100]
      }
    },
    image: {
      type: DataTypes.STRING
    }
  });

  List.associate = function(models) {
    // We're saying that a List should belong to an User
    // A List can't be created without a User due to the foreign key constraint
    List.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return List;
};
