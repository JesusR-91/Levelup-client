import service from "./config.services";

const gameListService = (page) =>{
<<<<<<< HEAD
    return service.get(`/game/list/${page}`)
};

const gameDetailsService = (gameId) =>{
    return service.get(`/game/${gameId}/details`)
=======
    return service.get(`/games/list/${page}`)
};

const gameDetailsService = (gameId) =>{
    return service.get(`/games/${gameId}/details`)
>>>>>>> b0e798b7d176730146897d4af15839bef6ad4930
};

export {gameListService, gameDetailsService};
