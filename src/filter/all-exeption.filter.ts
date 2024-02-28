import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as fs from 'fs';

@Catch()
export class AllExeptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    this.writeErrorLogToFile(exception);

    super.catch(exception, host);
  }

  private writeErrorLogToFile = (exception: any): void => {
    fs.appendFile(
      'error.log',
      `\n \n ${JSON.stringify(exception)}`,
      'utf-8',
      (err) => {
        if (err) throw err;
      },
    );
  };
}
