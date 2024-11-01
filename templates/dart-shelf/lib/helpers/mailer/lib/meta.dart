import 'dart:io';
import 'package:dart_shelf/App.config.dart';
import 'package:dart_shelf/utils/md5.dart';
import 'package:mailer/mailer.dart';
import 'package:mailer/smtp_server.dart';
import 'package:uuid/uuid.dart';

class MailTemplates {
  static Map<String, String> get $AstTemplates {
    var rootDir = '${Directory.current.path}/lib/helpers/mailer/lib/templates/';
    return {'register': File('${rootDir}register.ejs').readAsStringSync()};
  }

  static parser(String name, Map<String, dynamic> fields) {
    String target = $AstTemplates[name] ?? '';
    fields.forEach((k, v) {
      target = target.replaceAll('{$k}', v);
    });
    return target;
  }
}

class VerifyCodeStat {
  String email;
  late String value;
  late String sign;
  DateTime expired = DateTime.now().add(Duration(minutes: 3));
  VerifyCodeStat(this.email) {
    value = VerifyCodeStat.verifyCode();
    sign = Md5Encoder(DateTime.now().toString() + email + value).to16Bit;
  }

  bool isExpired() {
    return expired.isBefore(DateTime.now());
  }

  static verifyCode() {
    var uuid = Uuid();
    return uuid.v1().toString().substring(0, 5);
  }
}

enum SendStat { ok, fail }

class MailHelper {
  String username = 'loving_fine@qq.com';
  String password = '19960430Zq';
  String recipient;
  String subject;
  List<String>? ccRecipients = [];
  MailHelper(
      {required this.recipient, required this.subject, this.ccRecipients});

  SmtpServer get smtpServer {
    return qq(username, password);
  }

  dispatch({String html = '', String text = ''}) async {
    final message = Message()
      ..from = Address(username, AppConfig.name)
      ..recipients.add(recipient)
      ..ccRecipients.addAll(ccRecipients ?? [])
      ..subject = subject
      ..text = text
      ..html = html;

    try {
      final sendReport = await send(message, smtpServer);
      print('Message sent: ' + sendReport.toString());
      return SendStat.ok;
    } on MailerException catch (e) {
      print('Message not sent.');
      for (var p in e.problems) {
        print('Problem: ${p.code}: ${p.msg}');
      }
      return SendStat.fail;
    }
  }
}
