import 'dart:async';

typedef EventTimerListener = void Function();

class EventTimer {
  Map<String, Timer> listeners = {};

  on(String k, EventTimerListener fn, Duration timeout) {
    if (listeners.containsKey(k)) {
      listeners[k]?.cancel();
    }
    var timer = Timer(timeout, fn);
    listeners[k] = timer;
    return timer;
  }

  cancel(String k) {
    if (listeners.containsKey(k)) {
      listeners[k]?.cancel();
      listeners.remove(k);
    }
  }
}
