'use strict'

import { Model, DataTypes } from 'sequelize'

import connection from '../index.js'

class Book extends Model {
  static init(aConnection) {
    const schema = {
      googleId: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
          min: 0,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING(510)),
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      genres: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      reviews: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: [],
      },
    }

    return super.init(schema, {
      sequelize: aConnection,
    })
  }
}

Book.init(connection)

export default Book
