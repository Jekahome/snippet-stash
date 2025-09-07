

Реализуйте следующие функции:

* generate_password(): генерирует случайный пароль заданной длины и набора символов;
* select_rand_val(): извлекает случайный элемент из заданного среза;
* get_file_hash(): возвращает хэш SHA-3 файла, указанного в его пути.
* hash_password(): возвращает хэш пароля Argon2 для данного пароля.
* new_access_token(): генерирует уникальное криптографически безопасное случайное значение в a-zA-Z0-9наборе символов и содержит точно 64символы.



<pre><code class="language-rust">
use std::path::PathBuf;

use rand::{
    distributions::Alphanumeric,
    seq::{IteratorRandom, SliceRandom},
    Rng, SeedableRng,
};
use rand_chacha::ChaCha8Rng;
use sha3::{Digest, Sha3_256};

fn generate_password<'a>(elements: impl Into<&'a str>, len: usize) -> String {
    let mut rng = rand::thread_rng();

    elements
        .into()
        .chars()
        .choose_multiple(&mut rng, len)
        .to_vec()
        .into_iter()
        .collect()
}

fn select_rand_val<T>(slice: &[T]) -> Option<&T> {
    let mut rng = rand::thread_rng();
    slice.choose(&mut rng)
}

fn new_access_token() -> String {
    let mut rng = ChaCha8Rng::from_entropy();
    (0..64).map(|_| rng.sample(Alphanumeric)).collect()
}

fn get_file_hash(path: impl Into<PathBuf>) -> Option<Vec<u8>> {
    let str = std::fs::read_to_string(path.into()).ok()?;
    let hash = Sha3_256::digest(str.as_bytes()).to_vec();
    Some(hash)
}

fn hash_password<'a>(password: impl Into<&'a str>) -> String {
    let mut hasher = argonautica::Hasher::default();
    hasher
        .with_password(password.into())
        .opt_out_of_secret_key(true)
        .hash()
        .unwrap()
}

fn main() {
    println!("{}", generate_password("abcd", 5));
    println!("{}", select_rand_val(&[1, 2, 3, 4]).unwrap());
    println!("{}", new_access_token());
    println!("{}", hash_password("password"));

    let mut path = std::env::current_dir().unwrap();
    path.push("README.md");
    dbg!(get_file_hash(path).unwrap());
}
</code></pre>
