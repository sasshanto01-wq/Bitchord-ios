/**
 * Generates an Apple iOS .mobileconfig WebClip profile.
 * When installed on an iOS device (iPhone/iPad), it directly places
 * a native-feeling WebClip app icon on the home screen.
 */
export function generateMobileConfigFile(appUrl: string, title = 'BitChord'): Blob {
  const profileUuid = 'bitchord-ios-uuid-2026-b4pakuekoy';
  const payloadUuid = 'bitchord-webclip-uuid-2026-b4pakuekoy';

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>FullScreen</key>
            <true/>
            <key>Icon</key>
            <data>
            </data>
            <key>IsRemovable</key>
            <true/>
            <key>Label</key>
            <string>${title}</string>
            <key>PayloadDescription</key>
            <string>Configures BitChord for iOS WebClip</string>
            <key>PayloadDisplayName</key>
            <string>${title}</string>
            <key>PayloadIdentifier</key>
            <string>com.bitchord.ios.webclip</string>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>${payloadUuid}</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>Precomposed</key>
            <true/>
            <key>URL</key>
            <string>${appUrl}</string>
        </dict>
    </array>
    <key>PayloadDescription</key>
    <string>Installs BitChord Hi-Res Music Client on your iOS Home Screen</string>
    <key>PayloadDisplayName</key>
    <string>${title} iOS App</string>
    <key>PayloadIdentifier</key>
    <string>com.bitchord.ios.profile</string>
    <key>PayloadOrganization</key>
    <string>BitChord Community</string>
    <key>PayloadRemovalDisallowed</key>
    <false/>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${profileUuid}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;

  return new Blob([xmlContent], { type: 'application/x-apple-aspen-config' });
}

export function downloadMobileConfig(appUrl: string, title = 'BitChord') {
  const blob = generateMobileConfigFile(appUrl, title);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}-iOS.mobileconfig`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
