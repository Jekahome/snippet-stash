

```
$ hyperfine --warmup 3 --min-runs 20 'target/release/fibonacci 100000000 100000000'  'target/release/fibonacci 100000000 100000000' 
Benchmark 1: target/release/fibonacci 100000000 100000000
  Time (mean ± σ):     343.6 ms ±  50.9 ms    [User: 95.6 ms, System: 241.1 ms]
  Range (min … max):   288.1 ms … 480.5 ms    20 runs
 
Benchmark 2: target/release/fibonacci 100000000 100000000
  Time (mean ± σ):     339.8 ms ±  32.8 ms    [User: 93.6 ms, System: 240.0 ms]
  Range (min … max):   285.6 ms … 407.1 ms    20 runs
 
Summary
  target/release/fibonacci 100000000 100000000 ran
    1.01 ± 0.18 times faster than target/release/fibonacci 100000000 100000000
```
