

File .vscode/launch.json

```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "lldb",
                "request": "launch",
                "name": "Launch",
                "program": "${workspaceFolder}/target/debug/my_debugger",
                "args": [],
                "cwd": "${workspaceFolder}"
            }
        ]
    }
```

Click Debug -> Add Configuration

Выполнить > Добавить конфигурацию

CodeLLDB Launch


