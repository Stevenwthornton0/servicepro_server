const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe(`Reviews endpoint`, () => {
    let db

    const testUsers = helpers.makeUsersArray();
    const testServices = helpers.makeServicesArray(testUsers);

    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
      })
    
      after('disconnect from db', () => db.destroy())
    
      before('cleanup', () => helpers.cleanTables(db))
    
      afterEach('cleanup', () => helpers.cleanTables(db))

      describe(`POST /reviews`, () => {
        beforeEach(`insert users`, () => {
            helpers.seedUsers(
                db,
                testUsers
            ),
            helpers.seedServices(
                db,
                testServices
            )
        })

        it(`creates a review, responding with 201 and the new review`, () => {
            const testUser = testUsers[0]
            const newReview = {
                rating: 5,
                text: 'Test new comment',
                service_id: 1
            }
            return supertest(app)
                .post(`/reviews`)
                .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                .send(newReview)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.have.property('id')
                    expect(res.body.rating).to.eql(newReview.rating)
                    expect(res.body.text).to.eql(newReview.text)
                    expect(res.body.service_id).to.eql(newReview.service_id)
                    expect(res.body.user.id).to.eql(testUser.id)
                    expect(res.headers.location).to.eql(`/reviews/${res.body.id}`)
                    const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
                    const actualDate = new Date(res.body.date_created).toLocaleString()
                    expect(actualDate).to.eql(expectedDate)
            })
            .expect(res =>
                db
                .from('servicepro_reviews')
                .select('*')
                .where({ id: res.body.id })
                .first()
                .then(row => {
                    expect(row.rating).to.eql(newReview.rating)
                    expect(row.text).to.eql(newReview.text)
                    expect(row.service_id).to.eql(newReview.service_id)
                    expect(row.user_id).to.eql(testUser.id)
                    const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
                    const actualDate = new Date(row.date_created).toLocaleString()
                    expect(actualDate).to.eql(expectedDate)
                })
            )
        })
      })

})