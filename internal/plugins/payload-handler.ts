import { HttpStatus } from '@enums/HttpStatus';
import fp from 'fastify-plugin';
import { Response } from 'interfaces/Response';
import { TFastifyPlugin } from '../services/inventory/types';

const payloadHandler: TFastifyPlugin = (fastify, _, next) => {
  fastify.addHook('onSend', (req, res, data: any, done) => {
    let message = 'messages.ok';
    const code = res.statusCode ? res.statusCode : HttpStatus.OK;

    const responseData: Response = {
      code,
      status: true,
      message,
    };

    let jsonData;

    try {
      jsonData = JSON.parse(data);
      if (!Object.getOwnPropertyNames(jsonData).length) {
        return done(null, JSON.stringify(responseData));
      }
      if (jsonData.swagger) {
        return done(null, data);
      }
    } catch (e) {
      return done(null, data);
    }

    data = jsonData;

    if (data.message) {
      const { message: msg, ...rest } = data;
      responseData.message = msg;
      data = { ...rest };
    }

    if (data.code || data.statusCode) {
      const { statusCode, code, ...rest } = data;
      responseData.code = statusCode || code;
      data = rest;
    }

    if (data.status !== undefined) {
      const { status, ...rest } = data;
      responseData.status = status;
      data = rest;
    }

    if (data.data) {
      data = { ...data.data };
    }

    res.code(code);
    res.header('Content-Type', 'application/json; utf-8');

    if (Object.getOwnPropertyNames(data).length) responseData.data = data;

    done(null, JSON.stringify(responseData));
  });

  next();
};

export default fp(payloadHandler, {
  fastify: '>=3.x',
  name: 'payload-handler',
});
