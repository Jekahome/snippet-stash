

Представьте, что вы используете библиотеку `C` в своем проекте `Rust`. Допустим, вы получаете буфер данных из кода `C` в виде указателя `*const u8` и длины `usize`. Допустим, вы хотели бы передать данные по слою логики ржавчины, возможно, изменив их (заставляет ли это вас задуматься `Cow`?)
<pre><code class="language-rust">
use std::borrow::{Borrow, Cow};
use std::fmt::{Debug, Formatter};
use std::ops::Deref;

struct NativeBuffer {
    pub ptr: *const u8,
    pub len: usize
}

impl Borrow<[u8]> for NativeBuffer {
    fn borrow(&self) -> &[u8] {
        unsafe {
            std::slice::from_raw_parts(self.ptr, self.len)
        }
    }
}

impl Deref for NativeBuffer {
    type Target = [u8];

    fn deref(&self) -> &Self::Target {
        self.borrow()
    }
}

impl Debug for NativeBuffer {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let data: &[u8] = self.borrow();
        write!(f, "NativeBuffer {{ data: {:?}, len: {} }}", data, self.len)
    }
}

#[derive(Debug)]
struct OwnedBuffer {
    owned_data: Vec<u8>,
    native_proxy: NativeBuffer,
}

impl ToOwned for NativeBuffer {
    type Owned = OwnedBuffer;

    fn to_owned(&self) -> OwnedBuffer {
        let slice: &[u8] = self.borrow();
        let owned_data = slice.to_vec();
        let native_proxy = NativeBuffer {
            ptr: owned_data.as_ptr(),
            len: owned_data.len()
        };
        OwnedBuffer {
            owned_data,
            native_proxy,
        }
    }
}
impl Borrow<NativeBuffer> for OwnedBuffer {
    fn borrow(&self) -> &NativeBuffer {
        &self.native_proxy
    }
}
impl OwnedBuffer {

    pub fn append(&mut self, data: &[u8]) {
        self.owned_data.extend(data);
        self.native_proxy = NativeBuffer {
            ptr: self.owned_data.as_ptr(),
            len: self.owned_data.len()
        };
    }
}
fn main() {
    // Simulates the data coming across FFI (from C)
    let data = vec![1, 2, 3];
    let ptr = data.as_ptr();
    let len = data.len();

    let native_buffer = NativeBuffer { ptr, len};
    let mut buffer = Cow::Borrowed(&native_buffer);
    // NativeBuffer { data: [1, 2, 3], len: 3 }
    println!("{:?}", buffer);

    // No data cloned
    assert_eq!(buffer.ptr, ptr);
    assert_eq!(buffer.len, len);

    if buffer.len > 1 {
        buffer.to_mut().append(&[4, 5, 6]);
        // OwnedBuffer { owned_data: [1, 2, 3, 4, 5, 6], native_proxy: NativeBuffer { data: [1, 2, 3, 4, 5, 6], len: 6 } }
        println!("{:?}", buffer);

        // Data is cloned
        assert_ne!(buffer.ptr, ptr);
        assert_eq!(buffer.len, len + 3);
    }
    let slice: &[u8] = &buffer;
    // [1, 2, 3, 4, 5, 6]
    println!("{:?}", slice);
}
</code></pre>
