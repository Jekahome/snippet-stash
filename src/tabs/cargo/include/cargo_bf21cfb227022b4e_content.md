

```
$ curl -s https://static.rust-lang.org/rustup.sh | sh -s -- --channel=nightly

curl https://sh.rustup.rs -sSf | sh -s -- -y
```

---

```
# sudo mount -o remount,exec /tmp # если папка смонтирована как noexec

curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh 

export PATH="$PATH:$HOME/.cargo/bin"

sudo apt-get install build-essential # доп. пакеты

sudo apt-get install libc6-dev
sudo apt-get install libssl-dev
```
