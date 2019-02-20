const { TaskCountQueue } = require('../');

const taskqueue = new TaskCountQueue();

taskqueue.setFirstTime(true);
// good
for (let index = 0; index < 10000000; index++) {
     // 只使用一个定时器去执行任务
     taskqueue.pushAndRun(() => {
          console.log(index);
     });
}
// setTimeout(() => {
//      // bad 糟糕的demo
//      for (let index = 0; index < 10000000; index++) {
//           // 使用了 很多个定时器去执行任务，对性能影响较大
//           setTimeout(() => {
//                console.log(index);
//           }, 100)
//      }
// }, 1000);

setTimeout(() => {
     console.log('------------10s')
}, 10000)