import { isBlacklisted } from '../../services/jwt.service';
import cote from 'cote';

export const req = new cote.Responder({
  name: 'Auth-Service',
  respondsTo: ['check'],
});

type Check = {
  type: 'check';
  jwt: string;
};

req.on<Check>('check', (data, done) => {
  done(null, {
    type: 'check',
    response: isBlacklisted(data.jwt),
  });
});
