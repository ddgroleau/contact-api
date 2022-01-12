// This is the body of the MongoDB Atlas Realm Trigger Function. 
// The function is configured to invoke on new contact insert.

export const newContact = (changeEvent) => {
    const newContact = changeEvent.fullDocument;
    fetch('https://ddgroleau-api.herokuapp.com/notification', {
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
            }).then(response => {
                console.log(response.json());
            }).catch(response => console.log(response))
}