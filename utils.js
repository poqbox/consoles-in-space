function randomBetweenRange(x1, x2, precision=0) {
    let prec = 10**precision
    return Math.round(Math.random()*(x2*prec - x1*prec))/prec + x1
}


export {randomBetweenRange}