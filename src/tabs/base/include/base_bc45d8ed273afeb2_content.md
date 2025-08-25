`cargo test` пишет ошибки в `stderr`, так что вы должны перенаправить `stderr` к `stdout` следующим образом:

`cargo test --color always 2>&1 | less -r`