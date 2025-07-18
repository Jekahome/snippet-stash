# Chapter 1

# Example heading { #first .class1 .class2 }

<div>
   <button id="hint_on_theory">Подсказка по теории</button>
</div>

<div>
   <button id="execution_by_code">Выполнение кода https://glot.io</button>
</div>


[Ссылка на tab_1 главу](/tabs/tab_1/index.md)


<img src="/images/5.jpg" alt="описание" style="width: 10%; height: auto;">

<i class="fa fa-spinner fa-pulse fa-5x fa-fw"><span class="sr-only">Loading...</span></i>

<i class="fa fa-save fa-pulse fa-2x"></i>

<i class="fa fa-bars fa-3x" aria-hidden="true"></i>

<div class="btn-group">
    <a class="btn btn-default" href="#">
        <i class="fa fa-align-justify" title="Align Justify"></i>
    </a>
</div>

<i class="fa fa-th" aria-hidden="true"></i>

<i class="fa fa-file" aria-hidden="true"></i>

<i class="fa fa-minus-square" aria-hidden="true"></i>

<i class="fa fa-hand-o-down" aria-hidden="true"></i>

<a class="btn btn-default" href="#"><i class="fa fa-hand-o-up" aria-hidden="true"></i></a>


I get 10 times more traffic from [Google][] than from
[Yahoo][] or [MSN][].

  [google]: http://google.com/        "Google"
  [yahoo]:  http://search.yahoo.com/  "Yahoo Search"
  [msn]:    http://search.msn.com/    "MSN Search"


# Latex

$${\color{red}Red}$$

$${\color{green}Green}$$

$${\color{lightgreen}Light \space Green}$$


# Table

| Left-aligned | Center-aligned | Right-aligned |
| :---               |     :---:               |                  ---: |
| git status     | git status          | git status        |
| git diff          | git diff               | git diff             |


 
# Mermaid 

## XYchart

```mermaid
xychart-beta
  title "Training progress"
  x-axis [mon, tues, wed, thur, fri, sat, sun]
  y-axis "Time trained (minutes)" 0 --> 300
  bar [60, 0, 120, 180, 230, 300, 0]
  line [60, 0, 120, 180, 230, 300, 0]
```

## Journey

```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```


## Sequence

```mermaid
sequenceDiagram
  Actor Customer as User
  participant LoginPage as Log in page
  participant P1 as Log in details storage
  participant P2 as Security Department

  Customer ->>+ LoginPage: Input: Username
  Customer ->>+ LoginPage: Input: Password
  LoginPage ->> P1: Username and password
  P1 ->> P1: Authenticate
  alt Successful Authentication
    LoginPage ->> LoginPage: Redirect to welcome page
    LoginPage ->> Customer: Log in successful, stand by
  else Failed Authentication
  P1 ->> LoginPage: If rejected
  Customer ->> Customer: I forgot my password...
  LoginPage ->> Customer: Password Hint
  Customer ->> Customer: I still can't remember...
end

LoginPage ->> Customer: Do you wish to reset your password
opt Password Reset Flow
  Customer ->> LoginPage: Yes
  LoginPage ->> P2: New password request
  P2 ->> P2: Validate email address
  P2 ->> Customer: Email sent with a reset link
  Customer ->> P2: Input new password
  P2 ->> P2: Process new password
  P2 ->> P1: Store new password
  P2 ->> P2: Redirect user to log in page
end
```

### State

```mermaid
stateDiagram
    [*] --> Still
    Still --> [*]
    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

## Mindmap

```mermaid
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularization
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
```

## Architecture

```mermaid
architecture-beta
    group api(cloud)[API]

    service db(database)[Database] in api
    service disk1(disk)[Storage] in api
    service disk2(disk)[Storage] in api
    service server(server)[Server] in api

    db:L -- R:server
    disk1:T -- B:server
    disk2:T -- B:db
```

## Git

```mermaid
gitGraph
        commit
        commit
        branch develop
        checkout develop
        commit
        commit
        checkout main
        merge develop
        commit
        commit
```

## Pie

```mermaid
%%{init: {"pie": {"textPosition": 0.5}, "themeVariables": {"pieOuterStrokeWidth": "5px"}} }%%
pie showData
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
```

## QuadrantChart

```mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
```



```mermaid
graph TD
    A[Ширина 100px] -->|Толщина 2px| B(Круг 50px)
    style A width:100px,height:50px
    style B stroke-width:2px,width:50px,height:50px
```

```mermaid
graph TD
    A[Ширина 100px] -->|Толщина 2px| B(Круг 50px)
    style A width:100px,height:50px
    style B stroke-width:2px,width:50px,height:50px
```

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
 
<div class="mermaid">
graph TD
    A --> B
</div>




# Markdown javascript

```javascript
// javascript codeblock
    setTimeout(() => {
        console.log(1 + 2);
        console.log(document.getElementById("hint_on_theory").innerText);
    }, 1000);

```

# HTML javascript

<pre><code class="language-javascript"> 
    // javascript codeblock
    setTimeout(() => {
        console.log(1 + 2);
        console.log(document.getElementById("hint_on_theory").innerText);
    }, 1000);
</code></pre>

---

# Markdown python

```python
# python codeblock
def print_person(name, age = 18):
    print(f"Name: {name}  Age: {age}")
print_person("Bob")

```

# HTML python

<pre><code class="language-python"> 
# python codeblock
def print_person(name, age = 18):
    print(f"Name: {name}  Age: {age}")
print_person("Bob")
</code></pre>

---

 

# Markdown C

```c
#include <stdio.h>
int main() { printf("Hello WASI!"); return 0; }
```

# HTML C

<pre><code class="language-c"> 
#include <stdio.h>
int main() { printf("Hello WASI!"); return 1; }
</code></pre>

---

$$ 
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
 
<script>
document.addEventListener('DOMContentLoaded', async () => {
    try {
       
        document.getElementById('hint_on_theory').addEventListener('click', function() {
            const token = prompt("токен:");
            if (!token) {
                console.error("Ошибка: Заполните поля token");
                return;
            }

            console.log('hint_on_theory');
        
        
        });

        document.getElementById('execution_by_code').addEventListener('click', function() {
            const token = prompt("токен:");
            if (!token) {
                console.error("Ошибка: Заполните поля token");
                return;
            }

            console.log('execution_by_code');
        
            fetch('https://glot.io/api/run', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}` 
                },
                body: JSON.stringify({
                    language: 'python',
                    files: [
                    { name: 'main.py', content: 'print("Hello from Glot.io!")' }
                    ]
                })
             })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        });



    } catch (error) {
        console.error("Error:", error);
    }
});
</script> 
