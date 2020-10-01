import faker from 'faker';

import { PostgresDBConnection } from '../src/database/PostgresDBConnection';
import { PlayerDto } from '../src/model/playerDto';
import { PlayerRepository } from '../src/repository/PlayerRepository';


test('Player should be added to the DB via its repository', async () => {

     const dbConnection =  new PostgresDBConnection();
     await dbConnection.setUpConnection().then( async connection => {
            
      const playerRepository = connection.getCustomRepository(PlayerRepository);

      let aPlayer = new PlayerDto();
      aPlayer.name = `${faker.name.firstName() + ' ' + faker.name.lastName()}`;
      aPlayer.country = faker.address.countryCode();
      aPlayer.clan = faker.internet.userName();
      aPlayer.elo =  faker.random.number({ min: 1000, max: 3000});
      aPlayer.calculatedElo = faker.random.number({ min: 1000, max: 3000});
      aPlayer.averagedElo = (aPlayer.elo + aPlayer.calculatedElo) / 2;
      aPlayer.gamesPlayed = faker.random.number({ min: 0, max: 3000});
      aPlayer.gamesWon = faker.random.number({ min: 0, max: 3000});
      aPlayer.winStreak = faker.random.number({ min: 0, max: 3000});
        
      const savedPlayer = await playerRepository.save(aPlayer);
      console.log (`Player saved: ${savedPlayer.name} \n
       Country: ${savedPlayer.country} \n
       Clan: ${savedPlayer.clan} \n
       ELO: ${savedPlayer.elo} \n
       Calculated ELO: ${savedPlayer.calculatedElo} \n
       Average ELO: ${savedPlayer.averagedElo} \n
       Games played: ${savedPlayer.gamesPlayed} \n
       Games won: ${savedPlayer.gamesWon} \n
       Win streak: ${savedPlayer.winStreak} \n`);

      const playerFromDb = await playerRepository.findOne(savedPlayer.uid);

      expect(savedPlayer.name).toBe(playerFromDb?.name);
      expect(savedPlayer.country).toBe(playerFromDb?.country);
      expect(savedPlayer.clan).toBe(playerFromDb?.clan);
      expect(savedPlayer.elo.toString()).toBe(playerFromDb?.elo);
      expect(savedPlayer.calculatedElo.toString()).toBe(playerFromDb?.calculatedElo);
      expect(savedPlayer.averagedElo.toString()).toBe(playerFromDb?.averagedElo);
      expect(savedPlayer.gamesPlayed.toString()).toBe(playerFromDb?.gamesPlayed);
      expect(savedPlayer.gamesWon.toString()).toBe(playerFromDb?.gamesWon);
      expect(savedPlayer.winStreak.toString()).toBe(playerFromDb?.winStreak);

      connection.close();

     }).catch(error => console.log(error));
    
});
