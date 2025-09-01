


<pre><code class="language-rust">
fn main(){
 // Записать отформатированные данные в буфер
     use std::io::Write;

    let mut w:Vec<u8> = Vec::new();
    write!(&mut w, "test").unwrap();
    write!(&mut w, "formatted {}", "arguments").unwrap();
    //assert_eq!(w, b"testformatted arguments");

    let mut w = String::new();
    write!(&mut w, "test").unwrap();
    write!(&mut w, "formatted {}", "arguments").unwrap();
    assert_eq!(w, "testformatted arguments");
 
    let mut w:Vec<u8>= Vec::new();
    writeln!(&mut w)?;
    writeln!(&mut w, "test")?;
    writeln!(&mut w, "formatted {}", "arguments")?;

    assert_eq!(&w[..], "\ntest\nformatted arguments\n".as_bytes());
}
</code></pre>
