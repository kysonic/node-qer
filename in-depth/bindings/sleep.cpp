#include <node.h>
#include <unistd.h>

using namespace v8;

void Sleep(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  
  if (args.Length() < 1 || !args[0]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Number expected").ToLocalChecked()));
    return;
  }
  
  int seconds = args[0]->Int32Value(isolate->GetCurrentContext()).FromJust();
  sleep(seconds);
  
  args.GetReturnValue().Set(Undefined(isolate));
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "sleep", Sleep);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)