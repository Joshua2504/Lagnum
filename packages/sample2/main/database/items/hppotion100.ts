import { Item } from '@rpgjs/database'

@Item({
    id: 'hppotion100',
    name: 'HP Potion (100)',
    description: 'Gives 100 HP',
    price: 100,
    hpValue: 100,
    hitRate: 1,
    consumable: true,
    addStates: [],
    removeStates: [],
    elements: [],
    paramsModifier: {}
})

export default class Potion {}