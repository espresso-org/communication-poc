export default async function(data, account, aragonApp) {
    return aragonApp.rpc.sendAndObserveResponses('sign', [data, account])
        .pluck('result')
        .take(1)
        .toPromise()
}