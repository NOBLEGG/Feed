<template>
    <div class="feeds">
        <header>[23] 김장군</header>
        {{ detailFlagChange() }}
        <aside>
            <button id="login">로그인</button>
        </aside>
        <section>
            <div class="buttons">
                <button @click="toggle" :class="[sort == 'asc' ? 'active' : '']"><span>●</span> 오름차순</button>
                <button @click="toggle" :class="[sort == 'desc' ? 'active' : '']"><span>●</span> 내림차순</button>
                <button class="modal" @click="showSearch">검색</button>
                <SearchModal v-if="getShowSearch" @close="showSearch"></SearchModal>
                <button class="modal" @click="showFilter">필터</button>
                <FilterModal v-if="getShowFilter" @close="showFilter"></FilterModal>
            </div>
            <div v-for="(item, index) in list" v-bind:key="item.id">
                <router-link v-bind:to="'/' + item.id" v-if="(index + 1) % 4 != 0">
                    <div class="feed" v-if="item.contents.includes(search)">
                        <span class="grayed">{{ category[item.category_id - 1].name }}</span>
                        <span class="grayed id">{{ item.id }}</span>
                        <hr />
                        <span class="user-id">{{ item.user_id }}</span>
                        <span class="created-at">created_at({{ item.created_at.substr(0, 10) }})</span>
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.contents }}</p>
                    </div>
                </router-link>
                <div class="ad" v-else>
                    <p class="grayed">sponsored</p>
                    <img class="ad-image" alt="광고" v-bind:src="'https://cdn.comento.kr/assignment/' + item.img">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.contents }}</p>
                </div>
            </div>
            <button id="more" @click="expandLimit">더 보기</button>
        </section>
    </div>
</template>

<script>
import SearchModal from './SearchModal.vue'
import FilterModal from './FilterModal.vue'

export default {
    name: 'Feeds',
    components: {
        SearchModal,
        FilterModal
    },
    computed: {
        search() {
            return this.$store.getters.getSearch
        },
        getShowSearch() {
            return this.$store.getters.getShowSearch
        },
        getShowFilter() {
            return this.$store.getters.getShowFilter
        },
        category() {
            return this.$store.getters.getCategory
        },
        list() {
            const feeds = this.$store.getters.getList
            const ads = this.$store.getters.getAds
            const limit = this.$store.getters.getLimit
            let list = []
            if (feeds.length == limit && ads.length == limit) {
                let feeds_pointer = 0
                let ads_pointer = 0
                for (let i = 0; i < limit + parseInt(limit / 3); i++) {
                    if ((i + 1) % 4 != 0) {
                        list[i] = feeds[feeds_pointer]
                        feeds_pointer++
                    } else {
                        list[i] = ads[ads_pointer]
                        ads_pointer++
                    }
                }
            }
            return list
        },
        sort() {
            return this.$store.getters.getSort
        }
    },
    methods: {
        detailFlagChange() {
            this.$store.commit('detailFlagChange', false)
        },
        toggle() {
            this.$store.commit('sortToggle')
        },
        showSearch() {
            this.$store.commit('showSearch')
        },
        showFilter() {
            this.$store.commit('showFilter')
        },
        expandLimit() {
            this.$store.commit('expandLimit')
        }
    }
}
</script>

<style scoped>
aside {
  display: block;
  width: 9.5vw;
  height: 85vh;

  float: left;
  
  margin-left: 20%;
  padding: 2% 1% 1% 1%;
}

#login {
  width: 9.5vw;
  padding: 9% 0;

  border-width: 0;
  border-radius: 5px;

  font-family: 'NanumBarunGothic', sans-serif;
  font-weight: 400;
  font-size: 120%;

  color: #FFF;
  background-color: limegreen;
}

section {
  overflow: auto;
  
  display: block;
  width: 45vw;
  height: 85vh;

  float: right;
  
  margin-right: 20%;
  padding: 2% 1% 1% 1%;
}

button {
    border: 0px;

    font-family: 'NanumBarunGothic', sans-serif;

    color: lightgrey;
    background-color: white;
}

.active span {
    color: limegreen;
}

.active {
    color: black;
}

.modal {
    position: relative;
    top: 0.1em;

    float: right;

    padding: 0.25vh 0.6vw;
    margin: 0 0 0 1.5%;

    border: 1px solid lightgray;
    border-radius: 3.5px;

    font-family: 'NanumBarunGothic', sans-serif;
}

a {
    color: black;
    text-decoration: initial;
}

.feed {
    margin: 1vh 0 2vh 0;
    padding: 2.5% 4.5% 1% 4.5%;
    
    border: 0.1px solid lightgray;
    border-radius: 5px;

    font-family: 'NanumBarunGothic', 'Open Sans', sans-serif;
    font-weight: 300;
}

.feed span {
    font-size: 84%;
}

.feed p:last-child {
    font-size: 90%;
}

.id {
    float: right;
}

.ad {
    padding: 2% 5%;
    margin: 1vh 0 2vh 0;
    
    font-family: 'NanumBarunGothic', 'Open Sans', sans-serif;
    font-weight: 300;

    border: 0.1px solid lightgray;
    border-radius: 5px;
}

hr {
    border: 0;
    height: 0.1px;
    background: lightgrey;

    margin-bottom: 2%;
}

.user-id {
    color: limegreen;
    padding-right: 2%;
    border-right: 0.1px solid lightgrey;
}

.created-at {
    padding-left: 2%;
}

h3, p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

h3 {
    margin: 1em 0 0.5em 0;
}

.ad::after {
    content: "";

    display: block;

    clear: both;
}

.ad-image {
    float: left;

    width: auto;
    height: auto;
    max-width: 15%;
    max-height: 15%;

    margin-right: 1vw;
}

.ad h3 {
    overflow: hidden;
    white-space: initial;
    word-wrap: break-word;
    text-overflow: ellipsis;
    
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.ad p {
    overflow: hidden;
    white-space: initial;
    word-wrap: break-word;
    text-overflow: ellipsis;
    
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}

.ad p:first-child {
    font-size: 84%;
}

.ad p:last-child {
    font-size: 90%;
    line-height: 1.55em;
}

#more {
  position: relative;
  width: 100%;

  border-width: 0;
  border-radius: 2px;

  color: white;
  background-color: lightgrey;

  font-family: 'NanumBarunGothic', sans-serif;
  font-weight: 300;
  /* font-size: 5px; */

  padding: 1% 0;
}

@media screen and (max-width: 768px) {
    aside {
        display: none;
    }
    section {
        overflow: auto;
        
        display: block;
        width: 100vw;
        height: 85vh;

        float: none;
        
        margin-right: 0;
        padding: 0 0 1vh 0;
    }
    .buttons {
        padding: 0 1vw 1.2vh 1vw;
        border-bottom: 0.1px solid lightgrey;
    }
    .feed {
        margin: 4.5% 1.5% 0 1.5%;
        padding: 2% 2%;
        
        border-top: 0;
        border-right: 0;
        border-bottom: 1vh solid whitesmoke;
        border-left: 0;
        border-radius: 0;

        font-family: 'NanumBarunGothic', 'Open Sans', sans-serif;
        font-weight: 300;
    }
    .ad {
        margin: 0;
        padding: 2% 2%;

        border-top: 0;
        border-right: 0;
        border-bottom: 1vh solid whitesmoke;
        border-left: 0;
        border-radius: 0;

        font-family: 'NanumBarunGothic', 'Open Sans', sans-serif;
        font-weight: 300;
        
        text-align: center;
    }
    hr {
        margin-bottom: 5%;
    }
    .user-id {
        padding-right: 0;
        border-right: 0;
    }
    .created-at {
        display: none;
        padding-left: 0;
    }
    .ad-image {
        float: initial;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        margin: 0 auto;
    }
    .ad h3 {
        text-align: initial;
    }
    .ad p {
        overflow: hidden;
        white-space: initial;
        word-wrap: break-word;
        text-overflow: ellipsis;
        
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        font-size: 95%;
        text-align: initial;

        /* line-height: 1.2em;
        height: 3.6em; */
    }
    #more {
        position: relative;
        width: 100%;

        border-width: 0;
        border-radius: 0;

        color: white;
        background-color: lightgrey;

        font-family: 'NanumBarunGothic', sans-serif;
        font-weight: 300;
        font-size: 5px;

        padding: 1.1vh 0;
    }
}
</style>