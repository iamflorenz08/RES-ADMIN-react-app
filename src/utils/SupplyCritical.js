export const isCritical = (current_supply, buffer) => {
    const percentage = ((current_supply - buffer) / buffer) * 100
    if (percentage <= 20) {
        return true
    }
    return false
}
