const pool = require('../utils/pool');

module.exports = class Note {
  id;
  title;
  body;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.body = row.body;
  }

  static async insert({ text, body }) {
    const { rows } = await pool.query(
      'INSERT INTO notes (text, body) VALUES ($1, $2) RETURNING *',
      [text, body]
    );

    return new Note(rows[0]);
  }
};
