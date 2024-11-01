import 'dart:io';

class AppConfig {
  static String name = 'AssistIQ';
  // 统一前缀
  static final String prefix = 'api';

  static InternetAddress iPv4 = InternetAddress.loopbackIPv4;

  static int get port => 9999;

  static String origin = 'http://$iPv4:$port';

  static final bool jwtEnable = true;

  static final Duration jwtExpired = Duration(days: 30);
}
