import 'package:dart_shelf/App.config.dart';
import 'package:path/path.dart' as uri;

class AstMethod {
  String url;
  String verb;
  String name;
  bool public;
  AstMethod(
      {required this.url,
      required this.verb,
      required this.name,
      this.public = false});
}

class AstController {
  String pkg;
  String path;
  bool public;
  List<AstMethod> methods = [];
  String name;
  AstController(
      {required this.path,
      required this.pkg,
      required this.name,
      this.public = false});
}

class AstStat {
  static List<AstController> controllers = [];
}

class AstTemplates {
  get pkg {
    List<String> refs = [];
    for (var i = 0; i < AstStat.controllers.length; i++) {
      refs.add("import '${AstStat.controllers[i].pkg}';");
    }
    return refs.join('\n');
  }

  get whitelist {
    List<String> refs = [];
    for (var i = 0; i < AstStat.controllers.length; i++) {
      var controller = AstStat.controllers[i];
      for (var j = 0; j < controller.methods.length; j++) {
        var method = controller.methods[j];
        if (controller.public || method.public) {
          String p =
              AppConfig.prefix + '/' + controller.path + '/' + method.url;
          String path = '/' + uri.joinAll(p.split('/'));
          refs.add("'$path'");
        }
      }
    }
    return """// 白名单
List<String> \$Whitelist = [
  ${refs.join(',\n')}
];
""";
  }

  get router {
    List<String> refs = [];
    for (var i = 0; i < AstStat.controllers.length; i++) {
      var controller = AstStat.controllers[i];
      for (var j = 0; j < controller.methods.length; j++) {
        var method = controller.methods[j];
        String verb = method.verb.toLowerCase();
        String name = method.name;
        String instance = controller.name;
        bool public = controller.public || method.public;
        String p = AppConfig.prefix + '/' + controller.path + '/' + method.url;
        String path = '/' + uri.joinAll(p.split('/'));
        String itemRef = """   router.$verb('$path', (req) async {
    $instance instance = $instance(req);
    return await instance.response(instance.$name, public: $public);
  });
""";
        refs.add(itemRef);
      }
    }
    return refs.join('\n');
  }

  get context {
    return """import 'package:shelf_router/shelf_router.dart';
$pkg  

$whitelist

Router \$AppRouter() {
  Router router = Router();
$router
  return router;
}""";
  }
}
