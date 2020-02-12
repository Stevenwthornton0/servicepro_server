const xss = require('xss');

const ServicesService = {

    getServicesByType(db, service_type) {
        return db('servicepro_services')
            .where({ service_type })
    },

    getById(db, id) {
        return db
          .from('servicepro_services AS serv')
          .select(
            'serv.id',
            'serv.service_type',
            'serv.name',
            'serv.email',
            'serv.phone',
            'serv.about',
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
            'serv.user_id',
            'usr.id',
          )
          .where('serv.id', id)
          .first()
      },

    insertService(db, newService) {
        return db
            .into('servicepro_services')
            .insert(newService)
            .returning('*')
            .then(([service]) => service)
            .then(service =>
              ServicesService.getById(db, service.id)
            )
    },

    updateService(db, id, updatedArticle) {
        return db
          .from('servicepro_services')
          .where({ id })
          .update(updatedArticle)
    },

    deleteService(db, id) {
        return db
            .from('servicepro_services')
            .where({ id })
            .delete()
    },

    serializeServiceWithoutUser(service) {
      return {
          id: service.id,
          service_type: service.service_type,
          name: xss(service.name),
          email: xss(service.email),
          phone: service.phone,
          about: xss(service.about),
        }
  },

    serializeServiceWithUser(service) {
        const { user } = service;
        return {
            id: service.id,
            service_type: service.service_type,
            name: xss(service.name),
            email: xss(service.email),
            phone: service.phone,
            about: xss(service.about),
            user: {
              id: user.id,
              user_name: user.user_name,
              first_name: user.first_name,
              last_name: user.last_name,
              date_created: new Date(user.date_created),
              date_modified: new Date(user.date_modified) || null
            }
          }
    }

}

module.exports = ServicesService;