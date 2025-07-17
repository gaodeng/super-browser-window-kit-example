import { app, BrowserWindow, screen, ipcMain } from "electron";
import FidelityKit, { AutoresizingMask, GlassMaterialVariant } from "electron-tahoe-fidelity-kit";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
  FidelityKit.enableWindowCornerCustomization();
  FidelityKit.setWindowCornerRadius(mainWindow.getNativeWindowHandle(), 26);
  // Once the DOM/renderer is ready show the glass effect
  mainWindow.webContents.once("did-finish-load", () => {
    try {
      if (!FidelityKit) {
        console.error("FidelityKit is not loaded");
        return;
      }

      const windowSize = mainWindow.getSize();
      FidelityKit.addFullScreenOptionsMethod(mainWindow.getNativeWindowHandle());
      const glassId = FidelityKit.addGlassEffectView(mainWindow.getNativeWindowHandle(), {
        cornerRadius: 18,
      });
      const [winWidth, winHeight] = mainWindow.getSize();
      FidelityKit.updateFrame(mainWindow.getNativeWindowHandle(), glassId, {
        width: 207,
        x: 9,
        y: 9,
        height: winHeight! - 18,
      });
      FidelityKit.setVariant(mainWindow.getNativeWindowHandle(), glassId, GlassMaterialVariant.sidebar);
      FidelityKit.setAutoresizingMask(
        mainWindow.getNativeWindowHandle(),
        glassId,
        AutoresizingMask.FlexibleHeight
      );
      const bgId = FidelityKit.addBackgroundView(
        mainWindow.getNativeWindowHandle(),
        {
          color: {
            light: '#ffffff',
            dark: '#111111',
          },
          // cornerRadius: 26,
        },
      );
      FidelityKit._addon?.setFullScreenNotificationListener(
        mainWindow.getNativeWindowHandle(),
        (info: any) => {
          console.log("Full Screen Notification:", info);
          if (info.name === 'NSWindowDidEnterFullScreenNotification') {
            // FidelityKit.setWindowCornerRadius(mainWindow.getNativeWindowHandle(), 0);
            // FidelityKit.setBackgroundCornerRadius(mainWindow.getNativeWindowHandle(), bgId, 0);

            FidelityKit.removeWindowToolbar(mainWindow.getNativeWindowHandle());

          } else if (info.name === 'NSWindowWillExitFullScreenNotification') {
            // FidelityKit.setWindowCornerRadius(mainWindow.getNativeWindowHandle(), 26);
            // FidelityKit.setBackgroundCornerRadius(mainWindow.getNativeWindowHandle(), bgId, 26);


            const windowSize = mainWindow.getSize();
            FidelityKit.setWindowToolbar(mainWindow.getNativeWindowHandle(), "toolbar");
            mainWindow.setSize(windowSize[0]!, windowSize[1]!);

          }
        }
      );


      FidelityKit.setWindowToolbar(mainWindow.getNativeWindowHandle(), "toolbar");
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


