

Глобальный файл `~/.config/Code/User/settings.json`

Локальный файл `.vscode/settings.json`

```
{
    "editor.minimap.enabled": false,
    "window.zoomLevel": -1,
    "files.autoSave": "afterDelay",
 
    "tabnine.experimentalAutoImports": true,
    "editor.codeActionsOnSave": {

    },
    "rust-analyzer.procMacro.ignored": {
        

    },
    "rust-analyzer.procMacro.server": null,
    "debug.allowBreakpointsEverywhere": true,
    
    "rust-analyzer.inlayHints.bindingModeHints.enable": true,
    "editor.inlayHints.enabled": "on", # это подсказки в коде
   "rust-analyzer.check.command": "check", # будет запускаться cargo clippy при сохранении файла
    "window.enableMenuBarMnemonics": false
}
```

---

```
${userHome} - путь к домашней папке пользователя
${workspaceFolder} - путь к папке, открытой в VS Code
${workspaceFolderBasename} — имя папки, открытой в VS Code, без косых черт (/)
${file} - текущий открытый файл
${fileWorkspaceFolder} - рабочая папка текущего открытого файла
${relativeFile} - текущий открытый файл относительноworkspaceFolder
${relativeFileDirname} - имя каталога текущего открытого файла относительноworkspaceFolder
${fileBasename} - базовое имя текущего открытого файла
${fileBasenameNoExtension} - базовое имя текущего открытого файла без расширения.
${fileExtname} - расширение текущего открытого файла
${fileDirname} - путь к папке с текущим открытым файлом
${fileDirnameBasename} - имя папки текущего открытого файла
${cwd} — текущий рабочий каталог исполнителя задач при запуске VS Code.
${lineNumber} - номер текущей выделенной строки в активном файле
${selectedText} - текущий выделенный текст в активном файле
${execPath} — путь к исполняемому файлу VS Code.
${defaultBuildTask} — имя задачи сборки по умолчанию.
${pathSeparator} — символ, используемый операционной системой для разделения компонентов в путях к файлам.
```
