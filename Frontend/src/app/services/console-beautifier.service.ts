export class ConsoleBeautifierService {

    static debug(message: string, ...args: any[]): any[] {
        return this.customLog('debug', message, ...args);
    }
    static log(message: string, ...args: any[]): any[] {
        return this.customLog('log', message, ...args);
    }
    static info(message: string, ...args: any[]): any[] {
        return this.customLog('info', message, ...args);
    }
    static warn(message: string, ...args: any[]): any[] {
        return this.customLog('warn', message, ...args);
    }
    static error(message: string, ...args: any[]): any[] {
        return this.customLog('error', message, ...args);
    }
    // Custom log function 
    //  - level: 'debug' | 'log' | 'info' | 'warn' | 'error'
    //  - message: string
    //  - args: any[]
    //  - returns: any[]
    //  - Example: customLog('info', 'This is an info message', {data: 'some data'}, 123, 'another data')
    //
    private static customLog(level: 'debug' | 'log' | 'info' | 'warn' | 'error', message: string, ...args: any[]): any[] {

        let badge, fgColor, bgColor;

        switch (level) {
            case 'debug':
                badge = 'DEBUG';
                fgColor = 'white';
                bgColor = 'purple';
                break;
            case 'log':
                badge = 'LOG';
                fgColor = 'white';
                bgColor = 'blue';
                break;
            case 'info':
                badge = 'INFO';
                fgColor = 'white';
                bgColor = 'green';
                break;
            case 'warn':
                badge = 'WARNING';
                fgColor = 'black';
                bgColor = 'yellow';
                break;
            case 'error':
                badge = 'ERROR';
                fgColor = 'white';
                bgColor = 'red';
                break;
        }
        
        var styleBadge = `color: ${fgColor}; background-color: ${bgColor}; font-weight: bold; border-radius: 3px; padding: 1px 4px;`;
        var styleMessage = "margin-left: 5px;"; 

        return [`%c${badge}%c${message}`, styleBadge, styleMessage, ...args];
    };   
}

