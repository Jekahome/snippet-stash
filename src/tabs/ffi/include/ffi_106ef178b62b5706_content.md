

File minim.cpp:
<pre><code class="language-c">
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
 
extern "C"
 void write_easy(uint8_t *content,size_t count_buff){

    printf("\nПришел массив с++:\n"); 
    for (int i=0;i<count_buff;i++){
       printf("addr=%p, value=%d\n",content+i,*(content+i));  
       
       content[i]++;
    }

    FILE *fp;
    if ((fp=fopen("/media/jeka/PROJECTS/Develop/project_rust/rust-ffi-examples/test_rust_to_cpp/src/OUT.raw", "w"))==NULL) {
         printf ("Cannot open file.\n");
         exit(1);
    }
    fwrite( (char*)content, sizeof(uint8_t),count_buff ,fp);
    fclose(fp);   
}
</code></pre>

File Cargo.toml:

```toml
[package]
name = "test_rust_to_cpp"
version = "0.1.0"
edition = "2021"
build = "build.rs"

[dependencies]
libc = {version = "0.2", features=["std"]}

[build-dependencies]
cc = "1.0"
```

File build.rs:
<pre><code class="language-rust">
extern crate cc;

fn main() {
    cc::Build::new()
        .file("src/minim.cpp")
        .cpp(true)
        .compile("libtriple.a");
}
</code></pre>
