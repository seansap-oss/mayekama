plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.mayekama.keyboard"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.mayekama.keyboard"
        minSdk = 26
        targetSdk = 35
        versionCode = 5
        versionName = "0.5-build5-alpha"
    }
}
