


<pre><code class="language-rust">
use std::collections::HashMap;
use peak_alloc::PeakAlloc;

#[global_allocator]
static PEAK_ALLOC: PeakAlloc = PeakAlloc;

fn main() {
    let current_mem_before = PEAK_ALLOC.current_usage_as_mb();
        println!("В настоящее время эта программа использует {} MB of RAM.", current_mem_before);
        let peak_mem_before = PEAK_ALLOC.peak_usage_as_gb();
        println!("Максимальная сумма, которая была использована {}\n\n", peak_mem_before);

    let mut vec: Vec<i32> = Vec::with_capacity(2048);
    //let mut map = HashMap::new();
    for i in 0..10000000{
        vec.push(i);
        //map.insert(i, i);
    }

    let current_mem_after = PEAK_ALLOC.current_usage_as_mb();
        println!("В настоящее время эта программа использует {} MB of RAM.", current_mem_after);
        let peak_mem_after = PEAK_ALLOC.peak_usage_as_gb();
        println!("Максимальная сумма, которая была использована {}", peak_mem_after);

    println!("Занимаемая память {}", peak_mem_after-peak_mem_before);// vec =  0.031250954
                                                                                                                       // hash = 0.59013176                                                                    
}
</code></pre>

<details>
<summary>Output:</summary>
```
Vec 10000000 -------------------------------------------------
В настоящее время эта программа использует 0.00005054474 MB of RAM.
Максимальная сумма, которая была использована 0.000000049360096
+++
В настоящее время эта программа использует 64.00103 MB of RAM.
Максимальная сумма, которая была использована 0.031251002

HashMap 10000000 -------------------------------------------------
В настоящее время эта программа использует 0.00005054474 MB of RAM.
Максимальная сумма, которая была использована 0.000000049360096
+++
В настоящее время эта программа использует 144.00104 MB of RAM.
Максимальная сумма, которая была использована 0.07031352
```
</details>
