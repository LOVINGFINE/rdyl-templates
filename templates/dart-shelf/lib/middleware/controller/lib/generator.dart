import 'package:source_gen/source_gen.dart';
import 'package:build/build.dart';
import 'package:analyzer/dart/element/element.dart' as analyzer;
import 'meta.dart';
import 'template.dart';

class ControllerGenerator extends GeneratorForAnnotation<Controller> {
  @override
  generateForAnnotatedElement(analyzer.Element element,
      ConstantReader annotation, BuildStep buildStep) {
    if (element.kind == analyzer.ElementKind.CLASS) {
      String pkg = 'package:' + buildStep.inputId.uri.path;
      String path = annotation.read('path').stringValue;
      bool public = annotation.read('public').boolValue;
      AstController astController = AstController(
          path: path, pkg: pkg, name: element.displayName, public: public);
      setMetadata((element as analyzer.ClassElement).methods,
          (String url, String verb, String name, bool public) {
        astController.methods
            .add(AstMethod(url: url, verb: verb, name: name, public: public));
      });
      AstStat.controllers.add(astController);
    }
    return null;
  }

  analyzer.ElementAnnotation? findMetadataBy(
      List<analyzer.ElementAnnotation> list) {
    List<String> names = ['Get', 'Post', 'Patch', 'Put', 'Delete'];
    analyzer.ElementAnnotation? target;
    for (var i = 0; i < list.length; i++) {
      if (names.contains(list[i].element?.displayName)) {
        target = list[i];
        break;
      }
    }
    return target;
  }

  setMetadata(List<analyzer.MethodElement> methods, Function fn) {
    for (var i = 0; i < methods.length; i++) {
      var method = methods[i];
      var meta = findMetadataBy(method.metadata);
      if (meta != null) {
        var verb = meta.element?.displayName ?? 'Get';
        var name = method.displayName;
        var obj = meta.computeConstantValue();
        if (obj != null) {
          var url = obj.getField('url')?.toStringValue() ?? '';
          bool public = obj.getField('public')?.toBoolValue() ?? false;
          fn(url, verb, name, public);
        }
      }
    }
  }
}

class AppControllerGenerator extends GeneratorForAnnotation<AppController> {
  @override
  generateForAnnotatedElement(analyzer.Element element,
      ConstantReader annotation, BuildStep buildStep) {
    return AstTemplates().context;
  }
}
