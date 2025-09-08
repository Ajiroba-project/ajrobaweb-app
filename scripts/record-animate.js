/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const url = require('url');
const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const ffmpegPath = require('ffmpeg-static');

function parseCliArgs() {
  const args = process.argv.slice(2);
  const options = {};
  for (const arg of args) {
    const [key, value] = arg.replace(/^--/, '').split('=');
    options[key] = value === undefined ? true : value;
  }
  return options;
}

function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function resolveExecutablePath() {
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const macChromium = '/Applications/Chromium.app/Contents/MacOS/Chromium';
  if (process.platform === 'darwin') {
    if (fs.existsSync(macChrome)) return macChrome;
    if (fs.existsSync(macChromium)) return macChromium;
  }
  return null; // Let puppeteer download/use bundled Chromium if not found
}

async function main() {
  const cwd = process.cwd();
  const opts = parseCliArgs();

  const width = Number(opts.width || 1920);
  const height = Number(opts.height || 1080);
  const fps = Number(opts.fps || 30);
  const durationSec = Number(opts.duration || 15);

  const htmlRelative = opts.input || 'src/app/auction-wins/components/animate.html';
  const inputHtmlPath = path.resolve(cwd, htmlRelative);
  if (!fs.existsSync(inputHtmlPath)) {
    console.error(`Input HTML not found at: ${inputHtmlPath}`);
    process.exit(1);
  }

  const defaultOut = path.resolve(cwd, 'public/holy_fire.mp4');
  const outputPath = path.resolve(cwd, opts.out || defaultOut);
  ensureDirectoryExists(outputPath);

  const fileUrl = url.pathToFileURL(inputHtmlPath).href;

  const executablePath = resolveExecutablePath();

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: executablePath || undefined,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--autoplay-policy=no-user-gesture-required',
      '--force-color-profile=srgb',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 2 });

    console.log('Opening HTML...', fileUrl);
    await page.goto(fileUrl, { waitUntil: 'networkidle2' });
    // Wait for fonts and first animation frame
    await page.evaluate(async () => {
      try {
        if (document && document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      } catch {}
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    });
    // Ensure main element is visible
    await page.waitForSelector('.prayer-container', { visible: true, timeout: 5000 });
    await page.waitForFunction(() => {
      const el = document.querySelector('.prayer-container');
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }, { timeout: 5000 });

    // Save a debug screenshot
    const debugShot = path.resolve(cwd, 'public/holy_fire_debug.png');
    await page.screenshot({ path: debugShot });

    const config = {
      followNewTab: false,
      fps,
      ffmpeg_Path: ffmpegPath || null,
      videoFrame: { width, height },
      videoCodec: 'libx264',
      videoPreset: 'ultrafast',
      videoCrf: 20,
      aspectRatio: '16:9',
      autopad: { color: 'black' },
    };

    const recorder = new PuppeteerScreenRecorder(page, config);
    console.log(`Recording ${durationSec}s @ ${fps}fps to: ${outputPath}`);
    await recorder.start(outputPath);

    await page.waitForTimeout(durationSec * 1000);

    await recorder.stop();
    console.log('Recording finished.');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


