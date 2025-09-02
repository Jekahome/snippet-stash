

Соединение вместе с другим итератором. 
Предположим, что мы хотим перебирать каждый файл .foo каталога, но также файл конфигурации  `.foorc`:
Создает итератор, который дает элемент ровно один раз.
Это обычно используется для адаптации одного значения к chain другим видам итераций.
<pre><code class="language-rust">
use std::iter;
use std::fs;
use std::path::PathBuf;
fn main(){
    let dirs = fs::read_dir(".foo").unwrap();
    let dirs = dirs.map(|file| file.unwrap().path());
    let config = iter::once(PathBuf::from(".foorc"));

// свяжите два итератора вместе в один большой итератор 
    let files = dirs.chain(config);

//  это даст нам все файлы в .foo, а также .foorc для  .foorc в файлах  
    for f in files {
        println!("{:?}", f);
    }
}
</code></pre>

---

<pre><code class="language-rust">
use std::iter;
use std::fs;
use std::path::PathBuf;
fn main(){
    let dirs = fs::read_dir(".foo").unwrap();

    // нам нужно преобразовать итератор DirEntry-s в итератор 
    // PathBufs, поэтому мы используем map
    let dirs = dirs.map(|file| file.unwrap().path());

    // теперь наш итератор только для нашего конфигурационного файла
    let config = iter::once(PathBuf::from(".foorc"));

    // объединить два итератора в один большой итератор
    let files = dirs.chain(config);

    // это даст нам все файлы в .foo, а также .foorc
    for f in files {
        println!("{:?}", f);
    }
}
</code></pre>
