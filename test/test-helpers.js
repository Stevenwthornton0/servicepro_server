const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
      {
        id: 1,
        user_name: 'test-user-1',
        first_name: 'Test',
        last_name: 'User1',
        email: 'testemail1@email.com',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 2,
        user_name: 'test-user-2',
        first_name: 'Test',
        last_name: 'User2',
        email: 'testemail2@email.com',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 3,
        user_name: 'test-user-3',
        first_name: 'Test',
        last_name: 'User3',
        email: 'testemail3@email.com',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 4,
        user_name: 'test-user-4',
        first_name: 'Test',
        last_name: 'User4',
        email: 'testemail4@email.com',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
    ]
  }

function makeServicesArray(users) {
    return [
        {
            id: 1,
            service_type: 'mechanic',
            user_id: users[0].id,
            name: 'test1',
            email: 'test1@email.com',
            phone: 1234567890,
            city: 'austin',
            state: 'texax',
            about: 'test about 1'
        },
        {
            id: 2,
            service_type: 'mechanic',
            user_id: users[1].id,
            name: 'test12',
            email: 'test2@email.com',
            phone: 1234567890,
            city: 'austin',
            state: 'texax',
            about: 'test about 2'
        },
        {
            id: 3,
            service_type: 'mechanic',
            user_id: users[2].id,
            name: 'test13',
            email: 'test3@email.com',
            phone: 1234567890,
            city: 'austin',
            state: 'texax',
            about: 'test about 3'
        },
        {
            id: 4,
            service_type: 'mechanic',
            user_id: users[3].id,
            name: 'test4',
            email: 'test4@email.com',
            phone: 1234567890,
            city: 'austin',
            state: 'texax',
            about: 'test about 4'
        },
        {
            id: 5,
            service_type: 'mechanic',
            user_id: users[0].id,
            name: 'test5',
            email: 'test5@email.com',
            phone: 1234567890,
            city: 'austin',
            state: 'texax',
            about: 'test about 5'
        }
    ]
}

function makeReviewsArray(users, serviceList) {
    return [
        {
        id: 1,
        rating: 5,
        text: 'First test comment!',
        service_id: serviceList[0].id,
        user_id: users[0].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
        id: 2,
        rating: 5,
        text: 'Second test comment!',
        service_id: serviceList[0].id,
        user_id: users[1].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
        id: 3,
        rating: 5,
        text: 'Third test comment!',
        service_id: serviceList[0].id,
        user_id: users[2].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
        id: 4,
        rating: 5,
        text: 'Fourth test comment!',
        service_id: serviceList[0].id,
        user_id: users[3].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
        id: 5,
        rating: 5,
        text: 'Fifth test comment!',
        service_id: serviceList[0].id,
        user_id: users[0].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
        id: 6,
        rating: 5,
        text: 'Sixth test comment!',
        service_id: serviceList[0].id,
        user_id: users[2].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
        id: 7,
        rating: 5,
        text: 'Seventh test comment!',
        service_id: serviceList[0].id,
        user_id: users[0].id,
        date_created: new Date('2029-01-22T16:28:32.615Z'),
        },
    ];
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
        `TRUNCATE
            servicepro_users,
            servicepro_reviews,
            servicepro_services
        `
        )
        .then(() =>
        Promise.all([
            trx.raw(`ALTER SEQUENCE servicepro_reviews_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE servicepro_users_id_seq minvalue 0 START WITH 1`),
            trx.raw(`ALTER SEQUENCE servicepro_services_id_seq minvalue 0 START WITH 1`),
            trx.raw(`SELECT setval('servicepro_reviews_id_seq', 0)`),
            trx.raw(`SELECT setval('servicepro_users_id_seq', 0)`),
            trx.raw(`SELECT setval('servicepro_services_id_seq', 0)`),
        ])
        )
    )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db
        .into('servicepro_users')
        .insert(preppedUsers)
        .then(() => 
            db.raw(
                `SELECT setval('servicepro_users_id_seq', ?)`,
                [users[users.length -1].id]
            )
        )   
}

function seedServices(db, services) {
    return db
        .into('servicepro_services')
        .insert(services)
        .then(() => 
            db.raw(
                `SELECT setval('servicepro_services_id_seq', ?)`,
                [services[services.length -1].id]
            )
        )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
      subject: user.user_name,
      algorithm: 'HS256'
    })
    return `Bearer ${token}`
  }

module.exports = {
    makeUsersArray,
    makeReviewsArray,
    makeServicesArray,
    seedUsers,
    makeAuthHeader,
    cleanTables,
    seedServices
}