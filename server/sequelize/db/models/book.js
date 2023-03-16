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
    }

    return super.init(schema, {
      sequelize: aConnection,
    })
  }

  // See nonybrighto's comment in https://stackoverflow.com/a/48357983/8706387
  toJSON() {
    const BookForClient = this.get({ clone: true })
    ;['id'].forEach(key => delete BookForClient[key])
    return BookForClient
  }
}

Book.init(connection)

export default Book
