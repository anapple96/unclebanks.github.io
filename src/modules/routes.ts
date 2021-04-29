import { PokemonNameType } from './db';

interface UnlockData {
    badges: Record<string, boolean>,
}

interface NPC {
    name: string,
    poke?: Array<[PokemonNameType, number]>,
    reward?: string,
    event?: string,
}

interface Town {
    name: string,
    town: true,
    npc?: NPC,
    _unlock?: UnlockData,
}

interface Route {
    name: string,
    pokes: PokemonNameType[],
    minLevel: number,
    maxLevel: number,
    // this should be a town name, but we don't know them all until later
    // may want to define all town names before this for stronger typing
    respawn: string,
    type: string,
    _unlock?: UnlockData,

    // Need to do something about these, can probably be made into
    // an unlock condition and become part of UnlockData.
}

interface RegionData {
    _global?: {
        pokes: PokemonNameType[],
        rarePokes?: PokemonNameType[],
        superRare?: PokemonNameType[],
    },

    _unlock?: UnlockData,
}

type RegionLocations = Record<string, Town | Route>

// This isn't perfect. We would like for typescript to know
// that `ROUTES.Kanto._global` can only be the type listed in RegionData,
// but it is unable to figure that out with the current definition.
type Routes = Record<string, RegionLocations | RegionData>

const ROUTES: Routes = {
    Kanto: {
        _global: {
            pokes: [],
            rarePokes: [],
            superRare: [],
        },
        kantoBase: {
            name: 'Kanto Base',
            town: true,
            npc: {
                name: 'Prof. Oak',
                event: 'profOak1',
            },
        },
        kantoFire1: {
            name: 'Kanto Fire 1',
            pokes: ['Charmander', 'Vulpix', 'Growlithe', 'Ponyta'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'fire',
        },
        kantoFire2: {
            name: 'Kanto Fire 2',
            pokes: ['Charmeleon', 'Charizard', 'Ninetales', 'Arcanine', 'Rapidash', 'Magmar', 'Flareon'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'fire',
            _unlock: {
                badges: {
                    'Kanto Fire Pass': true,
                },
            },
        },
        kantoWater1: {
            name: 'Kanto Water 1',
            pokes: ['Squirtle', 'Psyduck', 'Poliwag', 'Tentacool', 'Slowpoke', 'Seel', 'Krabby', 'Horsea', 'Goldeen', 'Staryu', 'Magikarp', 'Shellder'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'water',
        },
        kantoWater2: {
            name: 'Kanto Water 2',
            pokes: ['Wartortle', 'Blastoise', 'Poliwhirl', 'Poliwrath', 'Tentacruel', 'Slowbro', 'Dewgong', 'Kingler', 'Seadra', 'Starmie', 'Gyarados', 'Cloyster', 'Lapras', 'Vaporeon'],
            minLevel: 2,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'water',
            _unlock: {
                badges: {
                    'Kanto Water Pass': true,
                },
            },
        },
        kantoGrass1: {
            name: 'Kanto Grass 1',
            pokes: ['Bulbasaur', 'Oddish', 'Bellsprout', 'Exeggcute'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'grass',
        },
        kantoGrass2: {
            name: 'Kanto Grass 2',
            pokes: ['Ivysaur', 'Venusaur', 'Gloom', 'Vileplume', 'Weepinbell', 'Victreebel', 'Exeggutor', 'Tangela'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'grass',
            _unlock: {
                badges: {
                    'Kanto Grass Pass': true,
                },
            },
        },
        kantoElectric1: {
            name: 'Kanto Electric 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'electric',
        },
        kantoElectric2: {
            name: 'Kanto Electric 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'electric',
            _unlock: {
                badges: {
                    'Kanto Electric Pass': true,
                },
            },
        },
        kantoPsychic1: {
            name: 'Kanto Psychic 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'psychic',
        },
        kantoPsychic2: {
            name: 'Kanto Psychic 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'psychic',
            _unlock: {
                badges: {
                    'Kanto Psychic Pass': true,
                },
            },
        },
        kantoIce1: {
            name: 'Kanto Ice 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'ice',
        },
        kantoIce2: {
            name: 'Kanto Ice 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'ice',
            _unlock: {
                badges: {
                    'Kanto Ice Pass': true,
                },
            },
        },
        kantoDragon1: {
            name: 'Kanto Dragon 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'dragon',
        },
        kantoDragon2: {
            name: 'Kanto Dragon 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'dragon',
            _unlock: {
                badges: {
                    'Kanto Dragon Pass': true,
                },
            },
        },
        kantoDark1: {
            name: 'Kanto Dark 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'dark',
        },
        kantoDark2: {
            name: 'Kanto Dark 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'dark',
            _unlock: {
                badges: {
                    'Kanto Dark Pass': true,
                },
            },
        },
        kantoFairy1: {
            name: 'Kanto Fairy 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'fairy',
        },
        kantoFairy2: {
            name: 'Kanto Fairy 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'fairy',
            _unlock: {
                badges: {
                    'Kanto Fairy Pass': true,
                },
            },
        },
        kantoNormal1: {
            name: 'Kanto Normal 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'normal',
        },
        kantoNormal2: {
            name: 'Kanto Normal 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'normal',
            _unlock: {
                badges: {
                    'Kanto Normal Pass': true,
                },
            },
        },
        kantoFighting1: {
            name: 'Kanto Fighting 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'fighting',
        },
        kantoFighting2: {
            name: 'Kanto Fighting 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'fighting',
            _unlock: {
                badges: {
                    'Kanto Fighting Pass': true,
                },
            },
        },
        kantoFlying1: {
            name: 'Kanto Flying 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'flying',
        },
        kantoFlying2: {
            name: 'Kanto Flying 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'flying',
            _unlock: {
                badges: {
                    'Kanto Flying Pass': true,
                },
            },
        },
        kantoPoison1: {
            name: 'Kanto Poison 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'poison',
        },
        kantoPoison2: {
            name: 'Kanto Poison 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'poison',
            _unlock: {
                badges: {
                    'Kanto Poison Pass': true,
                },
            },
        },
        kantoGround1: {
            name: 'Kanto Ground 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'ground',
        },
        kantoGround2: {
            name: 'Kanto Ground 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'ground',
            _unlock: {
                badges: {
                    'Kanto Ground Pass': true,
                },
            },
        },
        kantoRock1: {
            name: 'Kanto Rock 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'rock',
        },
        kantoRock2: {
            name: 'Kanto Rock 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'rock',
            _unlock: {
                badges: {
                    'Kanto Rock Pass': true,
                },
            },
        },
        kantoBug1: {
            name: 'Kanto Bug 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'bug',
        },
        kantoBug2: {
            name: 'Kanto Bug 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'bug',
            _unlock: {
                badges: {
                    'Kanto Bug Pass': true,
                },
            },
        },
        kantoGhost1: {
            name: 'Kanto Ghost 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'ghost',
        },
        kantoGhost2: {
            name: 'Kanto Ghost 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'ghost',
            _unlock: {
                badges: {
                    'Kanto Ghost Pass': true,
                },
            },
        },
        kantoSteel1: {
            name: 'Kanto Steel 1',
            pokes: ['Pidgey', 'Rattata'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'kantoBase',
            type: 'steel',
        },
        kantoSteel2: {
            name: 'Kanto Steel 2',
            pokes: ['Pidgey', 'Rattata', 'Spearow', 'Jigglypuff', 'Sandshrew', 'Mankey'],
            minLevel: 5,
            maxLevel: 12,
            respawn: 'kantoBase',
            type: 'steel',
            _unlock: {
                badges: {
                    'Kanto Steel Pass': true,
                },
            },
        },
    },
    Johto: {
        _unlock: {
            badges: {
                'Earth Pass': true,
            },
        },
        _global: {
            pokes: [],
            rarePokes: [],
            superRare: [
                'Raikou',
                'Entei',
            ],
        },
    },
};

export default ROUTES;
