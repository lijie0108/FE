const newLocal = "Hello, node";
console.log(newLocal);

const os = require('os');
const mem = os.freemem() / os.totalmem() * 100;
console.log('内存占用率', mem);

const cpuStat = require('cpu-stat');
cpuStat.usagePercent((err, percent) => {
    console.log('cpu占用', percent)
})

setInterval()