


<pre><code class="language-rust">
use std::fs::File;
use std::io::Read;
use std::path::Path;
use std::path::PathBuf;
use std::sync::{Arc, RwLock};
use std::thread;
use std::sync::mpsc::{self,Receiver,Sender};
use std::time::{Duration, Instant};
 
const DIR:&str = "Text";
fn main(){
    let mut paths:Vec<PathBuf> = Vec::<PathBuf>::new();
 
    if let Ok(entries) = std::fs::read_dir(DIR) {     
        for entry in entries {
            if let Ok(entry) = entry {
                 paths.push(entry.path());
            }
        }
    }
    let size = paths.len();

    let now = Instant::now();
    let (tx, rx): (Sender<Option<(String,u64)>>, Receiver<Option<(String,u64)>>) = mpsc::channel();

    let input:String = "Месопотамии".to_lowercase();
    let search = Arc::new(RwLock::new(input));

    let rwlock = Arc::new(RwLock::new(paths));

    for i in 0..size {
       let (c_rwlock, tx,search_) = (Arc::clone(&rwlock), tx.clone(),Arc::clone(&search));
        
       thread::spawn(move || {
             let mut result:Option<(String,u64)> = None;

            if let Ok(path_) = c_rwlock.try_read() {
                 
                let path:&Path = Path::new(path_[i].as_path());

                let mut file:File = File::open(path).unwrap();
                let len:u64 = file.metadata().unwrap().len();

                let mut contents:String  = String::with_capacity(len as usize);
                file.read_to_string(&mut contents).unwrap();

                let search:&str =  &search_.try_read().unwrap();

                if contents.as_str().to_lowercase().contains(search) == true {   
                 result=Some((String::from(path.to_str().unwrap()) ,contents.find(search).unwrap_or(0) as u64));
                } 
            }; 
            tx.send(result);// отправка результата
        });
    }
    // Получение результата
    for _ in 0..size {
        if let Some(r) =  rx.recv().ok(){
         if r.is_some(){
          println!("{:?}",r.unwrap()); 
         }
       }           
    }
   println!("{:?}", now.elapsed());// Duration { secs: 0, nanos: 22426377 }
  }
</code></pre>
