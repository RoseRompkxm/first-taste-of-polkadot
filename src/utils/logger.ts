export const info = async (...args: any[]) => {
    console.info('[INFO]', new Date(), ...args);
}

export const warn = async (...args: any[]) => {
    console.warn('[WARNING]', new Date(), ...args);
}

export const error = async (...args: any[]) => {
    console.error('[ERROR]', new Date(), ...args);
}