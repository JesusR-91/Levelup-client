import service from "./config.services";

const gameListService = (page) => {
  return service.get(`/game/list/${page}`);
};

const gameDetailsService = (gameId) =>{
    return service.get(`/games/${gameId}/details`)
};

export {gameListService, gameDetailsService};
