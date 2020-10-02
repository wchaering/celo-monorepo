export declare enum LogLevel {
    VERBOSE = 1,
    DEBUG = 2,
    INFO = 3,
    WARN = 4,
    ERROR = 5
}
declare class LoggerClass {
    private level;
    /**
     * @param tag Marks the source of the log. Usually `filename@functionName`
     * @param message the actual message
     */
    error(tag: string, message: string): void;
    /**
     * @param tag Marks the source of the log. Usually `filename@functionName`
     * @param message the actual message
     */
    warn(tag: string, message: string): void;
    /**
     * @param tag Marks the source of the log. Usually `filename@functionName`
     * @param message the actual message
     */
    info(tag: string, message: string): void;
    /**
     * @param tag Marks the source of the log. Usually `filename@functionName`
     * @param message the actual message
     */
    debug(tag: string, message: string): void;
    /**
     * @param tag Marks the source of the log. Usually `filename@functionName`
     * @param message the actual message
     */
    verbose(tag: string, message: string): void;
    setLogLevel(level: LogLevel): void;
    getLogLevel(): LogLevel;
    canLog(level: LogLevel): boolean;
}
export declare const Logger: LoggerClass;
export {};
