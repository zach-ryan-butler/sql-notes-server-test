const app = require('../lib/app');
const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const Note = require('../lib/models/Note');

describe('notes routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('creates a note using POST', async() => {
    const response = await request(app)
      .post('/api/v1/notes')
      .send({
        title: 'I a note title',
        body: 'la la la im a happy note'
      });

    expect(response.body).toEqual({
      id: expect.any(String),
      title: 'I a note title',
      body: 'la la la im a happy note'
    });
  });

  it('can get all notes using GET', async() => {
    const notes = await Promise.all([
      {
        title: 'First Note',
        body: 'Brand new baby note'
      },
      {
        title: 'Second Note',
        body: 'I am a note'
      },
      {
        title: 'Third Note',
        body: 'Being a note is fun'
      }
    ].map(note => Note.insert(note)));

    const response = await request(app)
      .get('/api/v1/notes');

    expect(response.body).toEqual(expect.arrayContaining(notes));
    expect(response.body).toHaveLength(notes.length);
  });
});

