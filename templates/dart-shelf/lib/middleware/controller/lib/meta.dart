// 请求方式
class Get {
  final String verb = 'GET';
  final String url;
  final bool public;
  const Get(this.url, {this.public = false});
}

class Post {
  final String verb = 'POST';
  final String url;
  final bool public;
  const Post(this.url, {this.public = false});
}

class Put {
  final String verb = 'PUT';
  final String url;
  final bool public;
  const Put(this.url, {this.public = false});
}

class Patch {
  final String verb = 'PATCH';
  final String url;
  final bool public;
  const Patch(this.url, {this.public = false});
}

class Delete {
  final String verb = 'DELETE';
  final String url;
  final bool public;
  const Delete(this.url, {this.public = false});
}

// Controller
class Controller {
  final String path;
  final bool public;
  const Controller(this.path, {this.public = false});
}

class AppController {
  final String prefix;
  const AppController({this.prefix = ''});
}
