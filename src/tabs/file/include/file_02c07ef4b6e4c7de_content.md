


<pre><code class="language-rust">
use std::fs::File;
use std::io::Read;
use std::io::SeekFrom;
use std::io::Seek;
use std::io::IoSliceMut;

fn read_exam() -> std::io::Result<()> {
    let mut f = File::open("src/sentence.wav")?;//открыть только для чтения
    //f.seek(SeekFrom::Start(44))?;

    let mut buffer:[u8;6] = [0; 6];
    // читать до 6 байт
    f.read(&mut buffer[..])?;
    println!("{:?}",buffer);
   
    f.seek(std::io::SeekFrom::Start(0));

    // Семантически это оболочка вокруг &mut [u8],
    // но гарантируется совместимость ABI с этим iovec типом на платформах Unix и WSABUF в Windows
    let mut buf = std::io::IoSliceMut::new(&mut buffer);

    let mut buf1 = [0; 6];
    let mut bufs = &mut [
        IoSliceMut::new(&mut buf1),
    ][..];

    f.read_vectored(&mut bufs[..])?;
    println!("{:?}",bufs.first().unwrap());

    assert_eq!(buffer.to_vec(),bufs.first().unwrap().to_vec());
    Ok(())
}
</code></pre>
