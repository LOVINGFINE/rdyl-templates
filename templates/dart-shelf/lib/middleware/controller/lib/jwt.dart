import 'package:dart_shelf/App.config.dart';
import 'package:dart_jsonwebtoken/dart_jsonwebtoken.dart';

enum JWTStat { ok, expired, invalid }

class JWTHelper {
  static SecretKey secretKey = SecretKey('------&dart_shelf&------');

  late JWT jwt;
  JWTHelper(dynamic data) {
    jwt = JWT(data, header: {'type': 'JWT', "secret": 'HS256'});
  }

  get sign {
    return jwt.sign(secretKey, expiresIn: AppConfig.jwtExpired);
  }

  static JWTStat verify(String token) {
    if (AppConfig.jwtEnable) {
      try {
        JWT.verify(token, secretKey);
        return JWTStat.ok;
      } on JWTExpiredException {
        print('jwt [$token] expired');
        return JWTStat.expired;
      } on JWTException {
        print('jwt [$token] invalid');
        return JWTStat.invalid;
      }
    } else {
      return JWTStat.ok;
    }
  }
}
