'use strict'

import { Model, DataTypes } from 'sequelize'

import connection from '../db/index.js'

class User extends Model {
  static init(aConnection) {
    const schema = {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isStrongPassword: {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
          },
        },
      },
    }

    const defaultScope = {
      attributes: {
        exclude: ['id', 'password', 'salt', 'createdAt', 'updatedAt'],
      },
    }

    const scopes = {
      everything: {
        attributes: {},
      },
    }

    return super.init(schema, {
      defaultScope,
      scopes,
      hooks,
      sequelize: aConnection,
    })
  }

  // See nonybrighto's comment in https://stackoverflow.com/a/48357983/8706387
  toJSON() {
    const userForClient = this.get({ clone: true })
    ;['id', 'password', 'createdAt', 'updatedAt'].forEach(
      key => delete userForClient[key]
    )
    return userForClient
  }
}

User.init(connection)
