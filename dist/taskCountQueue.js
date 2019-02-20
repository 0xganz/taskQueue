"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *  一次执行指定数量的任务
 *  适合计算大量相似任务
 */
class TaskCountQueue {
    constructor() {
        this.taskList = new Array();
        this.isRunning = false;
        this.doCount = 300; // 每次处理的数量
        this.timeSpan = 3000 * 1;
        this.pause = false;
        this.onceTimeSpan = 1000 * 1;
        this.firstTime = false;
    }
    push(task) {
        this.taskList.push(task);
    }
    pushAndRun(task) {
        this.taskList.push(task);
        this.run();
    }
    /**
     * 当前未运行的任务数量
     */
    getCount() {
        return this.taskList.length;
    }
    /**
     *
     * @param count 定时器循环一次 执行的任务数量
     */
    setDoCount(count) {
        if (count <= 0)
            return;
        this.doCount = count;
    }
    /**
     * 设置是否时间优先。true: 定时器一次执行的任务数量不固定，为在{onceTimeSpan}时间内可完成的任务，false:则定时器一次执行的任务数量固定，或者超过了{onceTimeSpan}时间
     * @param value
     */
    setFirstTime(value) {
        this.firstTime = value;
    }
    /**
     * if timeSpan <=0 则不启用定时器，直接执行
     * @param timeSpan 定时器的时间间隔
     */
    setTimeSpan(timeSpan) {
        this.timeSpan = timeSpan;
    }
    /**
     * 执行一次指定数量的任务的最大用时，如果超过OnceTimeSpan,则 停止本次任务，下次继续执行
     * @param timeSpan
     */
    setOnceTimeSpan(timeSpan) {
        this.onceTimeSpan = timeSpan;
    }
    stop() {
        if (this.timeHandle) {
            clearInterval(this.timeHandle);
            this.timeHandle = undefined;
        }
        this.pause = true;
    }
    run() {
        if (this.isRunning)
            return;
        if (this.pause)
            this.pause = false;
        this.isRunning = true;
        if (this.timeSpan <= 0) {
            this.running();
        }
        else {
            this.timeHandle = setInterval(() => {
                this.running();
            }, this.timeSpan);
        }
    }
    running() {
        const startTime = Date.now();
        if (!this.firstTime) {
            let count = (this.doCount < this.taskList.length ? this.doCount : this.taskList.length);
            while (count > 0) {
                try {
                    const fn = this.taskList.shift();
                    if (fn) {
                        fn();
                    }
                }
                catch (ex) {
                }
                if (this.onceTimeSpan > 0 && (Date.now() - startTime) > this.onceTimeSpan) {
                    break;
                }
                count--;
            }
        }
        else {
            while (this.taskList.length > 0) {
                try {
                    const fn = this.taskList.shift();
                    if (fn) {
                        fn();
                    }
                }
                catch (ex) {
                }
                if (this.onceTimeSpan > 0 && (Date.now() - startTime) > this.onceTimeSpan) {
                    break;
                }
            }
        }
        if (this.pause) {
            this.stop();
            this.isRunning = false;
        }
        if (this.taskList.length === 0) {
            this.stop();
            this.isRunning = false;
        }
    }
}
exports.TaskCountQueue = TaskCountQueue;
//# sourceMappingURL=taskCountQueue.js.map