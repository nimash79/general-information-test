const electron = require("electron");
const { app, BrowserWindow } = require('electron');
const path = require('path');
require('electron-reload')(__dirname, { 
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron'), 
  hardResetMethod: 'exit'
});
const electronLocalShortcut = require('electron-localshortcut');
const mongoose = require("mongoose");

const {Category, Question} = require("./src/database");

const ipc = electron.ipcMain;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    resizable: false,
    autoHideMenuBar: true,
    fullscreenable: true,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  win.loadFile('src/pages/index.html');

  electronLocalShortcut.register(win, 'Esc', () => {
    win.close();
  });
}

app.whenReady().then(async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/GeneralInformationContest")
    .then(async () => {
      console.log("db connected");
      createWindow();
    })
    .catch((err) => {
      console.log("db not connected", err);
      app.quit();
    });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipc.on("get-categories", async (event) => {
  const categories = await Category.find();
  event.sender.send("get-categories-reply", {categories: categories.map(c => c._doc)});
})

ipc.on("get-question", async (event, args) => {
  const {categoryTitle, level} = args;
  const category = await Category.findOne({title: categoryTitle});
  const notShowedQuestions = await Question.find({categoryId: category._id, level: parseInt(level), show: false});
  if (!notShowedQuestions.length) await Question.updateMany({categoryId: category._id, level: parseInt(level)}, {$set: {show: false}});
  const question = await Question.findOne({categoryId: category._id, level: parseInt(level), show: false});
  question.show = true;
  await question.save();
  event.sender.send("get-question-reply", {
    level: question.level,
    content_en: question.content_en,
    content_fa: question.content_fa,
    choices: question.choices.map(ch => ch),
    show: question.show,
  });
})