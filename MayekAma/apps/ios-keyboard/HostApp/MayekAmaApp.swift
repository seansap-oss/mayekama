import SwiftUI

@main
struct MayekAmaApp: App {
    var body: some Scene {
        WindowGroup {
            VStack(spacing: 18) {
                Text("MayekAma")
                    .font(.largeTitle.bold())
                    .foregroundStyle(Color(red: 0.55, green: 0.07, blue: 0.06))
                Text("Roman Manipuri Keyboard & Standard")
                    .font(.title3)
                Text("Open iPhone Settings → General → Keyboard → Keyboards → Add New Keyboard, then select MayekAma.")
                    .multilineTextAlignment(.center)
                    .padding()
                Button("Open Settings") {
                    if let url = URL(string: UIApplication.openSettingsURLString) {
                        UIApplication.shared.open(url)
                    }
                }
                .buttonStyle(.borderedProminent)
            }
            .padding()
            .background(Color(red: 1.0, green: 0.97, blue: 0.91))
        }
    }
}
