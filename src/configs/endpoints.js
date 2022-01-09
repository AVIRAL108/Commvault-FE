export let Core = {};

(function () {
    switch (process.env.REACT_APP_SERVER) {
        case 'local':
            Core = {
                'FILE_SERVER_API_DOMAIN': 'http://localhost:5000'
            };
            break;
        case 'dev': 
            Core = {
                'FILE_SERVER_API_DOMAIN': 'http://localhost:5000'
            };
            break;
        case 'prod':
            Core = {
                'FILE_SERVER_API_DOMAIN': 'http://localhost:5000'

            };
            break;
        case 'staging':
            Core = {
                'FILE_SERVER_API_DOMAIN': 'http://localhost:5000'
            };
            break;
        default:
            break;
    }
})();

const Endpoints = {
    'fileServers': `/fileServers`,
    'jobs' :  '/jobs'
}
export default Endpoints;