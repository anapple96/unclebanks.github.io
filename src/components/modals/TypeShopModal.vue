<template>
  <CardModal
    name="typeshop"
    title="Type Shop"
  >
    <template #body>
      <div id="typeShops">
        <div
          id="pokecoinShop"
          class="typeShop"
        >
          <h4>FIRST LEVEL POKEMON</h4>
          <ul id="firstLevelMon" />
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
