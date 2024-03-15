const { DataTypes } = require('sequelize');
const sequelize = require('../util/database'); // Assuming the database connection util is in a separate file

const SeaService = sequelize.define('SeaService', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  candidateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  rank: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  vessel: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  DWT: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  from1: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  to1: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  total_MMDD: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  reason_for_sign_off: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'sea_service',
  timestamps: false, // disable automatic timestamp columns (createdAt, updatedAt)
});

module.exports = SeaService;
