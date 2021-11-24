import { createStore } from 'vuex'
import auth from './modules/auth';
import images from './modules/images';

export default createStore({
    state: {

    },
    
    modules: {
        auth,
        images
    }
})
