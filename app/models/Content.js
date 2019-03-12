'use strict';

class Content {
  get attributes() {
    return {
      id: {
        type: 'integer.unsigned',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      keywords: {
        type: 'string',
        allowNull: false
      },
      keywords2: {
        type: 'string',
        allowNull: false
      },
      title: {
        type: 'string',
        allowNull: false
      },
      card_id: {
        type:'string',
        allowNull: false
      },
      referal_link: {
        type: 'string',
        allowNull: false
      },
      kind: {
        type: 'string',
        allowNull: false
      },
      is_faq: {
        type: 'boolean',
        allowNull: false
      },
      is_searchable: {
        type: 'boolean',
        allowNull: false
      },
      show_related_faq: {
        type: 'boolean',
        allowNull: false
      },
      groupping: {
        type: 'string',
        allowNull: false
      },
      category: {
        type: 'string',
        allowNull: false
      },
      total_shown: {
        type: 'integer.unsigned',
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
      tableName: 'contents',
      timestamps: true,
      paranoid: true,
      underscored: true,
      freeTableName: true
    }
  }
}

module.exports = Content;
