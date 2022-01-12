
exports = async function(changeEvent) {
    if(changeEvent.fullDocument) {
        const newContact = changeEvent.fullDocument;
        const response = await fetch('https://ddgroleau-api.herokuapp.com/notification', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contactName:newContact.contactName,
                        contactEmail:newContact.contactEmail,
                        contactCompany:newContact.contactCompany,
                        contactMesssage:newContact.contactMesssage,
                    })
                }).catch(response => console.log(response));
        console.log(response.json());
    };
};