import { $ } from './utilities';

type Player = any;
type Poke = any;
type DOM = any;

interface ShopItemBase {
    name: string,
}

interface ShopItemBall extends ShopItemBase {
    ball: string,
}

interface ShopItemBattleItem extends ShopItemBase {
    battleItem: string,
}

interface ShopItemUnlockable extends ShopItemBase {
    unlockable: string,
}

interface ShopItemMegaStone extends ShopItemBase {
    megaStones: string,
}

type ShopItem = ShopItemBall | ShopItemBattleItem | ShopItemUnlockable | ShopItemMegaStone;

interface PokecoinShopItemBase {
    pokecoins: number,
}

interface CatchcoinShopItemBase {
    researchcoins: number,
}

type PokecoinShopItem = PokecoinShopItemBase & ShopItem;

type PokecoinShop = PokecoinShopItem[];

type CatchcoinShopItem = CatchcoinShopItemBase & ShopItem;

type CatchcoinShop = CatchcoinShopItem[];

interface RegionShops<T> {
    kanto: T,
    johto: T,
    hoenn: T,
    sinnoh: T,
    unova: T,
    kalos: T,
    alola: T,
    galar?: T,
}

class Town {
    player: Player;

    Poke: Poke;

    dom: DOM;

    pokecoinShops: RegionShops<PokecoinShop>;

    researchcoinShops: RegionShops<CatchcoinShop>;

    constructor(player: Player, Poke: Poke) {
        this.player = player;
        this.Poke = Poke;

        this.pokecoinShops = {
            kanto: [
                {
                    name: 'Pokeball',
                    pokecoins: 100,
                    ball: 'pokeball',
                },
                {
                    name: 'Greatball',
                    pokecoins: 500,
                    ball: 'greatball',
                },
                {
                    name: 'Ultraball',
                    pokecoins: 1000,
                    ball: 'ultraball',
                },
                /*
                {
                    name: 'Revive',
                    pokecoins: 1000,
                    battleItem: 'revive',
                },
                {
                    name: 'Max Revive',
                    pokecoins: 1000,
                    battleItem: 'maxRevive',
                },
                */
            ],
            johto: [
                {
                    name: 'Pokeball',
                    pokecoins: 100,
                    ball: 'pokeball',
                },
                {
                    name: 'Greatball',
                    pokecoins: 500,
                    ball: 'greatball',
                },
                {
                    name: 'Ultraball',
                    pokecoins: 1000,
                    ball: 'ultraball',
                },
            ],
            hoenn: [
                {
                    name: 'Pokeball',
                    pokecoins: 100,
                    ball: 'pokeball',
                },
                {
                    name: 'Greatball',
                    pokecoins: 500,
                    ball: 'greatball',
                },
                {
                    name: 'Ultraball',
                    pokecoins: 1000,
                    ball: 'ultraball',
                },
            ],
            sinnoh: [
                {
                    name: 'Pokeball',
                    pokecoins: 100,
                    ball: 'pokeball',
                },
                {
                    name: 'Greatball',
                    pokecoins: 500,
                    ball: 'greatball',
                },
                {
                    name: 'Ultraball',
                    pokecoins: 1000,
                    ball: 'ultraball',
                },
            ],
            unova: [
                {
                    name: 'Pokeball',
                    pokecoins: 100,
                    ball: 'pokeball',
                },
                {
                    name: 'Greatball',
                    pokecoins: 500,
                    ball: 'greatball',
                },
                {
                    name: 'Ultraball',
                    pokecoins: 1000,
                    ball: 'ultraball',
                },
            ],
            kalos: [
                {
                    name: 'Pokeball',
                    pokecoins: 100,
                    ball: 'pokeball',
                },
                {
                    name: 'Greatball',
                    pokecoins: 500,
                    ball: 'greatball',
                },
                {
                    name: 'Ultraball',
                    pokecoins: 1000,
                    ball: 'ultraball',
                },
            ],
            alola: [
                {
                    name: 'Pokeball',
                    pokecoins: 100,
                    ball: 'pokeball',
                },
                {
                    name: 'Greatball',
                    pokecoins: 500,
                    ball: 'greatball',
                },
                {
                    name: 'Ultraball',
                    pokecoins: 1000,
                    ball: 'ultraball',
                },
            ],
        };
        this.researchcoinShops = {
            kanto: [
                {
                    name: 'Old Rod',
                    researchcoins: 100,
                    unlockable: 'kantoOldRod',
                },
                {
                    name: 'Good Rod',
                    researchcoins: 1000,
                    unlockable: 'kantoGoodRod',
                },
                {
                    name: 'Super Rod',
                    researchcoins: 10000,
                    unlockable: 'kantoSuperRod',
                },
            ],
            johto: [
                {
                    name: 'Old Rod',
                    researchcoins: 100,
                    unlockable: 'johtoOldRod',
                },
                {
                    name: 'Good Rod',
                    researchcoins: 1000,
                    unlockable: 'johtoGoodRod',
                },
                {
                    name: 'Super Rod',
                    researchcoins: 10000,
                    unlockable: 'johtoSuperRod',
                },
            ],
            hoenn: [
                {
                    name: 'Old Rod',
                    researchcoins: 100,
                    unlockable: 'hoennOldRod',
                },
                {
                    name: 'Good Rod',
                    researchcoins: 1000,
                    unlockable: 'hoennGoodRod',
                },
                {
                    name: 'Super Rod',
                    researchcoins: 10000,
                    unlockable: 'hoennSuperRod',
                },
            ],
            sinnoh: [
                {
                    name: 'Old Rod',
                    researchcoins: 100,
                    unlockable: 'sinnohOldRod',
                },
                {
                    name: 'Good Rod',
                    researchcoins: 1000,
                    unlockable: 'sinnohGoodRod',
                },
                {
                    name: 'Super Rod',
                    researchcoins: 10000,
                    unlockable: 'sinnohSuperRod',
                },
            ],
            unova: [
                {
                    name: 'Old Rod',
                    researchcoins: 100,
                    unlockable: 'unovaOldRod',
                },
                {
                    name: 'Good Rod',
                    researchcoins: 1000,
                    unlockable: 'unovaGoodRod',
                },
                {
                    name: 'Super Rod',
                    researchcoins: 10000,
                    unlockable: 'unovaSuperRod',
                },
            ],
            kalos: [
                {
                    name: 'Old Rod',
                    researchcoins: 100,
                    unlockable: 'kalosOldRod',
                },
                {
                    name: 'Good Rod',
                    researchcoins: 1000,
                    unlockable: 'kalosGoodRod',
                },
                {
                    name: 'Super Rod',
                    researchcoins: 10000,
                    unlockable: 'kalosSuperRod',
                },
            ],
            alola: [
                {
                    name: 'Old Rod',
                    researchcoins: 100,
                    unlockable: 'alolaOldRod',
                },
                {
                    name: 'Good Rod',
                    researchcoins: 1000,
                    unlockable: 'alolaGoodRod',
                },
                {
                    name: 'Super Rod',
                    researchcoins: 10000,
                    unlockable: 'alolaSuperRod',
                },
            ],
        };
    }

    renderPokeCoinShop(region: string): void {
        let shopHTML = '';
        const shop: PokecoinShop | null = region in this.pokecoinShops ? this.pokecoinShops[region] : null;
        if (!shop) {
            throw new Error(`Couldn't find shop for region ${region}`);
        }
        for (let i = 0; i < shop.length; i++) {
            const item = shop[i];
            let canBuy = true;
            let canBuy10 = true;
            let canBuy100 = true;
            let canBuy1000 = true;
            const own = false;
            if (this.player.currencyAmount.pokecoins < item.pokecoins) canBuy = false;
            if (this.player.currencyAmount.pokecoins < item.pokecoins * 10) canBuy10 = false;
            if (this.player.currencyAmount.pokecoins < item.pokecoins * 100) canBuy100 = false;
            if (this.player.currencyAmount.pokecoins < item.pokecoins * 1000) canBuy1000 = false;
            const disableButton = (!canBuy || own) ? ' disabled="true"' : '';
            const disableButton10 = (!canBuy10 || own) ? ' disabled="true"' : '';
            const disableButton100 = (!canBuy100 || own) ? ' disabled="true"' : '';
            const disableButton1000 = (!canBuy1000 || own) ? ' disabled="true"' : '';
            const buttonText = (own) ? 'Own' : 'Buy';
            const buttonText10 = (own) ? 'Own' : 'Buy 10';
            const buttonText100 = (own) ? 'Own' : 'Buy 100';
            const buttonText1000 = (own) ? 'Own' : 'Buy 1000';
            const buttonHTML = ` <button onclick="town.buyPokeCoinItem('${region}', ${i})"${disableButton}>${buttonText}</button>`;
            const button10HTML = ` <button onclick="town.buyPokeCoinItem('${region}', ${i}, 10)"${disableButton10}>${buttonText10}</button>`;
            const button100HTML = ` <button onclick="town.buyPokeCoinItem('${region}', ${i}, 100)"${disableButton100}>${buttonText100}</button>`;
            const button1000HTML = ` <button onclick="town.buyPokeCoinItem('${region}', ${i}, 1000)"${disableButton1000}>${buttonText1000}</button>`;
            if ('ball' in item) {
                shopHTML += `<li><img src="assets/images/pokeballs/${item.ball}.png" height="30" width="30"></img>: <img src="assets/images/currency/PokeCoin.png" height="16" width="16"></img>${item.pokecoins}${buttonHTML}${button10HTML}${button100HTML}${button1000HTML}</li>`;
            } else if ('battleItem' in item) {
                shopHTML += `<li><img src="assets/images/battleItems/${item.battleItem}.png" height="30" width="30"></img>: <img src="assets/images/currency/PokeCoin.png" height="16" width="16"></img>${item.pokecoins}${buttonHTML}${button10HTML}${button100HTML}${button1000HTML}</li>`;
            } else {
                shopHTML += `<li>${item.name}: <img src="assets/images/currency/PokeCoin.png" height="16" width="16"></img>${item.pokecoins}${buttonHTML}${button10HTML}${button100HTML}${button1000HTML}</li>`;
            }
        }
        $('#pokecoinShopItems').innerHTML = shopHTML;
    }

    renderResearchCoinShop(region: string): void {
        let shopHTML = '';
        const shop: CatchcoinShop | null = region in this.researchcoinShops ? this.researchcoinShops[region] : null;
        if (!shop) {
            throw new Error(`Couldn't find shop for region ${region}`);
        }
        for (let i = 0; i < shop.length; i++) {
            const item = shop[i];
            let canBuy = true;
            let own = false;
            if (this.player.currencyAmount.researchcoins < item.researchcoins) canBuy = false;
            if ('unlockable' in item && this.player.unlocked[item.unlockable]) {
                canBuy = false;
                own = true;
            }
            const disableButton = (!canBuy || own) ? ' disabled="true"' : '';
            const buttonText = (own) ? 'Own' : 'Buy';
            const buttonHTML = ` <button onclick="town.buyResearchCoinItem('${region}', ${i})"${disableButton}>${buttonText}</button>`;
            shopHTML += `${'<li><img src="assets/images/evoStones/'}${item.name}.png" height="30" width="30"></img>: <img src="assets/images/currency/CatchCoin.png" height="16" width="16"></img>${item.researchcoins}${buttonHTML}</li>`;
        }
        $('#researchcoinShopItems').innerHTML = shopHTML;
    }

    buyPokeCoinItem(region: string, index: number, amount = 1) {
        const shop: PokecoinShop | null = region in this.pokecoinShops ? this.pokecoinShops[region] : null;
        if (!shop) {
            throw new Error(`Couldn't find shop for region ${region}`);
        }
        const item = shop[index];
        const cost = item.pokecoins * amount;
        if (this.player.currencyAmount.pokecoins < cost) {
            return false;
        } else {
            this.player.currencyAmount.pokecoins -= cost;
            if ('ball' in item) {
                this.player.ballsAmount[item.ball] += amount;
                this.dom.renderBalls();
            } else if ('battleItem' in item) {
                this.player.battleItem[item.battleItem] += amount;
                this.dom.renderBalls();
            } else {
                throw new Error('Unhandled item type.');
            }
            this.renderPokeCoinShop(region); // force refresh of shop
            this.dom.renderCurrency();
            return true;
        }
    }

    buyResearchCoinItem(region: string, index: number) {
        const shop: CatchcoinShop | null = region in this.researchcoinShops ? this.researchcoinShops[region] : null;
        if (!shop) {
            throw new Error(`Couldn't find shop for region ${region}`);
        }
        const item = shop[index];
        if (this.player.currencyAmount.researchcoins < item.researchcoins) {
            return false;
        } else {
            this.player.currencyAmount.researchcoins -= item.researchcoins;
            if ('unlockable' in item) {
                this.player.unlocked[item.unlockable] = 1;
                this.dom.renderRouteList();
            }
            this.renderResearchCoinShop(region); // force refresh of shop
            this.dom.renderCurrency();
            return true;
        }
    }

    attachDOM(_dom: DOM) {
        this.dom = _dom;
    }
}

export default (player: Player, Poke: Poke): Town => new Town(player, Poke);
