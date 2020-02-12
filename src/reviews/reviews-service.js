const xss = require('xss');

const ReviewsService = {
  getServiceReviews(db, id) {
    return db
      .from('servicepro_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.text',
        'rev.date_created',
        'rev.service_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.email,
                  usr.first_name,
                  usr.last_name,
                  usr.date_created,
                  usr.date_modified
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where('rev.service_id', id)
      .leftJoin(
        'servicepro_users AS usr',
        'rev.user_id',
        'usr.id',
      )
      .groupBy('rev.id', 'usr.id')
  },

  getById(db, id) {
    return db
      .from('servicepro_reviews AS rev')
      .select(
        'rev.id',
        'rev.rating',
        'rev.text',
        'rev.date_created',
        'rev.service_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.email,
                  usr.first_name,
                  usr.last_name,
                  usr.date_created,
                  usr.date_modified
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'servicepro_users AS usr',
        'rev.user_id',
        'usr.id',
      )
      .where('rev.id', id)
      .first()
  },

  insertReview(db, newReview) {
    return db
      .insert(newReview)
      .into('servicepro_reviews')
      .returning('*')
      .then(([review]) => review)
      .then(review =>
        ReviewsService.getById(db, review.id)
      )
  },

  deleteReview(db, service_id, id) {
    return db('servicepro_reviews')
      .where({ id })
      .where({ service_id })
      .delete()
  },

  serializeReview(review) {
    const { user } = review
    return {
      id: review.id,
      rating: review.rating,
      text: xss(review.text),
      service_id: review.service_id,
      date_created: new Date(review.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    }
  }
}

module.exports = ReviewsService
