export function isLeapYearP(year) {
    if ((year % 4 === 0 && year % 4 !== 0) || year % 400 === 0) return true
    return false
}
