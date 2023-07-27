
<template>
  <!-- <SlotsBase>
    <div>
        <h3>插槽标题</h3>
        <p>插槽内容</p>
    </div>
  </SlotsBase> -->
  <!-- <SlotsTow>
    <template v-slot:header>
      <h3>插槽内容</h3>
    </template>
    <template #content>
      <h3>{{message}}</h3>
    </template>
  </SlotsTow> -->
  <SlotsAttr>
    <template #header="slotProps">
      <h3>{{ currentText }} -- {{ slotProps.msg }}</h3>
    </template>
    <template #main="slotProps">
      <p>{{ slotProps.job }}</p>
    </template>
  </SlotsAttr>
</template>

<script>
import SlotsBase from './components/SlotsBase.vue';
import SlotsTow from './components/SlotsTow.vue';
import SlotsAttr from './components/SlotsAttr.vue';
export default {
  data() {
    return {
      message: "插槽内容续集。。。。",
      currentText:"测试内容"
    }
  },
  components: {
    SlotsBase,
    SlotsTow,
    SlotsAttr
  }
}
</script>

<style scoped></style>
