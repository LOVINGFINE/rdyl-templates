import 'package:crypto/crypto.dart';
import 'dart:convert';
import 'package:convert/convert.dart';

class Md5Encoder {
  String value;
  Md5Encoder(this.value);

  get content => Utf8Encoder().convert(
        value,
      );

  get digest => md5.convert(content);

  // 生成 key 32位 md5
  String get to32Bit {
    return hex.encode(digest.bytes).toUpperCase();
  }

  // 生成 key 16位 md5
  String get to16Bit {
    return hex.encode(digest.bytes).toUpperCase().substring(8, 24);
  }
}
