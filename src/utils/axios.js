import axios from 'axios';

const instance = axios.create({
    validateStatus: function validateStatus(status) {
        // let default_ = status >= 200 && status < 300;
        // let extra = status == 404
        // return default_ || extra

        let default_ = status >= 100 && status < 599;
        return default_;
    }
});
export default instance;
