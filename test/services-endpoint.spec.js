const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe(`Services endpoint`, () => {
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

      describe(`POST /services`, () => {
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

        it(`creates a service, responding with 201 and the new service`, () => {
            const testUser = testUsers[0]
            const newService = {
                id: 6,
                service_type: 'mechanic',
                user_id: testUser.id,
                name: 'test name',
                email: 'test@email.com',
                phone: '1234567890',
                city: 'austin',
                state: 'texas',
                about: 'test about'
            }
            return supertest(app)
                .post(`/services`)
                .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                .send(newService)
                .expect(201)
                .expect(res => {
                    expect(res.body).to.have.property('id')
                    expect(res.body.service_type).to.eql(newService.service_type)
                    expect(res.body.name).to.eql(newService.name)
                    expect(res.body.email).to.eql(newService.email)
                    expect(res.body.phone).to.eql(newService.phone)
                    expect(res.body.city).to.eql(newService.city)
                    expect(res.body.state).to.eql(newService.state)
                    expect(res.body.about).to.eql(newService.about)
                    expect(res.body.user.id).to.eql(testUser.id)
                    expect(res.headers.location).to.eql(`/services/service/${res.body.id}`)
            })
            .expect(res =>
                db
                .from('servicepro_services')
                .select('*')
                .where({ id: res.body.id })
                .first()
                .then(row => {
                    expect(row.service_type).to.eql(newService.service_type)
                    expect(row.name).to.eql(newService.name)
                    expect(row.email).to.eql(newService.email)
                    expect(row.phone).to.eql(newService.phone)
                    expect(row.city).to.eql(newService.city)
                    expect(row.state).to.eql(newService.state)
                    expect(row.user_id).to.eql(testUser.id)
                })
            )
        })
      })

})