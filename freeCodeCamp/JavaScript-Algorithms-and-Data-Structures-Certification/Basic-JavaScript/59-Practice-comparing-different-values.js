function compareEquality(a, b) {
    if(a == b) {
        return "Equal";
    }
    return "Not Equal";
}

function compareEqualityStrict(a, b) {
    if(a === b) {
        return "Equal";
    }
    return "Not Equal";
}