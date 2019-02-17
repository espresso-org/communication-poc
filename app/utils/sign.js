export default async function(data, aragonApp) {
    return aragonApp
        .accounts()
        .mergeMap(accounts => aragonApp.rpc.sendAndObserveResponses('sign', [data, accounts[0]]))
        .toPromise()
}