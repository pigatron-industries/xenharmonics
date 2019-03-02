import {Server} from './Server';
import {$log} from 'ts-log-debug';

if (process.argv.length > 2) {
  $log.level = process.argv[2];
} else {
  $log.level = 'info';
}

new Server()
  .start()
  .then(() => {
    $log.info('Server started...');
  })
  .catch((err) => {
    $log.error(err);
  });
