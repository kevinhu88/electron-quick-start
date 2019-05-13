#include <assert.h>
#include <node.h>
#include <node_api.h>

#include "QuickStartNotificationCenterDelegate.h"

namespace helper {

napi_value napiStringValue(const char* str, napi_env env) {
  napi_value value;
  int createResult =
      napi_create_string_utf8(env, str, NAPI_AUTO_LENGTH, &value);
  assert(createResult == napi_ok);
  return value;
}

napi_value InitNotificationCenterDelegate(
    napi_env env,
    napi_callback_info info) {
  if ([[QuickStartNotificationCenterDelegate alloc] init] != nil) {
    return napiStringValue(
        "Notification categories were set successfully", env);
  } else if ([QuickStartNotificationCenterDelegate isSupported]) {
    return napiStringValue(
        "Failed to initialize notification center delegate", env);
  } else {
    return napiStringValue(
        "Notification categories and user actions are not supported", env);
  }
}

#define DECLARE_NAPI_METHOD(name, func) \
  { name, 0, func, 0, 0, 0, napi_default, 0 }

napi_value Initialize(napi_env env, napi_value exports) {
  napi_property_descriptor desc = DECLARE_NAPI_METHOD(
      "initNotificationCenterDelegate", InitNotificationCenterDelegate);
  assert(napi_define_properties(env, exports, 1, &desc) == napi_ok);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}
