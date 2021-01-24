import { Response, Request } from "express";
import { GameMongo } from "./Dtos/Game/GameMongo";
import { PlayedGameMongo } from "./Dtos/PlayedGame/PlayedGameMongo";
import { RentMongo } from "./Dtos/Rent/RentMongo";
import { StudioMongo } from "./Dtos/Studio/StudioMongo";
import { SubscriptionMongo } from "./Dtos/Subscription/SubscriptionMongo";
import { UserMongo } from "./Dtos/User/UserMongo";
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

    // migrate users
    let users = await userRepo.getAllUsers();
    for (let user of users) {
        await userRepoMongo.insertUser(user);
    }

    // migrate studios
    let studios = await studioRepo.getAllStudios();
    for (let studio of studios) {
        let newStudio: StudioMongo = { ...studio, games: [] };

        await studioRepoMongo.insertStudio(newStudio);
    }

    // migrate games
    let games = await gameRepo.getAllGames();
    for (let game of games) {
        let studio = studios.filter((studio) => studio.studio_id == game.studio_id)[0];

        let newGame: GameMongo = {
            game_id: game.game_id,
            genre: game.genre,
            price: game.price,
            title: game.title,
            recommended_games: [],
            studio: {
                studio_id: game.studio_id,
                name: studio?.name,
                price: studio?.price
            }
        }

        await StudioRepoMongo.addGame(game.studio_id, game.game_id, game.title);

        await gameRepoMongo.insertGame(newGame);
    }

    //migarte subscriptions
    let subs = await subscriptionRepo.getAllSubscriptions();
    for (let sub of subs) {
        let studio = studios.filter((studio) => studio.studio_id == sub.studio_id)[0];
        let newSub: SubscriptionMongo = {
            end_date: sub.end_date,
            start_date: sub.start_date,
            studio: {
                studio_id: sub.studio_id,
                name: studio?.name,
                price: studio?.price
            },
            subscription_id: sub.subscription_id,
            user_id: sub.user_id,
        }

        await subscriptionRepoMongo.insertSubscription(newSub);
    }

    //migrate rent
    let rents = await rentRepo.getAllRents();
    for (let rent of rents) {
        await rentRepoMongo.insertRent(rent);
    }

    //migrate game recs
    let gameRecs = await gameRecommendationRepo.getAllGameRecommendations();
    for (let gameRec of gameRecs) {
        await gameRecommendationRepoMongo.insertGameRecommendation(gameRec);
    }

    //migrate played games
    let playedGames = await playedGameRepo.getAllPlayedGames();
    for (let playedGame of playedGames) {
        await playedGameRepoMongo.insertPlayedGame(playedGame);
    }

    res.status(200).send("Finished");
}