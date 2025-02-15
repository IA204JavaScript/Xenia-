alert("Этот код выполнен из внешнего файла!");
   console.log("Сообщение в консоли");
   let name="Xenia"
   let birthYear="26.03.2006"
   let sStudent=true
   let score = prompt("Введите ваш балл:");
   if (score >= 90) {
     console.log("Отлично!");
   } else if (score >= 70) {
     console.log("Хорошо");
   } else {
     console.log("Можно лучше!");
   }

   for (let i = 1; i <= 5; i++) {
     console.log(`Итерация: ${i}`);
   }