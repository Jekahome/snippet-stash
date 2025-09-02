


<pre><code class="language-rust">
// возвращает несколько Users по их идентификаторам;
fn getUsersByIDs(&self, vec: Vec<usize>) -> Option<HashMap<usize, User<'u>>> {
    let map: HashMap<usize, User<'u>> = self.users
        .iter()
        .filter(|ref value| vec.contains(&value.1.getID()))
        .cloned()
        .collect::<HashMap<usize, User>>();
    Some(map)
}
//возвращает IDs Users, которых nickname содержит заданную строку (функция поиска)
fn getIDsUserByNickname(&self, nickname: &str) -> Option<Vec<usize>> {
    let nickname = nickname.to_lowercase();
    let nickname: &str = nickname.as_str();
    let map: HashMap<usize, User<'u>> = self.users
        .iter()
        .filter(|ref value| value.1.getNickname().to_lowercase().contains(nickname))
        .cloned()
        .collect::<HashMap<usize, User>>();
    Some(map.keys().cloned().collect::<Vec<usize>>())
}
</code></pre>
