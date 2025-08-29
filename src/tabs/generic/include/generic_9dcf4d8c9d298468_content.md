


<pre><code class="language-rust">
trait UserRepo{}

// ❌ Плохо 
struct UserService<R: UserRepo> {
    repo: R,
}
</code></pre>

Мы указываем `R: UserRepo` здесь `bound`, поскольку мы хотим ограничить типы в repo поле для реализации `UserRepo` поведения.

Однако такое ограничение непосредственно на тип приводит к так называемому «загрязнению границ признаков»: мы должны повторять эту границу в каждом отдельном случае `impl`, даже в тех, которые вообще не имеют отношения к `UserRepo` поведению.
<pre><code class="language-rust">
impl<R> Display for UserService<R>
where
    R: Display + UserRepo, // Здесь нас не интересует UserRepo,  все, что нам нужно, это просто Display.
{                          
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "UserService with repo {}", self.repo)
    }
}
</code></pre>

В сложной кодовой базе такое загрязнение умножается из-за разных типов и в какой-то момент может стать кошмаром.

Решением этой проблемы было бы понимание того, что черта представляет собой определенное поведение, и на самом деле нам нужно это поведение только тогда, когда мы его декларируем. 

В объявлении типа ничего не говорится о поведении, все дело в данных. 
Именно в функциях и методах происходит поведение. 
Итак, давайте просто ожидаем определенного поведения, когда нам это действительно нужно:
<pre><code class="language-rust">
// ✅ Хорошо 
struct UserService<R> {
    repo: R,
}

// Ожидайте отображения, когда мы выражаем поведение отображения.
impl<R: Display> Display for UserService<R> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "UserService with repo {}", self.repo)
    }
}

// Ожидайте UserRepo, когда мы выражаем фактическое поведение UserService, который имеет дело с пользователями.
impl<R: UserRepo> UserService<R> {
    fn activate(&self, user: User) {
        // Изменение состояния пользователя в UserRepo ...
    }
}
</code></pre>

