import 'package:dart_shelf/App.config.dart';
import 'package:dart_shelf/helpers/event/main.dart';
import 'package:dart_shelf/helpers/mailer/lib/meta.dart';

Map<String, VerifyCodeStat> $RegisterVerifyCodes = {};

EventTimer verifyTimer = EventTimer();

enum CheckStat { ok, expired, fail }

class RegisterVerify {
  final template = 'register';
  String email;

  String get name {
    return email.split('@')[0];
  }

  RegisterVerify(this.email);

  MailHelper get mailer {
    return MailHelper(recipient: email, subject: '来自${AppConfig.name}注册提醒');
  }

  Future<String?> create(String email) async {
    if (email.isNotEmpty) {
      var verify = VerifyCodeStat(email);
      var html = MailTemplates.parser(
          template, {'name': name, 'email': email, 'code': verify.value});
      var status = await mailer.dispatch(html: html);
      $RegisterVerifyCodes[verify.sign] = verify;
      verifyTimer.on(email, () {
        RegisterVerify.clear(verify.sign);
      }, Duration(minutes: 3));
      return verify.sign;
      if (status == SendStat.ok) {
        $RegisterVerifyCodes[verify.sign] = verify;
        return verify.sign;
      }
      return null;
    }
    return null;
  }

  static clear(String sign) {
    print(sign);
    if ($RegisterVerifyCodes.containsKey(sign)) {
      $RegisterVerifyCodes.remove(sign);
    }
  }

  static CheckStat check(String sign,
      {required String email, required String code}) {
    try {
      VerifyCodeStat? verify = $RegisterVerifyCodes[sign];
      if (verify != null && verify.email == email) {
        if (verify.isExpired()) {
          return CheckStat.expired;
        }
        return CheckStat.ok;
      }
      return CheckStat.fail;
    } finally {
      clear(sign);
    }
  }
}
