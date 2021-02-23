<template>
  <div id="app">
    {{ requestCategory() }}
    {{ requestFeeds() }}
    {{ requestAds() }}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    requestCategory() {
      this.$store.dispatch('requestCategory')
    },
    requestFeeds() {
      this.$store.dispatch('requestFeeds')
    },
    requestAds() {
      this.$store.dispatch('requestAds')
    }
  }
}
</script>

<style>
.no-drag {
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;

  -moz-user-select: -moz-none;
  
  user-select: none;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  display: block;
  height: 5vh;

  padding-left: 20.5%;
  padding-right: 20.5%;
  margin-bottom: 1%;
  border-bottom: 0.1px solid lightgray;

  font-family: 'NanumBarunGothic', sans-serif;
  font-weight: 400;

  /* div 한 줄 텍스트 수직정렬 */
  line-height: 4.4vh;
}

.grayed {
    color: silver;
}

@media screen and (max-width: 768px) {
  body {
    margin: 0;
  }

  header {
    padding: 0 1vw;

    border-bottom: 0.1px solid lightgray;
    
    font-family: 'NanumBarunGothic', sans-serif;
    font-weight: 400;
    font-size: x-large;

    /* div 한 줄 텍스트 수직정렬 */
    line-height: 5vh;
  }
}
</style>