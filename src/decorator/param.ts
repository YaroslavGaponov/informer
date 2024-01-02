/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

export function param<T>(name: string, value: T) {
    return (target: any, propertyKey: string): void => {
        if (name in process.env) {
            switch (typeof value) {
                case "boolean":
                    target[propertyKey] = process.env[name] === "true";
                    break;
                case "number":
                    target[propertyKey] = parseInt(process.env[name] || "", 10);
                    break;
                case "string":
                default:
                    target[propertyKey] = process.env[name];
                    break;
            }
        } else {
            target[propertyKey] = value;
        }
    };
}
