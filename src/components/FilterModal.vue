<template>
    <div class="modal">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <button class="close-button" @click="$emit('close')">×</button>

                        <div class="modal-header">
                            <slot name="header">
                                <h3>필터</h3>
                            </slot>
                        </div>

                        <div class="modal-body">
                            <slot name="body">
                                <div v-for="item in category" v-bind:key="item.id">
                                    <input type="checkbox" v-bind:id="item.id" v-bind:value="item.id" v-model="checkedItems">
                                    <label> {{ item.name }}</label>
                                </div>
                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">
                                <button class="modal-default-button" @click="changeCategoryId(); $emit('close')">
                                    저장하기
                                </button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'FilterModal',
    data: function () {
        return {
            checkedItems: localStorage.getItem('category').split(',')
        }
    },
    computed: {
        category() {
            return this.$store.getters.getCategory
        }
    },
    methods: {
        changeCategoryId() {
            if (this.checkedItems.length == 0)
                alert("최소 하나 이상의 카테고리를 선택해 주세요.")
            else {
                const temp = this.checkedItems.join(',')
                this.$store.commit('changeCategoryId', temp)
            }
        }
    }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-header h3 {
  margin-top: 0;
  font-family: 'NanumBarunGothic', sans-serif;
  font-weight: 700;
}

.close-button {
  position: relative;
  top: -2vh;
  right: -9%;
  border: 0px;
  color: darkgrey;
  background-color: white;

  float: right;

  font-size: 25px;
}

.modal-body {
  margin: 20px 0;
  font-family: 'Open Sans', sans-serif;
}

.modal-body input {
  width: 15px;
  height: 15px;
}

.modal-footer {
  height: 3.5vh;
}

.modal-default-button {
  float: right;

  padding: 2% 5%;

  border-width: 0;
  border-radius: 2px;

  font-family: 'NanumBarunGothic', sans-serif;
  font-weight: 300;

  color: #FFF;
  background-color: limegreen;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media screen and (max-width: 768px) {
    .modal-wrapper {
        display: table;
        position: relative;
        top: 25vh;
        margin: 0 auto;
    }
    .modal-container {
        width: 250px;
    }
    .modal-footer {
        height: 5vh;
    }
    .modal-default-button {
        width: 100%;
        padding: 4%;

        border-width: 0;
        border-radius: 2px;

        font-family: 'NanumBarunGothic', sans-serif;
        font-weight: 300;

        color: #FFF;
        background-color: limegreen;
    }
}
</style>