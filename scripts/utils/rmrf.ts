import {rmdirSync, unlinkSync, readdirSync, existsSync, lstatSync} from "fs"
import {join} from "path"

export function rmrf(path: string): void {
    if (existsSync(path)) {
        readdirSync(path).forEach((file, index) => {
            const curPath = join(path, file);
            if (lstatSync(curPath).isDirectory()) {
                rmrf(curPath);
            } else {
                unlinkSync(curPath);
            }
        });
        rmdirSync(path);
    }
}