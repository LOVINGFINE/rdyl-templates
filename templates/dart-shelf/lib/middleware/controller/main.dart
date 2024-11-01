import 'package:source_gen/source_gen.dart';
import 'package:build/build.dart';
import 'lib/generator.dart';

export 'lib/meta.dart';
export 'lib/model.dart';
export 'lib/jwt.dart';

Builder controllerBuilder(BuilderOptions options) {
  return LibraryBuilder(
    ControllerGenerator(),
  );
}

Builder appControllerBuilder(BuilderOptions options) {
  return LibraryBuilder(AppControllerGenerator(),
      generatedExtension: '.router.g.dart');
}
