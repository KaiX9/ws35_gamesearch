package sg.edu.nus.iss.gamelist_server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import sg.edu.nus.iss.gamelist_server.model.Game;
import sg.edu.nus.iss.gamelist_server.repository.BoardGameRepository;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE)
public class BoardGameController {
    
    @Autowired
    private BoardGameRepository bgRepo;

    @GetMapping(path="/games")
    public ResponseEntity<String> getBoardGames(@RequestParam Integer limit) {

        List<Game> gameList = this.bgRepo.getBoardGames(limit);

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (Game g : gameList) {
            arrBuilder.add(g.toJSON());
        }

        System.out.println(">>> List: " + gameList);

        return ResponseEntity.status(HttpStatus.OK)
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(arrBuilder.build().toString());
    }

}
