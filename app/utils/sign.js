export default async function(data, aragonApp) {
    const accounts = await aragonApp.accounts().toPromise()

    return app.rpc
        .sendAndObserveResponses('sign', [message, accounts[0]])
        .toPromise()
}