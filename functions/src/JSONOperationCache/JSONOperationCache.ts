import { writeFile, readFile, stat, mkdir } from 'fs/promises';

import { dirname } from 'path';

interface JSONOperationCacheOptions {
  cacheKey: string;
  duration: number;
  cacheDir?: string;
}

export class JSONOperationCache {
  constructor(private readonly options: JSONOperationCacheOptions) {
    this.options = options;
  }

  async performOperation<T>(operation: () => Promise<T>): Promise<T> {
    const { cacheKey, duration, cacheDir = './.cache' } = this.options;

    const cachePath = `${cacheDir}/${cacheKey}.json`;
    const cacheExists = await this.cacheExists(cachePath);

    if (cacheExists) {
      const [ok, cache] = await this.readCache(cachePath, duration);
      if (ok) {
        return cache as T;
      }
    }

    const operationResult = await operation();
    await this.writeCache(cachePath, operationResult);

    return operationResult;
  }

  private async cacheExists(cachePath: string): Promise<boolean> {
    try {
      await stat(cachePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async readCache(
    cachePath: string,
    duration: number,
  ): Promise<['ok' | false, { [key: string]: unknown }]> {
    const cache = await readFile(cachePath, 'utf-8');
    try {
      const cacheData = JSON.parse(cache);
      const cacheDate = new Date(cacheData.date);
      const now = new Date();
      const cacheDuration = new Date(cacheDate.getTime() + duration);
      if (cacheDuration < now) {
        return [false, {}];
      }
      return ['ok', JSON.parse(cache).data];
    } catch (error) {
      return [false, {}];
    }
  }

  private async writeCache(cachePath: string, data: unknown): Promise<['ok' | false]> {
    const cache = JSON.stringify({
      date: new Date().toISOString(),
      data,
    });
    const cacheDir = dirname(cachePath);
    try {
      await mkdir(cacheDir, { recursive: true });
      await writeFile(cachePath, cache);
      return ['ok'];
    } catch (error) {
      console.error(error);
      return [false];
    }
  }
}
