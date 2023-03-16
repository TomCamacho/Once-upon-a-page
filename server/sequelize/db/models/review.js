'use strict'

import { Model, DataTypes } from 'sequelize'

import connection from '../index.js'

class Review extends Model {
  static init(aConnection) {
    const schema = {
      description: {
        type: DataTypes.TEXT,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
    }

    return super.init(schema, {
      sequelize: aConnection,
    })
  }
}

Review.init(connection)

export default Review
