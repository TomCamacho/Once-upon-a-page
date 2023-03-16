'use strict'

import { Model, DataTypes } from 'sequelize'

import connection from '../index.js'

class Author extends Model {
  static init(aConnection) {
    const schema = {
      name: {
        type: DataTypes.STRING,
      },
    }

    const defaultScope = {
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt'],
      },
    }

    return super.init(schema, {
      defaultScope,
      sequelize: aConnection,
      modelName: this.name.toLowerCase(),
    })
  }

  toJSON() {
    const authorForClient = this.get({ clone: true })
      ;['id', 'createdAt', 'updatedAt'].forEach(
        key => delete authorForClient[key]
      )
    return Object.values(authorForClient)
  }
}

Author.init(connection)

export default Author
