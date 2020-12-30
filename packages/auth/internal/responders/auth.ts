import { Container } from '@denlay/core/core/Container';
import cote from 'cote';
import { JwtService } from 'services/jwt.service';

export const req = new cote.Responder({
  name: 'Auth-Service',
  respondsTo: ['check'],
});

type Check = {
  type: 'check';
  jwt: string;
};

req.on<Check>('check', async (data, done) => {
  const jwtService = Container.get<JwtService>(JwtService);

  try {
    const resp = await jwtService.isBlacklisted(data.jwt);
    done(null, {
      type: 'check',
      response: resp,
    });
  } catch (e) {
    done(null, {
      type: 'check',
      response: false,
    });
  }
});
