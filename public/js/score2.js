class Score {

    constructor(moduleName) {
        this.moduleName = moduleName;
        this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        this.blankHistory = {
            "streak": 0,
            "total": 0,
            "positive": 0,
            "maxStreak": 0,
            "monday": 0,
            "tuesday": 0,
            "wednesday": 0,
            "thursday": 0,
            "friday": 0,
            "saturday": 0,
            "sunday": 0
        };
    }

    initScore() {
        if (!localStorage.getItem(this.moduleName)) {
            this.setHistory(this.blankHistory);
        }
    }

    getHistory() {
        return JSON.parse(localStorage.getItem(this.moduleName))
    }

    setHistory(historyObj) {
        localStorage.setItem(this.moduleName, JSON.stringify(historyObj))
    }

    upScore() {
        let history = this.getHistory();

        history.total++;

        history.streak++;
        if (history.streak > history.maxStreak) {
            history.maxStreak = history.streak;
        }

        let day = new Date();
        let dayName = this.days[day.getDay()];

        history[dayName.toLowerCase()]++;

        this.setHistory(history);
    }

    downScore() {
        let history = this.getHistory();

        history.streak = 0;
        history.total++;

        this.setHistory(history);
    }
}