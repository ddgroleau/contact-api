
exports = async function(changeEvent) {
    const axios = require('axios').default;
    if(changeEvent.fullDocument) {
        const {contactName,contactEmail,contactCompany,contactMessage} = changeEvent.fullDocument;
        const response = await axios.post('https://ddgroleau-api.herokuapp.com/notification',{
                        contactName:contactName,
                        contactEmail:contactEmail,
                        contactCompany:contactCompany,
                        contactMessage:contactMessage,
                    }).catch(error => console.log(error));
        console.log(response.statusText);
    }
};