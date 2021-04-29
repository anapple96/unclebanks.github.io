<template>
  <CardModal
    name="town"
    title="Town"
  >
    <template #body>
      <div id="townBuildings">
        <div
          id="pokecoinShop"
          class="townBuilding"
        >
          <h4>PokeCoin Shop</h4>
          <ul id="pokecoinShopItems" />
          <div id="catchcoinShop">
            <h4>CatchCoin Shop</h4>
            <ul id="catchcoinShopItems" />
          </div>
        </div>
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
