<template>
  <CardModal
    name="typePoints"
    title="Type Points"
  >
    <template #body>
      <div class="section">
        <h3 class="subtitle">
          Type Points
        </h3>
        <img
          src="assets/icons/types/fire.svg"
          height="18"
          width="18"
        > Fire Points: <span id="firePoints">0</span><br>
        <img
          src="assets/icons/types/water.svg"
          height="18"
          width="18"
        > Water Points: <span id="waterPoints">0</span><br>
        <img
          src="assets/icons/types/grass.svg"
          height="18"
          width="18"
        > Grass Points: <span id="grassPoints">0</span><br>
        <img
          src="assets/icons/types/electric.svg"
          height="18"
          width="18"
        > Electric Points: <span id="electricPoints">0</span><br>
        <img
          src="assets/icons/types/normal.svg"
          height="18"
          width="18"
        > Normal Points: <span id="normalPoints">0</span><br>
        <img
          src="assets/icons/types/ice.svg"
          height="18"
          width="18"
        > Ice Points: <span id="icePoints">0</span><br>
        <img
          src="assets/icons/types/fighting.svg"
          height="18"
          width="18"
        > Fighting Points: <span id="fightingPoints">0</span><br>
        <img
          src="assets/icons/types/poison.svg"
          height="18"
          width="18"
        > Poison Points: <span id="poisonPoints">0</span><br>
        <img
          src="assets/icons/types/ground.svg"
          height="18"
          width="18"
        > Ground Points: <span id="groundPoints">0</span><br>
        <img
          src="assets/icons/types/flying.svg"
          height="18"
          width="18"
        > Flying Points: <span id="flyingPoints">0</span><br>
        <img
          src="assets/icons/types/psychic.svg"
          height="18"
          width="18"
        > Psychic Points: <span id="psychicPoints">0</span><br>
        <img
          src="assets/icons/types/bug.svg"
          height="18"
          width="18"
        > Bug Points: <span id="bugPoints">0</span><br>
        <img
          src="assets/icons/types/rock.svg"
          height="18"
          width="18"
        > Rock Points: <span id="rockPoints">0</span><br>
        <img
          src="assets/icons/types/ghost.svg"
          height="18"
          width="18"
        > Ghost Points: <span id="ghostPoints">0</span><br>
        <img
          src="assets/icons/types/dragon.svg"
          height="18"
          width="18"
        > Dragon Points: <span id="dragonPoints">0</span><br>
        <img
          src="assets/icons/types/dark.svg"
          height="18"
          width="18"
        > Dark Points: <span id="darkPoints">0</span><br>
        <img
          src="assets/icons/types/steel.svg"
          height="18"
          width="18"
        > Steel Points: <span id="steelPoints">0</span><br>
        <img
          src="assets/icons/types/fairy.svg"
          height="18"
          width="18"
        > Fairy Points: <span id="fairyPoints">0</span><br>
      </div>
    </template>
  </CardModal>
</template>

<script>
import CardModal from '../common/CardModal.vue';

export default {
    components: {
        CardModal,
    },
};
</script>
