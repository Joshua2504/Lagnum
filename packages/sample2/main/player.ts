import { RpgMap } from '@rpgjs/server';
import { Speed } from '@rpgjs/server';
import { RpgPlayer, RpgPlayerHooks, Control, Components, RpgEvent, EventData } from '@rpgjs/server'

const playerIntervals: { [key: string]: NodeJS.Timeout } = {};

const player: RpgPlayerHooks = {
    onConnected(player: RpgPlayer) {
        player.name = 'YourName'
        player.setGraphic('male')
        player.setComponentsBottom(Components.text('{position.x},{position.y}'))
        player.setComponentsTop<any>([
            Components.text('{name}', {
                fill: '#FFFFFF',
                fontSize: 20
            }),
            Components.hpBar({
                width: 100,
            }),
            Components.spBar({
                width: 100,
            })
        ], {
            height: 35,
            width: 80,
            marginBottom: -10,
        })
        player.hp = 9000
        player.speed = Speed.Normal

        // save the player every 5 seconds
        const intervalId = setInterval(() => {
            var logTime = new Date().toLocaleTimeString();
            console.log(logTime + ' Saving player ' + player.name)
            player.save()
        }, 5000);

        playerIntervals[player.id] = intervalId;
    },
    onInput(player: RpgPlayer, { input }) {
        const map = player.getCurrentMap()
        if (input == 'action') {
            const gui = player.gui('test')
            gui.open({ gold: 10 })
            // const event = map?.createDynamicEvent({
            //     x: player.position.x + 5,
            //     y: player.position.y + 5,
            //     event: CharaEvent,
            // });
        }
        if (input == 'back') {
           player.callMainMenu()
        }
    },
    onDisconnected(player: RpgPlayer) {
        console.log('Player disconnected')
        const intervalId = playerIntervals[player.id];
        if (intervalId) {
            clearInterval(intervalId);
            delete playerIntervals[player.id];
        }
    },
    async onJoinMap(player: RpgPlayer) {
        player.gui('test').open();

        setTimeout(() => {
            player.addItem('hppotion100', 5)
            player.addItem('hppotion500', 5)
        }, 2000);
    }
}

export default player