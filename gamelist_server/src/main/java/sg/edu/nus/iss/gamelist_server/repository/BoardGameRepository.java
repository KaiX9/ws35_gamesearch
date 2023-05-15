package sg.edu.nus.iss.gamelist_server.repository;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import sg.edu.nus.iss.gamelist_server.model.Game;

@Repository
public class BoardGameRepository {
    
    @Autowired
    MongoTemplate mongoTemplate;

    /* Example of query: 
    db.games.find({}, {name: 1})
        .sort({name: 1})
        .limit(20)
    */

    public List<Game> getBoardGames(Integer limit) {
        Query q = new Query();
        q.fields().include("name");
        q.with(Sort.by(Sort.Direction.ASC, "name"));
        q.limit(limit);

        return mongoTemplate.find(q, Document.class, "games")
                            .stream()
                            .map(d -> Game.createFromDoc(d))
                            .toList();
    }
}
