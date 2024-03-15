const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // Assuming the database connection util is in a separate file

const Reply = sequelize.define('Reply', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reply_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  query_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'replies',
  timestamps: false, // disable automatic timestamp columns (createdAt, updatedAt)
});

module.exports = Reply;
