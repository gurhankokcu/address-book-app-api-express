const supertest = require('supertest')
const app = require('../app')

describe('app', () => {
  test('GET /', async () => {
    const res = await supertest(app).get('/')
    expect(res.statusCode).toEqual(200)
    expect(res.text).toEqual('It works!')
  })
})
