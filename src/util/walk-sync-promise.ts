// @ts-expect-error
import { walkSync } from "fs-walk";

export interface WalkedFile {
  basedir: string;
  filename: string;
}

export const walkSyncPromise = (dir: string): Promise<WalkedFile[]> =>
  new Promise((resolve) => {
    const files: { basedir: string; filename: string }[] = [];

    walkSync(
      dir,
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (basedir, filename, stat) => {
        files.push({ basedir, filename });
      }
    );
    resolve(files);
  });
