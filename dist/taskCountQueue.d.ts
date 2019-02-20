/**
 *  一次执行指定数量的任务
 *  适合计算大量相似任务
 */
export declare class TaskCountQueue {
    private readonly taskList;
    private isRunning;
    private doCount;
    private timeSpan;
    private timeHandle?;
    private pause;
    private onceTimeSpan;
    private firstTime;
    push(task: Function): void;
    pushAndRun(task: Function): void;
    /**
     * 当前未运行的任务数量
     */
    getCount(): number;
    /**
     *
     * @param count 定时器循环一次 执行的任务数量
     */
    setDoCount(count: number): void;
    /**
     * 设置是否时间优先。true: 定时器一次执行的任务数量不固定，为在{onceTimeSpan}时间内可完成的任务，false:则定时器一次执行的任务数量固定，或者超过了{onceTimeSpan}时间
     * @param value
     */
    setFirstTime(value: boolean): void;
    /**
     * if timeSpan <=0 则不启用定时器，直接执行
     * @param timeSpan 定时器的时间间隔
     */
    setTimeSpan(timeSpan: number): void;
    /**
     * 执行一次指定数量的任务的最大用时，如果超过OnceTimeSpan,则 停止本次任务，下次继续执行
     * @param timeSpan
     */
    setOnceTimeSpan(timeSpan: number): void;
    stop(): void;
    run(): void;
    private running;
}
