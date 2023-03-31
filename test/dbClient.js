const {expect} = require('chai')
let db

describe('Redis', () => {

    before(async () => {
        db = require('../src/dbClient')
        await db.connect()
    })
})
