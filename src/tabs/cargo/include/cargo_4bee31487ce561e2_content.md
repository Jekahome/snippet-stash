

```
cargo install cargo-bloat

% cargo bloat --release -n 10
Compiling ...
Analyzing target/release/cargo-bloat

 File  .text     Size       Crate Name
 0.9%   7.1%  27.0KiB cargo_bloat cargo_bloat::main
 0.8%   5.7%  21.4KiB cargo_bloat cargo_bloat::process_crate
 0.3%   2.3%   8.6KiB   [Unknown] read_line_info
 0.3%   2.1%   7.9KiB         std std::sys::unix::process::process_common::Command::capture_env
 0.3%   2.1%   7.8KiB        json json::parser::Parser::parse
 0.2%   1.7%   6.5KiB   [Unknown] elf_add
 0.2%   1.7%   6.3KiB         std __rdos_backtrace_dwarf_add
 0.2%   1.3%   5.0KiB         std <rustc_demangle::legacy::Demangle as core::fmt::Display>::fmt
 0.2%   1.3%   4.9KiB         std std::sys_common::backtrace::_print
 0.2%   1.3%   4.8KiB         std core::num::flt2dec::strategy::dragon::format_shortest
 9.8%  73.5% 278.0KiB             And 932 smaller methods. Use -n N to show more.
13.3% 100.0% 378.0KiB             .text section size, the file size is 2.8MiB
```
