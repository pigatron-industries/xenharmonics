import {Server} from './Server';
import {$log} from 'ts-log-debug';

new Server()
  .start()
  .then(() => {
    $log.info('Server started...');
  })
  .catch((err) => {
    $log.error(err);
  });
