import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class AppLogger extends ConsoleLogger {
  constructor() {
    super({
      timestamp: true,
    });
  }

  log(message: any, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      super.log(message, context);
    }
  }

  warn(message: any, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      super.warn(message, context);
    }
  }

  debug(message: any, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      super.debug(message, context);
    }
  }

  verbose(message: any, context?: string) {
    if (process.env.NODE_ENV === 'development') {
      super.verbose(message, context);
    }
  }

  error(message: any, trace?: string, context?: string) {
    // ALWAYS log errors
    super.error(message, trace, context);
  }
}
