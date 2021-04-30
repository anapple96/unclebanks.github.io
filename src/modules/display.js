import { $, flash } from './utilities';
import ROUTES from './routes';
import { COLORS } from './data';
import { openModal, closeModal } from './modalEvents';

export const renderView = (dom, enemy, player, purge = true) => {
    dom.renderPokeOnContainer('enemy', enemy.activePoke());
    dom.renderPokeOnContainer('player', player.activePoke(), player.settings.spriteChoice || 'back');
};

export default (player, combatLoop, userInteractions) => {
    const Display = {
        healElement: $('#heal'),
        setValue: function (domElement, newValue, append) {
            if (append === undefined) { append = false; }
            if (append) {
                domElement.innerHTML += newValue;
            }
            if (!append) {
                if (domElement.innerHTML !== newValue) {
                    domElement.innerHTML = newValue;
                }
            }
        },
        getValue: function (domElement) {
            return domElement.innerHTML;
        },
        setProp: function (domElement, attribute, newValue) {
            if (domElement[attribute] !== newValue) {
                domElement[attribute] = newValue;
            }
        },
        renderPokeOnContainer: function (id, poke, face) {
            const container = $(`#${id}Box`).querySelector('.pokeBox');
            const townBox = $('#townBox');
            const npcButton = $('#npcButton');
            if (!poke) {
                container.style.display = 'none';
                if (id == 'enemy') {
                    townBox.style.display = 'block';
                    const route = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
                    npcButton.style.display = (route.npc) ? '' : 'none';
                    npcButton.innerHTML = (route.npc) ? route.npc.name : '';
                }
                return null;
            }
            container.style.display = 'block';
            if (id == 'enemy') townBox.style.display = 'none';

            face = face || 'front';
            const pokeStatusAsText = (poke) => {
                let output = '';
                output += `Attack Speed: ${poke.attackSpeed() / 1000}<br>`;
                output += `\nAttack: ${poke.avgAttack()}<br>`;
                output += `\nDefense: ${poke.avgDefense()}<br>`;
                return output;
            };
            const domElements = {
                name: container.querySelector('.name'),
                img: container.querySelector('.img'),
                hp: container.querySelector('.hp'),
                hpBar: container.querySelector('.hpBar'),
                expBar: container.querySelector('.expBar'),
                status: container.querySelector('.status'),
            };
            this.setValue(domElements.name, `${poke.pokeName()} (${poke.level()})`);
            this.setProp(domElements.img, 'src', poke.image()[face]);
            this.setValue(domElements.hp, poke.lifeAsText());
            this.setProp(domElements.hpBar, 'value', poke.getHp());
            this.setProp(domElements.hpBar, 'max', poke.maxHp());
            if (id === 'player') {
                this.setProp(domElements.expBar, 'value', Math.floor(poke.currentExp() - poke.thisLevelExp()));
                this.setProp(domElements.expBar, 'max', poke.nextLevelExp() - poke.thisLevelExp());
            }
            this.setValue(domElements.status, pokeStatusAsText(poke));
        },
        renderPokeDexSort: function () {
            let sortHTML = '<option value="all">All</option>';
            let showList = false;
            if (player.unlocked.shinyDex) {
                sortHTML += `<option value="shiny"${player.settings.dexView === 'shiny' ? ' selected="true")' : ''}>Shiny</option>`;
                showList = true;
            }
            if (showList) {
                $('#dexView').innerHTML = sortHTML;
                $('#dexView').style.display = 'block';
            }
        },
        renderHeal: function (timeToHeal, enemy) {
            if (timeToHeal <= 0) {
                this.setValue(this.healElement, 'Heal!');
                player.healAllPokemons();
                combatLoop.refresh();
                renderView(Display, enemy, player, false);
            } else {
                this.setValue(this.healElement, `Heal: ${Math.floor(((1 - timeToHeal / 30000) * 100))}%`);
            }
        },
        pokeStatus: function (poke) {
            if (poke.alive()) {
                if (poke === player.activePoke()) {
                    if (poke.shiny()) {
                        return 'activeShiny';
                    }
                    return 'activeNormal';
                }
                if (poke.shiny()) {
                    return 'inactiveShiny';
                }
                return 'inactiveNormal';
            }
            return 'dead';
        },
        renderPokeSort: function () {
            $('#autoSort').checked = player.settings.autoSort;
            if (player.settings.autoSort) {
                $('#pokeSortOrderSelect').style.display = 'inline';
                $('#pokeSortDirSelect').style.display = 'inline';
            } else {
                $('#pokeSortOrderSelect').style.display = 'none';
                $('#pokeSortDirSelect').style.display = 'none';
            }
        },
        renderRegionSelect: function () {
            for (const region in ROUTES) {
                if (player.regionUnlocked(region)) {
                    return true;
                } return false;
            }
        },
        renderRouteList: function () {
            this.renderRegionSelect();
            const routes = ROUTES[player.settings.currentRegionId];
            const listElement = $('#routeList');
            $('#regionSelect').value = player.settings.currentRegionId;
            this.setValue(listElement, '');
            Object.keys(routes).forEach((routeId) => {
                if (routeId !== '_unlock' && routeId !== '_global') {
                    const route = routes[routeId];
                    const unlocked = player.routeUnlocked(player.settings.currentRegionId, routeId);
                    const routeOnClick = (unlocked) ? `userInteractions.changeRoute('${routeId}')` : '';
                    let routeColor; let
                        routeWeight;
                    if (unlocked) {
                        routeColor = (routeId === player.settings.currentRouteId) ? COLORS.route.current : COLORS.route.unlocked;
                        routeWeight = (routeId === player.settings.currentRouteId) ? 'bold' : 'normal';
                    } else {
                        routeColor = COLORS.route.locked;
                        routeWeight = 'normal';
                    }
                    const boostedRoamer = player.routeGetBoostedRoamer(player.settings.currentRegionId, routeId);
                    const roamerIcon = boostedRoamer ? (`<img class="roamerIcon" src="assets/images/roamers/${boostedRoamer}.png">`) : '';
                    const routeLevels = (!route.town) ? ` (${route.minLevel}~${route.maxLevel})` : '';
                    const routeHTML = `<li><a href="#" onclick="${routeOnClick}" style="color: ${routeColor}; font-weight: ${routeWeight};" >${route.name}${routeLevels}</a>${roamerIcon}</li>`;
                    this.setValue(listElement, routeHTML, true);
                }
            });
        },
        renderRoutesBox: function () {
            this.renderRouteList();
        },
        checkConfirmed: function (id) {
            return $(id).checked;
        },
        attackAnimation: function (id, direction) {
            const toAnimate = $(`#${id}`);
            toAnimate.classList = `img attacked-${direction}`;
            window.setTimeout(() => toAnimate.classList = 'img', 80);
        },
        renderBalls: function () {
            Object.keys(player.ballsAmount).forEach((ballType) => {
                $(`.ball-amount.${ballType}`).innerHTML = player.ballsAmount[ballType];
            });
        },
        renderTypePoints: function () {
            this.renderFirePoints();
            openModal(document.getElementById('typePointsModal'));
        },
        renderFirePoints: function () {
            const fire = $('#firePoints');
            const water = $('#waterPoints');
            const grass = $('#grassPoints');
            const electric = $('#electricPoints');
            const ghost = $('#ghostPoints');
            const dark = $('#darkPoints');
            const dragon = $('#dragonPoints');
            const fighting = $('#fightingPoints');
            const flying = $('#flyingPoints');
            const fairy = $('#fairyPoints');
            const ice = $('#icePoints');
            const bug = $('#bugPoints');
            const steel = $('#steelPoints');
            const normal = $('#normalPoints');
            const psychic = $('#psychicPoints');
            const ground = $('#groundPoints');
            const rock = $('#rockPoints');
            const poison = $('#poisonPoints');
            fire.innerHTML = `${player.typePoints.fire}`;
            water.innerHTML = `${player.typePoints.water}`;
            grass.innerHTML = `${player.typePoints.grass}`;
            electric.innerHTML = `${player.typePoints.electric}`;
            ghost.innerHTML = `${player.typePoints.ghost}`;
            dark.innerHTML = `${player.typePoints.dark}`;
            dragon.innerHTML = `${player.typePoints.dragon}`;
            fighting.innerHTML = `${player.typePoints.fighting}`;
            flying.innerHTML = `${player.typePoints.flying}`;
            fairy.innerHTML = `${player.typePoints.fairy}`;
            ice.innerHTML = `${player.typePoints.ice}`;
            bug.innerHTML = `${player.typePoints.bug}`;
            steel.innerHTML = `${player.typePoints.steel}`;
            normal.innerHTML = `${player.typePoints.normal}`;
            psychic.innerHTML = `${player.typePoints.psychic}`;
            ground.innerHTML = `${player.typePoints.ground}`;
            rock.innerHTML = `${player.typePoints.rock}`;
            poison.innerHTML = `${player.typePoints.poison}`;
        },
        renderPokeCoins: function () {
            const pokeCoinsElement = $('#pokeCoins');
            pokeCoinsElement.innerHTML = player.currencyAmount.pokecoins;
        },
        renderResearchCoins: function () {
            const researchCoinsElement = $('#researchCoins');
            researchCoinsElement.innerHTML = player.currencyAmount.researchcoins;
        },
        renderCurrency: function () {
            this.renderResearchCoins();
            this.renderPokeCoins();
        },
        renderRevive: function () {
            const reviveElement = $('#revive');
            reviveElement.innerHTML = player.battleItems.revive;
        },
        renderMaxRevive: function () {
            const maxReviveElement = $('#maxRevive');
            maxReviveElement.innerHTML = player.battleItems.maxRevive;
        },
        renderBattleItems: function () {
            this.renderRevive();
            this.renderMaxRevive();
        },
        refreshCatchOption: function (setCatchOption) {
            $('#enableCatchNew').checked = false;
            $('#enableCatchAll').checked = false;
            if (setCatchOption === 'new') {
                $('#enableCatchNew').checked = true;
            } else if (setCatchOption === 'all') {
                $('#enableCatchAll').checked = true;
            }
            userInteractions.changeCatchOption(setCatchOption);
        },
        showPopup: function (message) {
            $('#modalPopup').style.display = 'flex';
            $('#modalPopup #popupText').innerText = message;
            setTimeout(this.hidePopup, 2000);
        },
        hidePopup: function () {
            $('#modalPopup').style.display = 'none';
            $('#modalPopup #popupText').innerText = '';
        },
        bindEvents: function () {
            $('#autoSort').addEventListener('click', () => {
                userInteractions.enablePokeListAutoSort();
            });
            $('#viewPokeDex').addEventListener('click', () => {
                userInteractions.openPokeDex();
            });

            $('#enableCatchAll').addEventListener('click',
                () => {
                    let setCatchSetting;
                    if ($('#enableCatchAll').checked) {
                        $('#enableCatchNew').checked = false;
                        setCatchSetting = 'all';
                    } else {
                        setCatchSetting = false;
                    }
                    player.settings.catching = setCatchSetting;
                    userInteractions.changeCatchOption(setCatchSetting);
                });

            $('#enableCatchNew').addEventListener('click',
                () => {
                    let setCatchSetting;
                    if ($('#enableCatchNew').checked) {
                        $('#enableCatchAll').checked = false;
                        setCatchSetting = 'new';
                    } else {
                        setCatchSetting = false;
                    }
                    player.settings.catching = setCatchSetting;
                    userInteractions.changeCatchOption(setCatchSetting);
                });

            window.addEventListener('beforeunload', () => {
                if (!player.purgeData) player.savePokes(true);
            });
        },
    };

    return Display;
};
