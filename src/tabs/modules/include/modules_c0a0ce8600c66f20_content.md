

С 2018 edition можно писать так:

```
$ tree src

```

```
src
├── lib.rs
├── main.rs
├── network
│   ├── client.rs
│   └── server.rs
└── network.rs

```

File lib.rs:

```
pub mod network;
```

File network.rs:

```

pub mod client;
pub mod server;
```
