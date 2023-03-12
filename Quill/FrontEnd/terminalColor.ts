// deno-lint-ignore-file
export enum TerminalColor {
    Black = '\u001b[30;1m',
    Red = '\u001b[31;1m',
    Green = '\u001b[32;1m',
    Yellow = '\u001b[33;1m',
    Blue = '\u001b[34;1m',
    Magenta = '\u001b[35;1m',
    Cyan = '\u001b[36;1m',
    White = '\u001b[37;1m',
    Reset = '\u001b[0m',
}

export function colorize(text: any, color: TerminalColor) {
    return color + text + TerminalColor.Reset;
}

export function bold(text: any) {
    return '\u001b[1m' + text + TerminalColor.Reset;
}

export function italic(text: any) {
    return '\u001b[3m' + text + TerminalColor.Reset;
}

export function underline(text: any) {
    return '\u001b[4m' + text + TerminalColor.Reset;
}

export function inverse(text: any) {
    return '\u001b[7m' + text + TerminalColor.Reset;
}
