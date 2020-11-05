import faker from 'faker';

import { PostgresDBConnection } from '../src/database/PostgresDBConnection';
import { PlayerDto } from '../src/model/playerDto';
import { PlayerRepository } from '../src/repository/PlayerRepository';


test('Player should be added to the DB via its repository', async () => {

     const dbConnection =  new PostgresDBConnection();
     await dbConnection.setUpConnection().then( async connection => {
            
      const playerRepository = connection.getCustomRepository(PlayerRepository);

      let aPlayer = new PlayerDto();
      aPlayer.steamId = faker.random.number({ min: 10000000000000000, max: 99999999999999999}).toString();
      aPlayer.name = `${faker.name.firstName() + ' ' + faker.name.lastName()}`;
      aPlayer.steamName = `${faker.internet.userName() + faker.random.number({ min: 100, max: 999})}`
      aPlayer.country = faker.address.countryCode();
      aPlayer.clan = faker.internet.userName();
      aPlayer.aoe2NetRating = faker.random.number({ min: 1000, max: 3000});
      aPlayer.aoeEloComRating = faker.random.number({ min: 1000, max: 3000});
      aPlayer.rating = faker.random.number({ min: 1000, max: 3000});
      aPlayer.averageRating = (aPlayer.rating + aPlayer.aoe2NetRating + aPlayer.aoeEloComRating) / 3;
      aPlayer.gamesPlayed = faker.random.number({ min: 0, max: 3000});
      aPlayer.gamesWon = faker.random.number({ min: 0, max: 3000});
      aPlayer.gamesDropped = faker.random.number({ min: 0, max: 3000});
      aPlayer.winStreak = faker.random.number({ min: 0, max: 3000});
        
      const savedPlayer = await playerRepository.save(aPlayer);
      console.log (`Player saved into DB: ${savedPlayer.name} \n
      Steam ID: ${savedPlayer.steamId} \n
      Player Name: ${savedPlayer.name} \n
      Steam Name: ${savedPlayer.steamName} \n
      Country: ${savedPlayer.country} \n
      Clan: ${savedPlayer.clan} \n
      Rating in AOE2Net: ${savedPlayer.aoe2NetRating} \n
      Rating in AoeEloCom: ${savedPlayer.aoeEloComRating} \n
      Actual Rating: ${savedPlayer.rating} \n
      Average Rating: ${savedPlayer.averageRating} \n
      Games played: ${savedPlayer.gamesPlayed} \n
      Games won: ${savedPlayer.gamesWon} \n
      Games Dropped: ${savedPlayer.gamesDropped} \n
      Win streak: ${savedPlayer.winStreak} \n`);

      const playerFromDb = await playerRepository.findOne(savedPlayer.uid);

      expect(playerFromDb?.steamId).toBe(savedPlayer.steamId.toString());
      expect(playerFromDb?.name).toBe(savedPlayer.name);
      expect(playerFromDb?.steamName).toBe(savedPlayer.steamName);
      expect(playerFromDb?.country).toBe(savedPlayer.country);
      expect(playerFromDb?.clan).toBe(savedPlayer.clan);
      expect(playerFromDb?.aoe2NetRating).toBe(savedPlayer.aoe2NetRating.toString());
      expect(playerFromDb?.aoeEloComRating).toBe(savedPlayer.aoeEloComRating.toString());
      expect(playerFromDb?.rating).toBe(savedPlayer.rating.toString());
      expect(playerFromDb?.averageRating).toBe(savedPlayer.averageRating.toString());
      expect(playerFromDb?.gamesPlayed).toBe(savedPlayer.gamesPlayed.toString());
      expect(playerFromDb?.gamesWon).toBe(savedPlayer.gamesWon.toString());
      expect(playerFromDb?.gamesDropped).toBe(savedPlayer.gamesDropped.toString());
      expect(playerFromDb?.winStreak).toBe(playerFromDb?.winStreak.toString());

      connection.close();

     }).catch(error => console.log(error));
    
});
