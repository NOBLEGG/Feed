<template>
    <div class="detail">
        <header id="header-pc">[23] 김장군</header>
        <header id="header-tablet-mobile">
            <router-link v-bind:to="'/'">
                <button>＜</button>
            </router-link>
        </header>
        <!-- detailFlag에 변화가 생길 때 re-render -->
        <div id="feed" v-if="!getDetailFlag">
            {{ requestDetail() }}
            {{ detailFlagChange() }}
        </div>
        <div v-else>
            <div id="detail">
                <h3 class="no-drag">{{ item.title }}</h3>
                <p class="no-drag">{{ item.contents }}</p>
                <p class="created-at" v-if="item.created_at">created_at({{ item.created_at.substr(0, 10) }})</p>
            </div>
            <p id="reply-length">답변 <span v-if="item.reply">{{ item.reply.length }}</span></p>
            <div v-for="reply in item.reply" v-bind:key="reply.id">
                <div class="reply">
                    <p>{{ reply.user.name }}</p>
                    <hr />
                    <p class="no-drag">{{ reply.contents }}</p>
                    <p class="created-at">created_at({{ reply.created_at.substr(0, 10) }})</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Detail',
    computed: {
        getDetailFlag() {
            return this.$store.getters.getDetailFlag
        },
        item() {
            return this.$store.getters.getDetail
        }
    },
    methods: {
        detailFlagChange() {
            this.$store.commit('detailFlagChange', true)
        },
        requestDetail() {
            this.$store.dispatch('requestDetail')
        }
    }
}
</script>

<style scoped>
#header-tablet-mobile {
    display: none;
}

p {
    line-height: 1.6em;
}

hr {
    height: 0.1px;

    margin-block-start: 0;

    border-width: 0;

    color: lightgray;
    background-color: lightgray;
}

#detail {
    margin: 5vh 20% 2vh 20%;
    padding: 1% 2%;
    
    border: 0.1px solid limegreen;
    border-radius: 5px;

    font-family: 'NanumBarunGothic', 'Open Sans', sans-serif;
    font-weight: 300;
}

#detail h3 {
    margin-block-start: 0.45em;
    margin-block-end: 0.6em;

    line-height: 1.55em;
}

#detail p {
    margin-block-start: 0.6em;
}

#reply-length {
    margin: 4.5vh 20% 0 20%;

    font-family: 'NanumBarunGothic', sans-serif;
    font-weight: 300;
}

#reply-length span {
    color: limegreen;
}

.reply {
    margin: 0.9vh 20% 2vh 20%;
    padding: 0.5% 2%;
    
    border: 0.1px solid lightgrey;
    border-radius: 5px;

    font-family: 'NanumBarunGothic', sans-serif;
    font-weight: 300;
}

.reply p:first-child {
    margin-block-end: 0.25em;
    font-family: 'Open Sans', sans-serif;

    color: dimgray;
}

.created-at {
    color: silver;
    font-size: 85%;
    font-family: 'Open Sans', sans-serif;
}

@media screen and (max-width: 768px) {
    #header-pc {
        display: none;
    }
    #header-tablet-mobile {
        display: block;
        border-bottom: 2.5px solid rgba(211, 211, 211, 0.35);
    }
    #header-tablet-mobile button {
        border: 0px;
        background-color: white;
        
        font-size: 120%;
    }
    #detail {
        margin: 2vh 3.5vw;
        padding: 2% 0;

        border-left-width: 0;
        border-right-width: 0;
        border-radius: 0;
    }
    #reply-length {
        margin: 4.5vh 3.5vw 0 3.5vw;

        font-family: 'NanumBarunGothic', sans-serif;
        font-weight: 300;
    }
    .reply {
        margin: 1vh 3.5vw 3.5vh 3.5vw;
        padding: 0.5% 0%;

        border-left-width: 0;
        border-right-width: 0;
        border-radius: 0;
    }
    hr {
        width: 100%;
        height: 0.1px;

        margin-block-start: 0;

        border-width: 0;

        color: lightgray;
        background-color: lightgray;
    }
}
</style>