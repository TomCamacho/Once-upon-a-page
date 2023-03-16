'use strict'

import { Model, DataTypes } from 'sequelize'

import connection from '../index.js'

class Genre extends Model {
  static init(aConnection) {
    const schema = {
      genreName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }

    return super.init(schema, {
      sequelize: aConnection,
    })
  }
}
Genre.init(connection)

export default Genre
