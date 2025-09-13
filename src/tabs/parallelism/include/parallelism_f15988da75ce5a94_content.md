

Параллельная загрузка изображений с подсчетом количества файлов png
```
fn load_images(paths:&[PathBuf]) -> Vec<_Image> {
  let pngs = paths.par_iter().filter(|p|p.ends_with("png")).map(|_|1).sum(); // подсчет количества png файлов
  paths.par_iter().map(|path| _Image::load(path)).collect()
}
```

или

```
use std::sync::atomic::{AtomicUsize,Ordering};
fn load_images(paths:&[PathBuf]) -> Vec<_Image> {
 let pngs = AtomicUsize::new(0);
 paths.par_iter().map(|path| {
   if path.ends_with("png"){
    pngs.fetch_add(1,Ordering::SeqCst);
   }
   _Image::load(path);
  }).collect()
}
```
