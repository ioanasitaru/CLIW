class Score {

    constructor(moduleName) {
        Date.prototype.toComparingString = function () {
            let month = this.getUTCMonth() + 1; //months from 1-12
            let day = this.getUTCDate();
            let year = this.getUTCFullYear();

            return month + '.' + day + '.' + year;
        };

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
        else if (currentDate.toComparingString() !== pastDate.toComparingString()) {
            history.streak = 0;
        }

        if (history.streak > history.maxStreak) {
            history.maxStreak = history.streak;
        }

        let dayName = this.days[currentDate.getDay()];

        history[dayName.toLowerCase()] += score;
        this.setHistory(history);
    }
}