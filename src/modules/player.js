import { POKEDEXFLAGS, BALLRNG } from './data';
import POKEDEX from './db';
import mkPoke from './poke';
import ROUTES from './routes';
import { mergeArray, pokeByName } from './utilities';

export default (lastSave, appModel) => {
    let dom;
    let Poke;

    const Player = {
        pokedexHighestID: 0,
        activePokeID: 0,
        lastHeal: Date.now(),
        selectedBall: 'pokeball',
        ballsAmount: {
            pokeball: 20,
            greatball: 0,
            ultraball: 0,
            masterball: 0,
        },
        unlocked: {
            shinyDex: 0,
            razzBerry: 0,
            timeMachine: 0,
            kantoOldRod: 0,
            kantoGoodRod: 0,
            kantoSuperRod: 0,
            johtoOldRod: 0,
            johtoGoodRod: 0,
            johtoSuperRod: 0,
            hoennOldRod: 0,
            hoennGoodRod: 0,
            hoennSuperRod: 0,
            sinnoholdRod: 0,
            sinnohGoodRod: 0,
            sinnohSuperRod: 0,
            unovaOldRod: 0,
            unovaGoodRod: 0,
            unovaSuperRod: 0,
            kalosOldRod: 0,
            kalosGoodRod: 0,
            kalosSuperRod: 0,
            alolaOldRod: 0,
            alolaGoodRod: 0,
            alolaSuperRod: 0,
            galarOldRod: 0,
            galarGoodRod: 0,
            galarSuperRod: 0,
            saveKill: 0,
        },
        evoStones: {
            thunderStone: 0,
            fireStone: 0,
            waterStone: 0,
            leafStone: 0,
            moonStone: 0,
            sunStone: 0,
            metalCoat: 0,
            sootheBell: 0,
            dragonScale: 0,
            upGrade: 0,
            shinyStone: 0,
            duskStone: 0,
            dawnStone: 0,
            iceStone: 0,
        },
        currencyAmount: {
            pokecoins: 0,
            catchcoins: 0,
            battlecoins: 0,
        },
        battleItems: {
            xAttack: 0,
            xDefense: 0,
            xSpeed: 0,
            xSpAttack: 0,
            xSpDefense: 0,
            expBoost: 0,
            currencyBoost: 0,
            revive: 0,
            maxRevive: 0,
        },
        vitamins: {
            hpUp: 0,
            protein: 0,
            iron: 0,
            calcium: 0,
            zinc: 0,
            carbos: 0,
        },
        settings: {
            currentRegionId: 'Kanto',
            currentRouteId: 'kroute1',
            listView: 'pokeDex',
            autoSort: true,
            dexView: 'all',
            dexVersion: 194, // check if users dex is out of date
            spriteChoice: 'back',
            catching: false,
        },
        skills: {
            breeding: 0,
            throwing: 0,
            training: 0,
        },
        statistics: {
            fireBeaten: 0,
            waterBeaten: 0,
            grassBeaten: 0,
            electricBeaten: 0,
            normalBeaten: 0,
            iceBeaten: 0,
            fightingBeaten: 0,
            poisonBeaten: 0,
            groundBeaten: 0,
            flyingBeaten: 0,
            psychicBeaten: 0,
            bugBeaten: 0,
            rockBeaten: 0,
            ghostBeaten: 0,
            darkBeaten: 0,
            dragonBeaten: 0,
            steelBeaten: 0,
            fairyBeaten: 0,
            fireCaught: 0,
            waterCaught: 0,
            grassCaught: 0,
            electricCaught: 0,
            normalCaught: 0,
            iceCaught: 0,
            fightingCaught: 0,
            poisonCaught: 0,
            groundCaught: 0,
            flyingCaught: 0,
            psychicCaught: 0,
            bugCaught: 0,
            rockCaught: 0,
            ghostCaught: 0,
            darkCaught: 0,
            dragonCaught: 0,
            steelCaught: 0,
            fairyCaught: 0,
            seen: 0,
            caught: 0,
            beaten: 0,
            shinySeen: 0,
            shinyCaught: 0,
            shinyBeaten: 0,
            totalDamage: 0,
            totalThrows: 0,
            successfulThrows: 0,
            pokeballThrows: 0,
            pokeballSuccessfulThrows: 0,
            greatballThrows: 0,
            greatballSuccessfulThrows: 0,
            ultraballThrows: 0,
            ultraballSuccessfulThrows: 0,
            masterballThrows: 0,
            masterballSuccessfulThrows: 0,
            totalPokeCoins: 0,
            totalCatchCoins: 0,
            totalBattleCoins: 0,
            totalExp: 0,
        },
        badges: {},
        wins: {},
        purgeData: false,

        checksum: function (s) {
            let chk = 0x12345678;
            const len = s.length;
            for (let i = 0; i < len; i++) {
                chk += (s.charCodeAt(i) * (i + 1));
            }
            // eslint-disable-next-line no-bitwise
            return (chk & 0xffffffff).toString(16);
        },
        addPoke: function (poke) {
            const existing = this.getPokemonByName(poke.pokeName());
            if (existing) {
                // if we already have something like this, just update shiny
                existing.isShiny = existing.shiny() || poke.shiny();
                return;
            }

            appModel.$store.commit('pokemon/add', poke);
        },
        findDexIndex: (p) => POKEDEX.findIndex((x) => x.pokemon[0].Pokemon == p.name),
        addPokedex: function (pokeName, flag) {
            appModel.$store.commit('pokedex/addData', { pokeName, flag });
        },
        hasDexEntry: function (pokeName, flag, exact = false) {
            function findFlag(obj) { return (this == obj.name); }
            const dexEntry = this.getPokedexData().find(findFlag, pokeName);
            if (typeof dexEntry !== 'undefined') {
                if ((exact && dexEntry.flag == flag)
                || (!exact && dexEntry.flag >= flag)) {
                    return true;
                }
            }
            return false;
        },
        getHighestPokeDex: function () {
            const dex = (lhs, rhs) => this.findDexIndex(rhs) - this.findDexIndex(lhs);
            this.pokedexHighestID = Player.getPokedexData().sort(dex)[0];
            return this.pokedexHighestID;
        },
        countPokedex: function (flag, exactMatch = false) {
            let counter = 0;
            let i; let
                pData;
            for (i in this.getPokedexData()) {
                pData = this.getPokedexData()[i];
                if (exactMatch && flag == pData.flag) {
                    counter++;
                } else if (!exactMatch && flag <= pData.flag) {
                    counter++;
                }
            }
            return counter;
        },
        setActive: function (index) {
            appModel.$store.state.pokemon.activePokeID = index;
        },
        alivePokeIndexes: function () {
            const alive = this.getPokemon().filter((poke) => poke.alive());
            return alive;
        },
        activePoke: function () { return appModel.$store.getters['pokemon/active']; },
        getPokemon: function () { return appModel.$store.state.pokemon.party; },
        getPokedexData: function () { return appModel.$store.state.pokedex.data; },
        // reorderPokes: function (newList, list = 'roster') {
        //     if (list === 'roster') {
        //         this.pokemons = newList;
        //     } else {
        //         this.storage = newList;
        //     }
        // },
        healAllPokemons: function () {
            const timeToHeal = appModel.$store.getters['pokemon/timeToHeal'];

            if (timeToHeal <= 0) {
                appModel.$store.commit('pokemon/healAll');
                return 'healed';
            }

            return timeToHeal;
        },
        hasPokemonLike(pokemon) {
            return this.hasPokemon(pokemon.pokeName(), pokemon.shiny());
        },
        // Return true if we have this pokemon in the same shininess or better
        hasPokemon: function (pokemonName, shiny) {
            // match if the name matches and we don't care about shiny, or the pokemon is shiny
            const match = (p) => p.pokeName() === pokemonName && (!shiny || p.isShiny);
            // findIndex will return > -1 if there is a match
            return appModel.$store.getters['pokemon/all'].findIndex(match) > -1;
        },
        getPokemonByName: function (pokemonName) {
            return appModel.$store.getters['pokemon/all'].find((p) => p.pokeName() === pokemonName);
        },
        deletePoke: function (index, from = 'roster') {
            appModel.$store.commit('pokemon/remove', { index, from });
        },
        ballRNG: function (ballName) {
            return BALLRNG[ballName];
        },
        changeSelectedBall: function (newBall) {
            this.selectedBall = newBall;
        },
        consumeBall: function (ballName) {
            if (this.ballsAmount[ballName] > 0) {
                this.ballsAmount[ballName] -= 1;
                return true;
            }
            return false;
        },
        bestAvailableBall: function () {
            const ballsFromBestToWorst = ['masterball', 'ultraball', 'greatball', 'pokeball'];
            for (let i = 0; i < ballsFromBestToWorst.length; i++) {
                if (this.ballsAmount[ballsFromBestToWorst[i]] > 0) {
                    return ballsFromBestToWorst[i];
                }
            }

            return null;
        },
        addBalls: function (ballName, amount) {
            this.ballsAmount[ballName] += amount;
        },
        addPokeCoins: function (amount) {
            this.currencyAmount.pokecoins += amount;
            this.statistics.totalPokeCoins += amount;
            dom.renderPokeCoins();
        },
        addCatchCoins: function (amount) {
            this.currencyAmount.catchcoins += amount;
            this.statistics.totalCatchCoins += amount;
            dom.renderCatchCoins();
        },
        addBattleCoins: function (amount) {
            this.currencyAmount.battlecoins += amount;
            this.statistics.totalBattleCoins += amount;
            dom.renderBattleCoins();
        },
        meetsCriteria: function (criteriaObj) {
            for (const group in criteriaObj) {
                if (typeof criteriaObj[group] === 'object') {
                    for (const criteria in criteriaObj[group]) {
                    // if pokedex criteria
                        if (group == 'dex') {
                            if (criteria == 'caughtCount'
                            && this.countPokedex(POKEDEXFLAGS.releasedNormal) < criteriaObj[group][criteria]) {
                                return false;
                            }
                        } else if (typeof Player[group][criteria] === 'undefined') return false;
                        else if (typeof criteriaObj[group][criteria] === 'boolean' && Player[group][criteria] < criteriaObj[group][criteria]) return false;
                        else if (Player[group][criteria] < criteriaObj[group][criteria]) return false;
                    }
                } else if (Player[group] < criteriaObj[group]) return false;
            }
            return true;
        },
        regionUnlocked: function (region) {
            const unlockData = ROUTES[region]._unlock;
            if (unlockData) {
                return this.meetsCriteria(unlockData);
            }
            return true;
        },
        routeUnlocked: function (region, route) {
            const routeData = ROUTES[region][route];
            if (routeData.kantoOldRod && Player.unlocked.kantoOldRod < routeData.kantoOldRod) {
                return false;
            }
            if (routeData.kantoGoodRod && Player.unlocked.kantoGoodRod < routeData.kantoGoodRod) {
                return false;
            }
            if (routeData.kantoSuperRod && Player.unlocked.kantoSuperRod < routeData.kantoSuperRod) {
                return false;
            }
            if (routeData.johtoOldRod && Player.unlocked.johtoOldRod < routeData.johtoOldRod) {
                return false;
            }
            if (routeData.johtoGoodRod && Player.unlocked.johtoGoodRod < routeData.johtoGoodRod) {
                return false;
            }
            if (routeData.johtoSuperRod && Player.unlocked.johtoSuperRod < routeData.johtoSuperRod) {
                return false;
            }
            if (routeData._unlock) {
                return this.meetsCriteria(routeData._unlock);
            }
            return true;
        },
        // Load and Save functions
        savePokes: function (force = false) {
        // Don't save more then every 60 seconds
            if (force || (lastSave + (1000 * 60) < Date.now())) {
                lastSave = Date.now();
                localStorage.setItem('totalPokes', appModel.$store.state.pokemon.party.length);
                appModel.$store.state.pokemon.party.forEach((poke, index) => {
                    localStorage.setItem(`poke${index}`, JSON.stringify(poke.save()));
                });
                localStorage.setItem('totalStorage', appModel.$store.state.pokemon.storage.length);
                appModel.$store.state.pokemon.storage.forEach((poke, index) => {
                    localStorage.setItem(`storage${index}`, JSON.stringify(poke.save()));
                });
                localStorage.setItem('ballsAmount', JSON.stringify(this.ballsAmount));
                localStorage.setItem('battleItems', JSON.stringify(this.battleItems));
                localStorage.setItem('vitamins', JSON.stringify(this.vitamins));
                localStorage.setItem('pokedexData', JSON.stringify(this.getPokedexData()));
                localStorage.setItem('statistics', JSON.stringify(this.statistics));
                localStorage.setItem('settings', JSON.stringify(this.settings));
                localStorage.setItem('badges', JSON.stringify(this.badges));
                localStorage.setItem('wins', JSON.stringify(this.wins));
                localStorage.setItem('unlocked', JSON.stringify(this.unlocked));
                localStorage.setItem('evoStones', JSON.stringify(this.evoStones));
                localStorage.setItem('currencyAmount', JSON.stringify(this.currencyAmount));
            }
        },
        saveToString: function () {
            const saveData = JSON.stringify({
                pokes: appModel.$store.state.pokemon.party.map((poke) => poke.save()),
                storage: appModel.$store.state.pokemon.storage.map((poke) => poke.save()),
                pokedexData: this.getPokedexData(),
                statistics: this.statistics,
                settings: this.settings,
                ballsAmount: this.ballsAmount,
                badges: this.badges,
                wins: this.wins,
                unlocked: this.unlocked,
                evoStones: this.evoStones,
                currencyAmount: this.currencyAmount,
                battleItems: this.battleItems,
                vitamins: this.vitamins,
            });
            return btoa(`${this.checksum(saveData)}|${saveData}`);
        },
        loadPokes: function () {
        // reset pokemon array
            const party = [];
            let pokeCount = 0;
            // reset storage array
            const storage = [];
            Array(Number(localStorage.getItem('totalPokes'))).fill(0).forEach((el, index) => {
                const loadedPoke = JSON.parse(localStorage.getItem(`poke${index}`));
                if (loadedPoke) {
                    const pokeName = loadedPoke[0];
                    const exp = loadedPoke[1];
                    const shiny = (loadedPoke[2] === true);
                    const caughtAt = loadedPoke[3];
                    const prestigeLevel = loadedPoke[4] || 0;
                    if (pokeCount < 6) {
                        party.push(new Poke(pokeByName(pokeName), false, Number(exp), shiny, caughtAt, prestigeLevel));
                    } else {
                        storage.push(new Poke(pokeByName(pokeName), false, Number(exp), shiny, caughtAt, prestigeLevel));
                    }
                    pokeCount++;
                }
            });
            Array(Number(localStorage.getItem('totalStorage'))).fill(0).forEach((el, index) => {
                const loadedPoke = JSON.parse(localStorage.getItem(`storage${index}`));
                if (loadedPoke) {
                    const pokeName = loadedPoke[0];
                    const exp = loadedPoke[1];
                    const shiny = (loadedPoke[2] === true);
                    const caughtAt = loadedPoke[3];
                    const prestigeLevel = loadedPoke[4] || 0;
                    storage.push(new Poke(pokeByName(pokeName), false, Number(exp), shiny, caughtAt, prestigeLevel));
                }
            });

            appModel.$store.commit('pokemon/load', { party, storage });

            if (JSON.parse(localStorage.getItem('ballsAmount'))) {
                this.ballsAmount = JSON.parse(localStorage.getItem('ballsAmount'));
            }
            if (JSON.parse(localStorage.getItem('pokedexData'))) {
                appModel.$store.commit('pokedex/loadData', JSON.parse(localStorage.getItem('pokedexData')));
            }
            if (JSON.parse(localStorage.getItem('statistics'))) {
                const loadedStats = JSON.parse(localStorage.getItem('statistics'));
                this.statistics = { ...this.statistics, ...loadedStats };
            }
            if (JSON.parse(localStorage.getItem('settings'))) {
                this.settings = JSON.parse(localStorage.getItem('settings'));
            }
            if (JSON.parse(localStorage.getItem('badges'))) {
                this.badges = JSON.parse(localStorage.getItem('badges'));
            }
            if (JSON.parse(localStorage.getItem('wins'))) {
                this.wins = JSON.parse(localStorage.getItem('wins'));
            }
            if (JSON.parse(localStorage.getItem('unlocked'))) {
                const loadedUnlocked = JSON.parse(localStorage.getItem('unlocked'));
                this.unlocked = { ...this.unlocked, ...loadedUnlocked };
            }
            if (JSON.parse(localStorage.getItem('currencyAmount'))) {
                this.currencyAmount = JSON.parse(localStorage.getItem('currencyAmount'));
            }
            if (JSON.parse(localStorage.getItem('evoStones'))) {
                this.evoStones = JSON.parse(localStorage.getItem('evoStones'));
            }
            if (JSON.parse(localStorage.getItem('battleItems'))) {
                this.battleItems = JSON.parse(localStorage.getItem('battleItems'));
            }
            if (JSON.parse(localStorage.getItem('vitamins'))) {
                this.vitamins = JSON.parse(localStorage.getItem('vitamins'));
            }
        },
        loadFromString: function (_saveData) {
            let saveData = atob(_saveData);
            saveData = saveData.split('|');
            if (this.checksum(saveData[1]) === saveData[0]) {
                try {
                    saveData = JSON.parse(saveData[1]);
                } catch (err) {
                    alert('Failed to parse save data, loading canceled!');
                    return;
                }
                const party = [];
                let pokeCount = 0;
                const storage = [];
                saveData.pokes.forEach((loadedPoke) => {
                    const pokeName = loadedPoke[0];
                    const exp = loadedPoke[1];
                    const shiny = (loadedPoke[2] === true);
                    const caughtAt = loadedPoke[3];
                    const prestigeLevel = loadedPoke[4] || 0;
                    if (pokeCount < 6) {
                        party.push(new Poke(pokeByName(pokeName), false, Number(exp), shiny, caughtAt, prestigeLevel));
                    } else {
                        storage.push(new Poke(pokeByName(pokeName), false, Number(exp), shiny, caughtAt, prestigeLevel));
                    }
                    pokeCount++;
                });
                saveData.storage.forEach((loadedPoke) => {
                    const pokeName = loadedPoke[0];
                    const exp = loadedPoke[1];
                    const shiny = (loadedPoke[2] === true);
                    const caughtAt = loadedPoke[3];
                    const prestigeLevel = loadedPoke[4] || 0;
                    storage.push(new Poke(pokeByName(pokeName), false, Number(exp), shiny, caughtAt, prestigeLevel));
                });

                appModel.$store.commit('pokemon/load', { party, storage });

                this.ballsAmount = saveData.ballsAmount; // import from old spelling mistake
                this.currencyAmount = saveData.currencyAmount;
                this.battleItems = saveData.battleItems;
                this.vitamins = saveData.vitamins;
                appModel.$store.commit('pokedex/loadData', saveData.pokedexData ? saveData.pokedexData : []);
                const loadedStats = saveData.statistics ? saveData.statistics : {};
                this.statistics = { ...this.statistics, ...loadedStats };
                if (saveData.settings) {
                    this.settings = saveData.settings;
                }
                this.badges = saveData.badges ? saveData.badges : {};
                this.wins = saveData.wins ? saveData.wins : {};
                const loadedUnlocked = saveData.unlocked ? saveData.unlocked : [];
                this.unlocked = { ...this.unlocked, ...loadedUnlocked };
            } else {
                alert('Invalid save data, loading canceled!');
            }
        },

        attachDOM: (_dom) => {
            dom = _dom;
        },
    };

    const p = mkPoke(Player);
    Poke = p.Poke;

    return Player;
};
