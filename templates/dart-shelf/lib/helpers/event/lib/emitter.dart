typedef EventEmitterListener = void Function(dynamic a);

class EventEmitter {
  Map<String, List<EventEmitterListener>> EventEmitterListeners = {};

  on(String k, EventEmitterListener fn) {
    if (EventEmitterListeners.containsKey(k)) {
      EventEmitterListeners[k]?.add(fn);
    } else {
      EventEmitterListeners[k] = [fn];
    }
  }

  remove(String k, EventEmitterListener fn) {
    if (EventEmitterListeners.containsKey(k)) {
      EventEmitterListeners[k]?.remove(fn);
    }
  }

  emit(String k, d) {
    if (EventEmitterListeners.containsKey(k)) {
      List<EventEmitterListener> list = EventEmitterListeners[k] ?? [];
      for (var i = 0; i < list.length; i++) {
        list[i](d);
      }
    }
  }
}
