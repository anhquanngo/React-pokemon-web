const POKEPOKE = 'pokepoke'

const isValValid = (value) => {
    const allKeys = Object.keys(value);

    if (!(typeof value === 'object' && allKeys.length === 6)) {
        return false
    }

    const requiredKeys = [
        'name',
        'image',
        'types',
        'weight',
        'height',
        'ability',
    ];
    const doesContainAllKeys = requiredKeys.every((item) => allKeys.includes(item));
    if (!doesContainAllKeys) {
        // console.warn(
        //   'Invalid value, need keys: textTranslateFrom, textTranslateTo',
        // );
        return false;
    }
    return true;
}

const genId = () => Date.now().toString();

export const createStorePoke = async (value) => {
    if (!isValValid(value)) {
        return null;
    }
    try {
        const pokeData = await localStorage.getItem(POKEPOKE);
        const addedId = genId();

        if (pokeData === null) {
            const addedPoke = { ...value, id: addedId };
            const blankArray = [];
            blankArray.slice(0, 0, addedPoke);
            await localStorage.setItem(POKEPOKE, JSON.stringify(blankArray))
        }

        const pokeDataArr = JSON.parse(pokeData);
        const addedPoke = { id: addedId, value };
        pokeDataArr.splice(0, 0, addedPoke)
        if (pokeDataArr.length > 100) {
            pokeDataArr.pop()
        }
        await localStorage.setItem(POKEPOKE, JSON.stringify(pokeDataArr));
        return { ...addedPoke };
    } catch (error) {
        // console.warn(error);
        return null;
    }
}

export const listPoke = async () => {
    // const limit = 10;
    // const offset = 0;
    try {
        const pokeData = await localStorage.getItem(POKEPOKE);
        if (pokeData === null) {
            return [];
        }
        const pokeDataArr = JSON.parse(pokeData);
        // const slicedData = pokeDataArr.slice(offset, offset + limit);
        return pokeDataArr;
    } catch (error) {
        // console.warn(error);
        return [];
    }
};


export const listPokeLimit = async () => {
    const limit = 3;
    const offset = 0;
    try {
        const pokeData = await localStorage.getItem(POKEPOKE);
        if (pokeData === null) {
            return [];
        }
        const pokeDataArr = JSON.parse(pokeData);
        const slicedData = pokeDataArr.slice(offset, offset + limit);
        // console.log(`slide data ${JSON.stringify(slicedData)}`);
        return slicedData;
    } catch (error) {
        // console.warn(error);
        return [];
    }
};

export const removePoke = async (id) => {
    try {
        const pokeData = await localStorage.getItem(POKEPOKE);
        if (pokeData === null) {
            // console.warn('Nothing to delete');
            return null;
        }
        let pokeDataArr = JSON.parse(pokeData);
        pokeDataArr = pokeDataArr.filter((item) => item.id !== id);
        // const deletedPoke = { ...pokeDataArr[deletedID] };
        // pokeDataArr.splice(deletedID, 1);
        await localStorage.setItem(POKEPOKE, JSON.stringify(pokeDataArr));
        return true;
    } catch (error) {
        // console.warn(error);
        return null;
    }
};


export const removeAllPoke = async () => {
    try {
        await localStorage.removeItem(POKEPOKE);
        return true;
    } catch (error) {
        // console.warn(error);
        return null;
    }
};