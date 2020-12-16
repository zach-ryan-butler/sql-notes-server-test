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

  static async insert({ title, body }) {
    const { rows } = await pool.query(
      'INSERT INTO notes (title, body) VALUES ($1, $2) RETURNING *',
      [title, body]
    );

    return new Note(rows[0]);
  }
};
