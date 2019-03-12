'use strict';

class Card {
  get attributes() {
    return {
      id: {
        type: 'integer.unsigned',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      template_type: {
        type: 'string',
        allowNull: false
      },
      delay: {
        type: 'integer',
        allowNull: false
      },
      image_url: {
        type: 'string',
        allowNull: false
      },
      link_url: {
        type: 'string',
        allowNull: false
      },
      title: {
        type: 'string',
        allowNull: false
      },
      subtitle: {
        type: 'string',
        allowNull: false
      },
      quick_replies: {
        type: 'string',
        allowNull: false
      },
      button1_type: {
        type: 'string',
        allowNull: false
      },
      button1_title: {
        type: 'string',
        allowNull: false
      },
      button1_action: {
        type: 'string',
        allowNull: false
      },
      button2_type: {
        type: 'string',
        allowNull: false
      },
      button2_title: {
        type: 'string',
        allowNull: false
      },
      button2_action: {
        type: 'string',
        allowNull: false
      },
      button3_type: {
        type: 'string',
        allowNull: false
      },
      button3_title: {
        type: 'string',
        allowNull: false
      },
      button3_action: {
        type: 'string',
        allowNull: false
      },
      created_at: {
        type: 'date',
        allowNull: true
      },
      updated_at: {
        type: 'date',
        allowNull: true
      }
    }
  }

  get tableConfiguration() {
    return {
      tableName: 'cards',
      timestamps: true,
      paranoid: true,
      underscored: true,
      freeTableName: true
    }
  }
}

module.exports = Card;