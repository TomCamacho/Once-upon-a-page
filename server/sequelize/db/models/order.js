'use strict'

import { Model, DataTypes } from 'sequelize'

import connection from '../index.js'

class Order extends Model {
  static init(aConnection) {
    const schema = {
      open: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }

    return super.init(schema, {
      sequelize: aConnection,
    })
  }
}

Order.init(connection)

export default Order
