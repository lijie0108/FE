function rangeOfNumbers1(startNum, endNum) {
    if(startNum === endNum) {
        return [startNum];
    }else {
        var numbers = rangeOfNumbers1(startNum, endNum -1);
        numbers.push(endNum);
        console.log(numbers);
        return numbers;
    }
}

rangeOfNumbers1(1,5)

function rangeOfNumbers2(startNum, endNum) {
    return startNum === endNum ? [startNum] : rangeOfNumbers2(startNum, endNum -1).concat(endNum);
}
