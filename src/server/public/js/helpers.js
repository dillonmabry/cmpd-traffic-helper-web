const times = ('times', function (n, block) {
    var accum = '';
    for (var i = 1; i < n; ++i)
        accum += block.fn(i);
    return accum;
});
const plus = ('plus', function(num) {
    return parseInt(num) + 1;
});
const minus = ('minus', function(num) {
    return parseInt(num) - 1;
});
module.exports.times = times;
module.exports.plus = plus;
module.exports.minus = minus;
module.exports.helpers = times(null); 
module.exports.helpers = plus(null); 
module.exports.helpers = minus(null); 