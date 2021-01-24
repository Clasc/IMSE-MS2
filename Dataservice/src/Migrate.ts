import { Response, Request } from "express";
import { GameRecommendationRepo } from "./Repos/GameRecommendationRepo/GameRecommendationRepo";
import { GameRecommendationRepoMongo } from "./Repos/GameRecommendationRepo/GameRecommendationRepoMongo";
import { GameRepo } from "./Repos/GameRepo/GameRepo";
import { GameRepoMongo } from "./Repos/GameRepo/GameRepoMongo";
import { PlayedGameRepo } from "./Repos/PlayedGameRepo/PlayedGameRepo";
import { PlayedGameRepoMongo } from "./Repos/PlayedGameRepo/PlayedGameRepoMongo";
import { RentRepo } from "./Repos/RentRepo/RentRepo";
import { RentRepoMongo } from "./Repos/RentRepo/RentRepoMongo";
import { StudioRepo } from "./Repos/StudioRepo/StudioRepo";
import { StudioRepoMongo } from "./Repos/StudioRepo/StudioRepoMongo";
import { SubscriptionRepo } from "./Repos/SubscriptionRepo/SubscriptionRepo";
import { SubscriptionRepoMongo } from "./Repos/SubscriptionRepo/SubscriptionRepoMongo";
import { UserRepo } from "./Repos/UserRepo/UserRepo";
import { UserRepoMongo } from "./Repos/UserRepo/UserRepoMongo";

export async function migrate(req: Request, res: Response) {

    let userRepo = new UserRepo();
    let userRepoMongo = new UserRepoMongo();

    let gameRepo = new GameRepo();
    let gameRepoMongo = new GameRepoMongo();

    let studioRepo = new StudioRepo();
    let studioRepoMongo = new StudioRepoMongo();

    let gameRecommendationRepo = new GameRecommendationRepo();
    let gameRecommendationRepoMongo = new GameRecommendationRepoMongo();

    let subscriptionRepo = new SubscriptionRepo();
    let subscriptionRepoMongo = new SubscriptionRepoMongo();

    let rentRepo = new RentRepo();
    let rentRepoMongo = new RentRepoMongo();

    let playedGameRepo = new PlayedGameRepo();
    let playedGameRepoMongo = new PlayedGameRepoMongo();

    //migrate users
    let users = await userRepo.getAllUsers();
    users.forEach(async (user) => {
        user.played_games = [];
        await userRepoMongo.insertUser(user);
    });

    //migrate studios
    let studios = await studioRepo.getAllStudios();
    studios.forEach(async (studio) => {
        studio.games = [];

        await studioRepoMongo.insertStudio(studio);
    });

    //migrate games
    let games = await gameRepo.getAllGames();
    games.forEach(async (game) => {
        let studio = studios.filter((studio) => studio.studio_id == game.studio_id)[0];
        game.studio = {
            studio_id: game.studio_id,
            name: studio?.name,
            price: studio?.price
        };

        game.recommended_games = [];

        await StudioRepoMongo.addGame(game.studio_id, game.game_id, game.title);

        game.studio_id = undefined;
        await gameRepoMongo.insertGame(game);
    });

    //migrate game recs
    let gameRecs = await gameRecommendationRepo.getAllGameRecommendations();
    gameRecs.forEach(async (gameRec) => {
        await gameRecommendationRepoMongo.insertGameRecommendation(gameRec);
    });

    //migarte subscriptions
    let subs = await subscriptionRepo.getAllSubscriptions();
    subs.forEach(async (sub) => {
        let studio = studios.filter((studio) => studio.studio_id == sub.studio_id)[0];
        sub.studio = {
            studio_id: sub.studio_id,
            name: studio?.name,
            price: studio?.price
        }

        sub.studio_id = undefined;
        await subscriptionRepoMongo.insertSubscription(sub);
    });

    //migrate rent
    let rents = await rentRepo.getAllRents();
    rents.forEach(async (rent) => {
        let game = await gameRepoMongo.getGameById(rent.game_id?.toString() as string);
        rent.game_id = undefined;

        rent.game = {
            game_id: game?.game_id,
            title: game?.title,
            price: game?.price,
            studio: game?.studio
        };

        await rentRepoMongo.insertRent(rent);
    });

    //migrate played games
    let playedGames = await playedGameRepo.getAllPlayedGames();
    playedGames.forEach(async (playedGame) => {
        playedGame.played_game_id = undefined;
        let game = await gameRepoMongo.getGameById(playedGame.game_id?.toString() as string);
        playedGame.game_id = undefined;

        playedGame.game = {
            game_id: game?.game_id,
            title: game?.title
        }

        await playedGameRepoMongo.insertPlayedGame(playedGame);
    });

    res.status(200).send("Finished");
}