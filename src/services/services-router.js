const express = require('express');
const path = require('path');
const ServicesService = require('./services-service');
const { requireAuth } = require('../middleware/jwt-auth');

const servicesRouter = express.Router();
const jsonBodyParser = express.json();

servicesRouter
    .route('/')
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const { service_type, name, email, phone, about } = req.body;
        const newService = { service_type, name, email, phone, about };

        for (const [key, value] of Object.entries(newService))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        newService.user_id = req.user.id;

        ServicesService.insertService(
            req.app.get('db'),
            newService
        )
            .then(service => {
                res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${service.id}`))
                .json(ServicesService.serializeServiceWithUser(service))
            })
            .catch(next)
    })

servicesRouter
    .route('/:serviceType')
    .get((req, res, next) => {
        ServicesService.getServicesByType(
            req.app.get('db'),
            req.params.serviceType
        )
            .then(services => {
                res.json(services.map(ServicesService.serializeServiceWithoutUser))
            })
            .catch(next)
    })

servicesRouter
    .route('/service/:serviceId')
    .get(requireAuth, (req, res, next) => {
        ServicesService.getById(
            req.app.get('db'),
            req.params.serviceId
        )
            .then(service => {
                res.json(ServicesService.serializeServiceWithUser(service))
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        ServicesService.deleteService(
            req.app.get('db'),
            req.params.serviceId
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })
    .patch(requireAuth, jsonBodyParser, (req, res, next) => {
        const { name, phone, email, about } = req.body;
        const updatedArticle = { name, phone, email, about };

        ServicesService.updateService(
            req.app.get('db'),
            req.params.serviceId,
            updatedArticle
        )
            .then(numRowsAffected => {
                res.status(204).end()
            })
            .catch(next)
    })

    module.exports = servicesRouter;