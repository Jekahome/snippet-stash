

```
# Show targets:
$ rustup component list --installed

# Install your target:
$ rustup target add thumbv7m-none-eabi

$ rustup show
```

 
**File .cargo/config.toml**:

```toml
[build]
target = "thumbv7m-none-eabi"
```

Build:
```
$ cargo build
$ cargo build --target thumbv7m-none-eabi (если нет файла config.toml)
```

**File main.rs**:
```
#![no_main]
#![no_std]

use ::core::panic::PanicInfo;

#[panic_handler]
fn panic(_panic: &PanicInfo<'_>) -> ! {
    loop {}
}
```
