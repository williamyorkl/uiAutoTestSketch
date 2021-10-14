<template>
  <div class="main">
    <div class="header">
      <!-- <span class="header-class">Header</span> -->
    </div>
    <div class="body"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.main {
  width: 375px;
  height: 667px;
}
.header {
  height: 95px;
  background: #0091ff;
  justify-content: center;
  display: flex;
  align-items: center;
}
.header-class {
  font-size: 40px;
}

.body {
  height: 406px;
  background: rgba(0, 0, 0, 0.1);
}

.footer {
  height: 166px;
  background: #6236ff;
}
</style>
