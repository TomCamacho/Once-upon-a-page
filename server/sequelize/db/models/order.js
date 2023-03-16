'use strict'

import { Model, DataTypes } from 'sequelize'

import connection from '../index.js'

class Order extends Model {
  static init(aConnection) {
    const schema = {
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      totalAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      totalQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    }

    return super.init(schema, {
      sequelize: aConnection,
    })
  }
}

Order.init(connection)

export default Order
