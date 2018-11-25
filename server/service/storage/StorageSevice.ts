import {OnInit, Service} from '@tsed/common';
import {$log} from 'ts-log-debug';
import * as redis from 'redis';
import {promisify} from 'util';

@Service()
export class StorageService implements OnInit {

  private client: redis.RedisClient;

  async $onInit() {
    $log.info('Creating redis client');
    this.client = redis.createClient();
  }

  async save(name: string, data: any) {
    const set = promisify(this.client.set).bind(this.client);
    await set(name, JSON.stringify(data));
  }

  async load(name: string): Promise<any> {
    const get = promisify(this.client.get).bind(this.client);
    const data = await get(name);
    return JSON.parse(data);
  }

  async createId(): Promise<number> {
    const incr = promisify(this.client.incr).bind(this.client);
    return await incr('xen_seq');
  }

}
