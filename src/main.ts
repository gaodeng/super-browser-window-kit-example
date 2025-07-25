import { app, BrowserWindow, screen, ipcMain } from "electron";
import SuperBrowserWindowKit, { AutoresizingMask, GlassMaterialVariant } from "super-browser-window-kit";
import path from "node:path";
import { fileURLToPath } from "node:url";


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
SuperBrowserWindowKit.setLicense(LICENSE_CODE);

let mainWindow: BrowserWindow;



const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,

    frame: false,
    transparent: true,
    trafficLightPosition: { x: 20, y: 20 },
    titleBarStyle: "hiddenInset",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
    },
    show: false, // Prevent showing the window until the glass effect is ready
  });
  mainWindow.title = "";


  mainWindow.loadFile(path.join(__dirname, "../src/index.html"));
  SuperBrowserWindowKit.enableWindowCornerCustomization();
  SuperBrowserWindowKit.setWindowCornerRadius(mainWindow.getNativeWindowHandle(), 26);
  // Once the DOM/renderer is ready show the glass effect
  mainWindow.webContents.once("did-finish-load", () => {
    try {
      if (!SuperBrowserWindowKit) {
        console.error("SuperBrowserWindowKit is not loaded");
        return;
      }

      const windowSize = mainWindow.getSize();
      SuperBrowserWindowKit.addFullScreenOptionsMethod(mainWindow.getNativeWindowHandle());
      const glassId = SuperBrowserWindowKit.addGlassEffectView(mainWindow.getNativeWindowHandle(), {
        cornerRadius: 18,
      });
      const [winWidth, winHeight] = mainWindow.getSize();
      SuperBrowserWindowKit.updateFrame(mainWindow.getNativeWindowHandle(), glassId, {
        width: 207,
        x: 9,
        y: 9,
        height: winHeight! - 18,
      });
      SuperBrowserWindowKit.setVariant(mainWindow.getNativeWindowHandle(), glassId, GlassMaterialVariant.sidebar);
      SuperBrowserWindowKit.setAutoresizingMask(
        mainWindow.getNativeWindowHandle(),
        glassId,
        AutoresizingMask.FlexibleHeight
      );
      const bgId = SuperBrowserWindowKit.addBackgroundView(
        mainWindow.getNativeWindowHandle(),
        {
          color: {
            light: '#ffffff',
            dark: '#111111',
          },
          // cornerRadius: 26,
        },
      );
      SuperBrowserWindowKit._addon?.setFullScreenNotificationListener(
        mainWindow.getNativeWindowHandle(),
        (info: any) => {
          console.log("Full Screen Notification:", info);
          if (info.name === 'NSWindowDidEnterFullScreenNotification') {
            // SuperBrowserWindowKit.setWindowCornerRadius(mainWindow.getNativeWindowHandle(), 0);
            // SuperBrowserWindowKit.setBackgroundCornerRadius(mainWindow.getNativeWindowHandle(), bgId, 0);

            SuperBrowserWindowKit.removeWindowToolbar(mainWindow.getNativeWindowHandle());

          } else if (info.name === 'NSWindowWillExitFullScreenNotification') {
            // SuperBrowserWindowKit.setWindowCornerRadius(mainWindow.getNativeWindowHandle(), 26);
            // SuperBrowserWindowKit.setBackgroundCornerRadius(mainWindow.getNativeWindowHandle(), bgId, 26);


            const windowSize = mainWindow.getSize();
            SuperBrowserWindowKit.setWindowToolbar(mainWindow.getNativeWindowHandle(), "toolbar");
            mainWindow.setSize(windowSize[0]!, windowSize[1]!);

          }
        }
      );


      SuperBrowserWindowKit.setWindowToolbar(mainWindow.getNativeWindowHandle(), "toolbar");
      mainWindow.setSize(windowSize[0]!, windowSize[1]!); // Force redraw

      mainWindow.setWindowButtonVisibility(true); // restore traffic lights
      mainWindow.show(); // Show the window after glass effect is applied
    } catch (err) {
      console.error(err);
    }
  });
});

// Listen for renderer tweaks

// Standard quit handling
app.on("window-all-closed", () => {
  app.quit();
});


