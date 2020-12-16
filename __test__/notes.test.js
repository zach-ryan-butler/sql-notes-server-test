const app = require('../lib/app');
const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');

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
});

