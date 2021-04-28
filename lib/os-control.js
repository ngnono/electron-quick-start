const ffi = require('ffi-napi');
const ref = require('ref-napi');
const delay = require('./utils').delay;
const log = require('./log').getLogger('os-control');

var stringPtr = ref.refType(ref.types.CString);

var user32 = new ffi.Library('user32.dll', {
  'GetTopWindow': ['long', ['long']],
  'FindWindowA': ['long', ['string', 'string']],
  'SetActiveWindow': ['long', ['long']],
  'SetForegroundWindow': ['bool', ['long']],
  'BringWindowToTop': ['bool', ['long']],
  'ShowWindow': ['bool', ['long', 'int']],
  'SwitchToThisWindow': ['void', ['long', 'bool']],
  'GetForegroundWindow': ['long', []],
  'AttachThreadInput': ['bool', ['int', 'long', 'bool']],
  'GetWindowThreadProcessId': ['int', ['long', 'int']],
  'SetWindowPos': ['bool', ['long', 'long', 'int', 'int', 'int', 'int', 'uint']],
  'SetFocus': ['long', ['long']],
  'GetWindowTextA': ['long', ['long', stringPtr, 'long']],
});

var kernel32 = new ffi.Library('Kernel32.dll', {
  'GetCurrentThreadId': ['int', []]
});

async function fn() {
  await delay(10 * 1000);
}


function run() {
  var buf = new Buffer(256);
  var getTopWindow = user32.GetTopWindow(null);
  var foregroundHWnd = user32.GetForegroundWindow();
  var ret = user32.GetWindowTextA(foregroundHWnd, buf, 255);
  var name = ref.readCString(buf, 0);

  var winToSetOnTop = user32.FindWindowA(null, "Hello World!");
  //var foregroundHWnd = user32.GetForegroundWindow();
  var currentThreadId = kernel32.GetCurrentThreadId();
  var windowThreadProcessId = user32.GetWindowThreadProcessId(foregroundHWnd, null);

  var showWindow = user32.ShowWindow(winToSetOnTop, 9);
  var setWindowPos1 = user32.SetWindowPos(winToSetOnTop, -1, 0, 0, 0, 0, 1 | 2);
  var setWindowPos2 = user32.SetWindowPos(foregroundHWnd, -2, 0, 0, 0, 0, 1 | 2);
  var setForegroundWindow = user32.SetForegroundWindow(winToSetOnTop);
  var attachThreadInput = user32.AttachThreadInput(windowThreadProcessId, currentThreadId, 0);
  var setFocus = user32.SetFocus(winToSetOnTop);
  var setActiveWindow = user32.SetActiveWindow(winToSetOnTop);
  var bringWindowToTop = user32.BringWindowToTop(winToSetOnTop);

  log.info({
    getTopWindow,
    topWindow: name,
    winToSetOnTop,
    foregroundHWnd,
    currentThreadId,
    windowThreadProcessId,
    showWindow,
    setWindowPos2,
    setWindowPos1,
    // setWindowPos2,
    setForegroundWindow,
    attachThreadInput,
    setFocus,
    setActiveWindow,
    bringWindowToTop
  })
}

const def = {
  fn, run
};
// fn().then(() => {
//   run();
// });

exports.default = def;
// For CommonJS default export support
module.exports = def;
module.exports.default = def;
