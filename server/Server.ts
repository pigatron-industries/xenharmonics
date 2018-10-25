import {ServerLoader, ServerSettings} from '@tsed/common';
import '@tsed/servestatic';
import '@tsed/mongoose';
import '@tsed/swagger';
import {$log} from 'ts-log-debug';
import * as path from 'path';
import * as morgan from 'morgan';

const rootDir = path.resolve(__dirname);


@ServerSettings({
  rootDir: rootDir,
  port: 8080,
  mount: {
    '/api': `${rootDir}/web/**/**.js`
  },
  componentsScan: [
    `${rootDir}/service/**/**.js`
  ],
  acceptMimes: ['application/json'],
  serveStatic: {'/': `${rootDir}/../client`},
  mongoose: {
    url: 'mongodb://127.0.0.1:27017/db1'
  },
  swagger: [
    {path: '/api-docs'}
  ]
})
export class Server extends ServerLoader {

  /**
   * This method lets you configure the middleware required by your application.
   * @returns {Server}
   */
  $onMountingMiddlewares(): void|Promise<any> {
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const compress = require('compression');
    const methodOverride = require('method-override');

    this.use(morgan('dev'))
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }

  public $onReady() {
    $log.info('Server initialized');
  }

  public $onServerInitError(err) {
    $log.error(err);
  }

}
