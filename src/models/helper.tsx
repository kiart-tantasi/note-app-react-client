export function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
      throw new Error(message);
    }
    return argument;
} // from https://stackoverflow.com/questions/54738221/typescript-array-find-possibly-undefind