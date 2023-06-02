import service from "./config.services";

const gameListService = (page) =>{
    return service.get(`/game/list/${page}`, page)
};

const gameDetailsService = (gameId) =>{
    return service.get(`/game/${gameId}/details`, gameId)
};



export {gameListService, gameDetailsService};
