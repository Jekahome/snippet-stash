


```
# --call-graph=dwarf tells the profiler use the debug symbols we added
sudo perf record --call-graph=dwarf target/release/fibonacci 100000000 100000000

cargo install samply

sudo chown "$USER" perf.data # because we recorded the profile with `sudo`chown "$USER" perf.data # because we recorded the profile with `sudo`

samply load perf.data
```
