import axios from 'axios';

const axiosDefault = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});
axiosDefault()

export const listPokemon = () => {
    return new Promise((resolve, reject) => {
        axiosDefault
            .get('pokemon')
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                // console.warn('axios helper', error);
                reject(error);
            });
    });
}

export function getPokemon({ url }) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(data => {
                resolve(data)
            })
    });
}



