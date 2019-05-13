const builder = require("electron-builder");

builder
  .build({
    targets: builder.Platform.MAC.createTarget(),
    config: {
      electronVersion: "6.0.0-nightly.20190404",
      electronDist: "/Users/kevinhu/electron-gn/src/out/Release",
      mac: {
        appId: "???", // apple bundle ID
        type: "development",
        provisioningProfile: "???.provisionprofile",
        entitlements: "entitlements-dev.plist"
      },
      files: ['build/Release/*.node', 'src', 'package.json'],
      asar: false,
    }
  });
