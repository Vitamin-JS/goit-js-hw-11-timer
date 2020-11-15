// Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной даты.
// Такой плагин может использоваться в блогах и интернет - магазинах, страницах регистрации событий, 
// во время технического обслуживания и т.д.

// Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.
// Для подсчета значений используй следующие готовые формулы, где time - разница между targetDate и текущей датой.


// new CountdownTimer({
//     selector: '#timer-1',
//     targetDate: new Date('Jul 17, 2019'),
// });

const refs = {
    daysTimer: document.querySelector('span[data-value="days"]'),
    hoursTimer: document.querySelector('span[data-value="hours"]'),
    miutesTimer: document.querySelector('span[data-value="mins"]'),
    secondsTimer: document.querySelector('span[data-value="secs"]')
};

class CountdownTimer {
    constructor({ targetDate }) {
        this.targetDate = targetDate;
        this.init();
    }

    init() {
        this.getDeltaTime();  //   Повторяется
        setInterval(() => { this.getDeltaTime() }, 1000);
    }

    getDeltaTime() {
        const currentTime = Date.now();
        const deltaTime = this.targetDate - currentTime;
        this.getTimeComponents(deltaTime);
    }

    getTimeComponents(time) {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = this.pad(
            Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        this.updateClockface(days, hours, mins, secs);   //  Вынести в init() 
        console.log(`${days}:${hours}:${mins}:${secs}`);
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

    updateClockface(days, hours, mins, secs) {
        refs.daysTimer.textContent = days;
        refs.hoursTimer.textContent = hours;
        refs.miutesTimer.textContent = mins;
        refs.secondsTimer.textContent = `${secs}`;
    };

}

const timer = new CountdownTimer({
    // selector: '#timer-1',
    targetDate: new Date('Dec 31, 2020'),
});




/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
//  const days = Math.floor(time / (1000 * 60 * 60 * 24));
//   console.log("days", days);

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// console.log("hours", hours);

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
// console.log("mins", mins);

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */

// const secs = Math.floor((time % (1000 * 60)) / 1000);
// console.log("secs", secs);
