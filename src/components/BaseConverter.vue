<template>
    <h1>Youtube to MP3 converter</h1>
    <h1>{{ title }}</h1>
    <h3 v-if="isLoading">Loading...</h3>
    <div class="search-container">
        <input class="search-bar" v-model="ytLink" placeholder="Youtube Link" />
        <button class="submit-button" @click="submit">Download mp3</button>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        msg: String,
    },
    data() {
        return {
            ytLink: '',
        };
    },
    computed: {
        ...mapState(['title', 'isLoading']),
    },
    methods: {
        ...mapActions(['downloadVideo']),
        submit() {
            this.downloadVideo(this.ytLink);
        },
    },
};
</script>
<style scoped>
.read-the-docs {
    color: #888;
}
.search-container {
    display: flex;
    justify-content: center;
}
.search-bar {
    overflow: hidden;
    padding: 20px;
    border: none;
    border-radius: 25px;
    /* margin-top: 8px; */
    margin-right: 16px;
    font-size: 17px;
}

.submit-button {
    border-radius: 25px;
    padding: 20px;
    background-color: #ffa500;
}
</style>
