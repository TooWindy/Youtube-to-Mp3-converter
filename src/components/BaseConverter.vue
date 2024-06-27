<template>
    <h1>Youtube to MP3 converter</h1>
    <h1>{{ title }}</h1>
    <h3 v-if="isLoading">Loading...</h3>
    <input v-model="ytLink" placeholder="Enter Link Here" />
    <button @click="submit">Download</button>
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
        ...mapState(['title', 'isLoading', 'videoData']),
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
</style>
