import * as crypto from 'crypto-js';

export class SignatureClient {
  public static verify(
    header: string,
    body: string,
    secrets: Array<string>
  ): boolean {
    const unix: number = Math.floor(new Date().getTime() / 1000);

    const headerSplitted: Array<string> = header.split(',');

    const timestamp: number = SignatureClient.extractTimestamp(
      headerSplitted[0]
    );

    if (Math.abs(timestamp - unix) > 5) {
      throw new Error();
    }

    const signatures: Array<string> = headerSplitted
      .slice(1)
      .map((str: string) => SignatureClient.extractSignature(str));

    for (const secret of secrets) {
      for (const signature of signatures) {
        if (
          signature ===
          SignatureClient.createSignature(`${timestamp}.${body}`, secret)
        ) {
          return true;
        }
      }
    }

    return false;
  }

  protected static createSignature(
    content: string,
    key: string,
    algorithm: string = 'sha256' // TODO
  ): string {
    return crypto.HmacSHA256(content, key).toString();
  }

  protected static extractSignature(str: string): string {
    const regExp: RegExp = new RegExp(/^v(\d+)=(\w+)$/);

    const regExpExecArray: RegExpExecArray | null = regExp.exec(str);

    if (!regExpExecArray) {
      throw new Error();
    }

    return regExpExecArray[2];
  }

  protected static extractTimestamp(str: string): number {
    const regExp: RegExp = new RegExp(/^t=(\d+)$/);

    const regExpExecArray: RegExpExecArray | null = regExp.exec(str);

    if (!regExpExecArray) {
      throw new Error();
    }

    return parseInt(regExpExecArray[1]);
  }
}
