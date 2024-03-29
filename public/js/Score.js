class Score {

    constructor(moduleName) {
        Date.prototype.toComparingString = function () {
            let month = this.getUTCMonth() + 1; //months from 1-12
            let day = this.getUTCDate();
            let year = this.getUTCFullYear();

            return month + '.' + day + '.' + year;
        };

        if (!localStorage.getItem('dayArray')) {
            localStorage.setItem('dayArray',JSON.stringify([new Date().toComparingString()]));
        } else {
            let dayArray = JSON.parse(localStorage.getItem('dayArray'));
            if (dayArray.indexOf(new Date().toComparingString()) < 0) {
                dayArray.push(new Date().toComparingString());
            }
            localStorage.setItem('dayArray',JSON.stringify(dayArray));
        }

        this.moduleName = moduleName;
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.blankHistory = {
            "streak": 0,
            "todayScore": 0,
            "maxStreak": 0,
            "monday": 0,
            "tuesday": 0,
            "wednesday": 0,
            "thursday": 0,
            "friday": 0,
            "saturday": 0,
            "sunday": 0,
            "lastLogin": Date.now()
        };
        let dateObj = new Date();
        this.fakeHistory = {
            "streak": Math.trunc(Math.random() * 10),
            "todayScore": Math.trunc(Math.random() * 10),
            "maxStreak": Math.trunc(Math.random() * 10),
            "monday": Math.trunc(Math.random() * 10),
            "tuesday": Math.trunc(Math.random() * 10),
            "wednesday": Math.trunc(Math.random() * 10),
            "thursday": Math.trunc(Math.random() * 10),
            "friday": Math.trunc(Math.random() * 10),
            "saturday": Math.trunc(Math.random() * 10),
            "sunday": Math.trunc(Math.random() * 10),
            "lastLogin": dateObj.setDate(dateObj.getDate())
        };

        this.updateHistory();
    }

    updateHistory() {
        let today = new Date();
        let history = this.getHistory();
        if (history) {
            let pastDate = new Date(history.lastLogin);
            if (today.toComparingString() !== pastDate.toComparingString()) {
                history.todayScore = 0;
                history.lastLogin = today.setDate(today.getDate());
            }

            this.setHistory(history);
        }
        else {
            this.initScore();
        }

    }

    initScore() {
        if (!localStorage.getItem(this.moduleName)) {
            this.setHistory(this.blankHistory);
        }
    }

    initFakeScore() {
        this.setHistory(this.fakeHistory);
    }

    getHistory() {
        return JSON.parse(localStorage.getItem(this.moduleName))
    }

    setHistory(historyObj) {
        localStorage.setItem(this.moduleName, JSON.stringify(historyObj))
    }

    updateScore(score) {
        let history = this.getHistory();

        history.todayScore += score;

        let currentDate = new Date();
        let pastDate = new Date(history.lastLogin);

        let tomorrow = new Date();
        tomorrow.setDate(pastDate.getDate() + 1);

        // console.log(tomorrow.toComparingString());
        // console.log(currentDate.toComparingString());

        if (tomorrow.toComparingString() === currentDate.toComparingString()) {
            history.streak++;
        }
        else {
            history.streak = 1;
        }
        if (history.streak > history.maxStreak) {
            history.maxStreak = history.streak;
        }

        let dayName = this.days[currentDate.getDay()];

        history[dayName.toLowerCase()] += score;
        this.setHistory(history);
    }
}