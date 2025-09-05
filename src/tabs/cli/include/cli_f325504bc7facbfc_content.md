


<pre><code class="language-rust">
use std::ffi::OsStr;
use std::io::Write;
use std::process::{Child, Command, Output, Stdio};

fn spawn_child<I, S>(args: I) -> Child
where
    I: IntoIterator<Item = S>,
    S: AsRef<OsStr>,
{
    Command::new("cargo")
        .args(&["run", "-p", "step_3_1", "--"])
        .args(args)
        .stdout(Stdio::piped())
        .stdin(Stdio::piped())
        .spawn()
        .expect("Failed to run step_3_1")
}

fn get_output<I, S>(args: I) -> Output
where
    I: IntoIterator<Item = S>,
    S: AsRef<OsStr>,
{
    Command::new("cargo")
        .args(&["run", "-p", "step_3_1", "--"])
        .args(args)
        .output()
        .expect("Failed to run step_3_1")
}

fn write<'a, B: Into<&'a [u8]>>(child: &mut Child, buf: B) {
    let stdin = child.stdin.as_mut().expect("Failed to open stdin");
    stdin
        .write_all(buf.into())
        .expect("Failed to write to stdin");
}

fn get_stdout(child: Child) -> Vec<u8> {
    child
        .wait_with_output()
        .expect("Process did not end after right number was given")
        .stdout
}
</code></pre>
