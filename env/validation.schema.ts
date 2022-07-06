import Joi from 'joi';

/**
 *  The validation schema for the .env file in order to ensure all properties are specified
 *  at the time of application startup, so that the application runs as expected.
 */
let validationSchema = Joi.object({
  DATABASE_PORT: Joi.number().default(27017),
  DATABASE_USER: Joi.string(),
  DATABASE_PASS: Joi.string(),
  DATABASE_HOST: Joi.string(),
  DATABASE: Joi.string(),
  PORT: Joi.number().default(8080),
});

export default validationSchema;
