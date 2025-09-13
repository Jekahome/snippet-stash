

```
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct FileContentsResponse<'a> {
    is_error: bool,
    stream_id: u32,
    data: Cow<'a, [u8]>,
}
impl<'a> FileContentsResponse<'a> {
    pub fn new_data_response(stream_id: u32, data: impl Into<Cow<'a, [u8]>>) -> Self {
        Self {
            is_error: false,
            stream_id,
            data: data.into(),
        }
    }
    /// Creates a new `FileContentsResponse` with u64 size value
    pub fn new_size_response(stream_id: u32, size: u64) -> Self {
        Self {
            is_error: false,
            stream_id,
            data: Cow::Owned(size.to_le_bytes().to_vec()),
        }
    }
    /// Creates new `FileContentsResponse` with error
    pub fn new_error(stream_id: u32) -> Self {
        Self {
            is_error: true,
            stream_id,
            data: Cow::Borrowed(&[]),
        }
    }
}
```
