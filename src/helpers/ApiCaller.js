import axios from 'axios'
const serverAddress = "http://localhost:8080"

class ApiCaller {
    postDist(dist) {
        return new Promise((resolve, reject) => {
            axios.post(`${serverAddress}/api/dis`, dist)
            .then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getAllDist() {
        return new Promise((resolve, reject) => {
            axios.get(`${serverAddress}/api/dis/all`)
            .then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    postNeeds(need) {
        return new Promise((resolve, reject) => {
            axios.post(`${serverAddress}/api/needs`, need)
            .then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getAllNeeds() {
        return new Promise((resolve, reject) => {
            axios.get(`${serverAddress}/api/needs/all`)
            .then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    postCamps(camp) {
        return new Promise((resolve, reject) => {
            axios.post(`${serverAddress}/api/camps`, camp)
            .then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getAllCamps() {
        return new Promise((resolve, reject) => {
            axios.get(`${serverAddress}/api/camps/all`)
            .then((response) => {
                resolve(response)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export const apiCaller = new ApiCaller()