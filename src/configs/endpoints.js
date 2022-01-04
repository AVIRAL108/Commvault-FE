export let Core = {};

(function () {
    switch (process.env.REACT_APP_SERVER) {
        case 'local':
            Core = {
                'SCORE_META_API_DOMAIN': 'http://localhost:1234',
                'PREVIOUS_YEAR_API_DOMAIN': 'http://localhost:1234',
                'DOMAIN_UPLOAD': 'https://upld1.aakashdigital.com'
            };
            break;
        case 'dev': 
            Core = {
                'SCORE_META_API_DOMAIN': 'https://dev-ab.addmarks.com',
                'PREVIOUS_YEAR_API_DOMAIN': 'http://localhost:1234',
                'DOMAIN_UPLOAD': 'https://upld1.aakashdigital.com'
            };
            break;
        case 'prod':
            Core = {
                'SCORE_META_API_DOMAIN': 'https://api.aakashdigital.com',
                'PREVIOUS_YEAR_API_DOMAIN': 'http://localhost:1234',
                'DOMAIN_UPLOAD': 'https://upld1.aakashdigital.com'

            };
            break;
        case 'staging':
            Core = {
                'SCORE_META_API_DOMAIN': 'https://qa-ab.addmarks.com',     
                'PREVIOUS_YEAR_API_DOMAIN': 'http://localhost:1234',
                'DOMAIN_UPLOAD': 'https://upld1.aakashdigital.com'
            };
            break;
        default:
            break;
    }
})();

const API_VERSION  = "v1"
const Endpoints = {
    'skullcrusher': `/backend-skullcrusher/${API_VERSION}/scoremeta`,
    'previousyear': `/backend-pyp/${API_VERSION}/analysis_video_meta_info`,
    'uploadtoken': '/file/generate',
    'fileupload': '/file/upload'
}
export default Endpoints;