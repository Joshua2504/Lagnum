import { Item } from '@rpgjs/database'

@Item({
    id: 'hppotion500',
    name: 'HP Potion (500)',
    description: 'Gives 500 HP',
    price: 500,
    hpValue: 500,
    hitRate: 1,
    consumable: true,
    addStates: [],
    removeStates: [],
    elements: [],
    paramsModifier: {}
})

export default class Potion {}