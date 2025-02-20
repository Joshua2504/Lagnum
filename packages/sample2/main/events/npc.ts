import { RpgEvent, EventData, RpgPlayer } from '@rpgjs/server'

@EventData({
    name: 'EV-1'
})
export default class CharaEvent extends RpgEvent {
    onInit() {
        this.setGraphic('female')
        this.setHitbox(16, 16)
    }
    async onAction(player: RpgPlayer) {
        const giveGold = player.getVariable('GIVE_GOLD')
        if (giveGold) {
            await player.showText('You have already received the gold ;)')
            return
        }
        const choice = await player.showChoices('Do you want me to give you 10 gold?', [
            { text: 'Yes', value: true },
            { text: 'No', value: false }
        ])
        if (choice?.value) {
            player.gold += 10
            player.setVariable('GIVE_GOLD', true)
            await player.showText('You have received 10 gold')
        }
    }
}