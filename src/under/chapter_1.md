# Chapter 1

<div>
   <button id="hint_on_theory">Подсказка по теории</button>
</div>

<div>
   <button id="execution_by_code">Выполнение по кода https://glot.io</button>
</div>

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
