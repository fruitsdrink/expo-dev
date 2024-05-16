# Getting Started with React Native and Expo | DEVember

## 视频教程

- [Getting Started with React Native and Expo | DEVember Day 1](https://www.youtube.com/live/bIQII7gTXDE?si=wmsmY7iIYYXHpvd9)

## 错误解决

### macos 需要的 android 环境

<https://docs.expo.dev/guides/local-app-development/>

### 解决 vision camera expo android 报错问题

相关包版本

- expo ~51.0.5
- react-native 0.74.1
- react-native-vision-camera" ^4.0.3

临时解决方案: <https://github.com/mrousavy/react-native-vision-camera/issues/2851>

修改文件

```bash
node_modules/react-native-vision-camera/android/src/main/java/com/mrousavy/camera/frameprocessors/VisionCameraProxy.kt
```

```kotin
diff --git a/node_modules/react-native-vision-camera/android/src/main/java/com/mrousavy/camera/frameprocessors/VisionCameraProxy.kt b/node_modules/react-native-vision-camera/android/src/main/java/com/mrousavy/camera/frameprocessors/VisionCameraProxy.kt
index d697bef..8de418b 100644
--- a/node_modules/react-native-vision-camera/android/src/main/java/com/mrousavy/camera/frameprocessors/VisionCameraProxy.kt
+++ b/node_modules/react-native-vision-camera/android/src/main/java/com/mrousavy/camera/frameprocessors/VisionCameraProxy.kt
@@ -7,12 +7,14 @@ import com.facebook.jni.HybridData
 import com.facebook.proguard.annotations.DoNotStrip
 import com.facebook.react.bridge.ReactApplicationContext
 import com.facebook.react.bridge.UiThreadUtil
+import com.facebook.react.common.annotations.FrameworkAPI
 import com.facebook.react.turbomodule.core.CallInvokerHolderImpl
 import com.facebook.react.uimanager.UIManagerHelper
 import com.mrousavy.camera.core.ViewNotFoundError
 import com.mrousavy.camera.react.CameraView
 import java.lang.ref.WeakReference

+@OptIn(FrameworkAPI::class)
 @Suppress("KotlinJniMissingFunction") // we use fbjni.
 class VisionCameraProxy(private val reactContext: ReactApplicationContext) {
   companion object {
```
