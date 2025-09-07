


<pre><code class="language-rust">
use std::fs::{File, OpenOptions};
use std::io::{Write, Read};
use std::time::{SystemTime, UNIX_EPOCH};

fn main() -> std::io::Result<()> {
    // -------------------
    // Создание файла
    // -------------------
    let mut file = File::create("example.txt")?;
    file.write_all(b"Hello, Rust!")?;
    println!("Файл создан и записан.");

    // -------------------
    // Метаданные и изменение размера
    // -------------------
    let metadata = file.metadata()?;
    println!("Размер файла: {}", metadata.len());
    // методы Metadata
    //println!("metadata={:#?}",file.metadata()?);
    println!("{:?}",metadata.file_type());
    println!("{:?}",metadata.is_dir());
    println!("{:?}",metadata.is_file());
    println!("{:?}",metadata.len());
    println!("{:?}",metadata.permissions().readonly());
    
     println!("{:#?}",std::fs::metadata("file.txt"));//или ф-цию

    // Устанавливаем новые permissions
    let mut perms = file.metadata()?.permissions();
    perms.set_readonly(true);
    file.set_permissions(perms)?;

    // Устанавливаем новый размер
    file.set_len(5)?;
    println!("Файл усечён до 5 байт.");

    // -------------------
    // Синхронизация
    // -------------------
    file.sync_all()?; // сброс данных и метаданных
    println!("Данные синхронизированы с диском.");

    // -------------------
    // Чтение файла
    // -------------------
    let mut content = String::new();
    file.reopen()?.read_to_string(&mut content)?;
    println!("Содержимое файла: {:?}", content);

    // -------------------
    // Открытие с опциями
    // -------------------
    let file2 = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open("example2.txt")?;
    println!("Файл example2.txt открыт с OpenOptions.");

    // -------------------
    // Блокировки (только на Unix/Windows с поддержкой)
    // -------------------
    #[cfg(unix)]
    {
        use fs2::FileExt; // для lock/lock_shared/unlock (через внешнюю crate fs2)
        file2.lock_shared()?;
        println!("Файл заблокирован для чтения.");
        file2.unlock()?;
        println!("Блокировка снята.");
    }

    Ok(())
}

</code></pre>
