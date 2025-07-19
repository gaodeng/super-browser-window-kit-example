# super-browser-window-kit-example
![Super Browser Window Kit Screenshot](./docs/screenshot.png)

## Quick Start
```js
import { app, BrowserWindow } from 'electron';
import SuperBrowserWindowKit, { AutoresizingMask, GlassMaterialVariant } from "super-browser-window-kit";

/**
 * =====================[ LICENSE NOTICE ]=====================
 * This license code is valid only for com.github.Electron test builds.
 * It will NOT work in production environments.
 * For production use, please obtain a valid commercial license.
 *
 * Official website: https://botgem.com
 * Contact: hi@botgem.com
 * ===========================================================
 */
const LICENSE_CODE = "GCAYQ-ASCAG-Q76KA-ELXLU-HN8CV-3ZK8P-STALL-QLSVZ-9FFSX-3S2ZU-4QVSC-LLJ7U-KH6K7-G88HA-4TTDJ-58G9H-GZFY6-DDSDJ-L5ZB9-V7UMB-896CS-P9AVC-GULAB-EEAGQ-T77DP-DRBJN-G829M-ZZF9M-L2VEN-RZM8F-SQ4KW-3JLLB-MUVXP-TS3P8-7ZFZM-4L2P3-S4TTA-Z7EVY-Z5H9J-FYDUS-WQCYW-C92PZ-BB23J-QZEVP-QNQ"
app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    titleBarStyle: 'hiddenInset',
    show: false,
  });
  win.loadFile('index.html');
  SuperBrowserWindowKit.setLicense(LICENSE_CODE)
  SuperBrowserWindowKit.enableWindowCornerCustomization();
  SuperBrowserWindowKit.setWindowCornerRadius(win.getNativeWindowHandle(), 26);
  win.show();
});
```