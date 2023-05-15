package sg.edu.nus.iss.gamelist_server.model;

import java.io.Serializable;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Game implements Serializable {
    
    private String gameName;

    public Game() {

    }

    public Game(String gameName) {
        this.gameName = gameName;
    }

    public String getGameName() {
        return gameName;
    }
    public void setGameName(String gameName) {
        this.gameName = gameName;
    }
    
    @Override
    public String toString() {
        return "Game [gameName=" + gameName + "]";
    }

    public static Game createFromDoc(Document d) {
        Game g = new Game();
        g.setGameName(d.getString("name"));

        return g;
    }

    public JsonObject toJSON() {
        return Json.createObjectBuilder()
                .add("game_name", getGameName())
                .build();
    }
    
}
