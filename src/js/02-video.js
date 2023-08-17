import Player from '@vimeo/player';
import storage from './storage';
import lodash from 'lodash.throttle';

const CURRENT_TIME = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on(
  'timeupdate',
  lodash(e => {
    storage.save(CURRENT_TIME, e.seconds);
  }, 1000)
);
player.setCurrentTime(storage.load(CURRENT_TIME));
