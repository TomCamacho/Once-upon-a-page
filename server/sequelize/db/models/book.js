"use strict";

import { Model, DataTypes } from "sequelize";

import connection from "../db/index.js";

class Book extends Model {
  static init(aConnection) {
    const schema = {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    };

    const defaultScope = {
      attributes: {
        exclude: ["id"],
      },
    };

    const scopes = {
      everything: {
        attributes: {},
      },
    };

    return super.init(schema, {
      defaultScope,
      scopes,
      sequelize: aConnection,
    });
  }

  // See nonybrighto's comment in https://stackoverflow.com/a/48357983/8706387
  toJSON() {
    const BookForClient = this.get({ clone: true });
    ["id"].forEach((key) => delete BookForClient[key]);
    return BookForClient;
  }
}

Book.init(connection);
