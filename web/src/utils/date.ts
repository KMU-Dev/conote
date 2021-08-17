export function getTimeDiff(date1: Date, date2 = new Date()) {
    return Math.abs(date1.getTime() - date2.getTime());
}

export function readableDateDiff(timeDiff: number, unit: DateUnit) {
    timeDiff /= 1000;
    if (unit === 'Second') return Math.floor(timeDiff % 60);

    timeDiff /= 60;
    timeDiff = Math.floor(timeDiff);
    if (unit === "Minute") return Math.floor(timeDiff % 60);

    timeDiff /= 60;
    timeDiff = Math.floor(timeDiff);
    if (unit === 'Hour') return Math.floor(timeDiff % 24);

    timeDiff /= 24;
    timeDiff = Math.floor(timeDiff);
    return timeDiff;
}

export function getLocalizedDateUnit(unit: DateUnit) {
    switch (unit) {
        case 'Day': return '天';
        case 'Hour': return '小時';
        case 'Minute': return '分';
        case 'Second': return '秒';
        default: return '';
    }
}

export type DateUnit = 'Day' | 'Hour' | 'Minute' | 'Second';