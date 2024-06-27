import { createStore } from 'vuex';
import { SET_LOADING, SET_TITLE, SET_VIDEO_DATA } from './mutationTypes';
import axios from 'axios';

const state = {
    title: '',
    isLoading: false,
    videoData: {},
};

const mutations = {
    [SET_TITLE](state, title) {
        state.title = title;
    },
    [SET_LOADING](state, isLoading) {
        state.isLoading = isLoading;
    },
    [SET_VIDEO_DATA](state, data) {
        state.videoData = data;
    },
};

const actions = {
    async downloadVideo({ commit, state }, data) {
        commit(SET_LOADING, true);
        try {
            await axios
                .post('/api/getTitle', {
                    link: data,
                })
                .then((response) => {
                    console.log(response);
                    commit(SET_TITLE, response.data);
                });
            await axios
                .post(
                    '/api/downloadVideo',
                    {
                        link: data,
                    },
                    {
                        responseType: 'blob',
                    },
                )
                .then((response) => {
                    console.log(response);
                    commit(SET_VIDEO_DATA, response.data);
                });
            const url = window.URL.createObjectURL(new Blob([state.videoData]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${state.title}.mp3`);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            commit(SET_TITLE, 'Invalid Url! Try a different one');
            console.log(err);
        }
        commit(SET_LOADING, false);
    },
};

export default createStore({
    namespace: true,
    state,
    mutations,
    actions,
});
