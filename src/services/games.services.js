import service from "./config.services";

const gameListService = (page) => {
  return service.get(`/games/list/${page}`);
};

const gameDetailsService = (gameId) =>{
    return service.get(`/games/${gameId}/details`)
};

const findAGameService = (queryValue) =>{
  return service.get(`/games/${queryValue}`)
}

export {gameListService, gameDetailsService, findAGameService};
