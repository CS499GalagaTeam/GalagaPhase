package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
)

type PlayerScore struct {
	Name  string
	Score int
}

type TopScores struct {
	Scores []PlayerScore
}

// update highscores <! not setup to be secure anyone can update it !>
func PutData(w http.ResponseWriter, req *http.Request) {
	if req.Method == "POST" {
		decoder := json.NewDecoder(req.Body)
		var play_score PlayerScore
		err := decoder.Decode(&play_score)
		fmt.Println("decoded")
		if err != nil {
			log.Fatal(err)
		}
		defer req.Body.Close()
		go NewHighScores(play_score)
	}
}

// function to handle updating new highscores
func NewHighScores(play_score PlayerScore) {
	scores := GetArray()
	new_scores := make([]PlayerScore, 0)
	for i, player := range scores.Scores {
		if player.Score < play_score.Score {
			new_scores = append(new_scores, play_score)
			play_score = player
		} else {
			new_scores = append(new_scores, scores.Scores[i])
		}
	}
	scores.Scores = new_scores
	WriteToFile(scores)
}

// Convinence function to write data out to file
func WriteToFile(data TopScores) {
	str := bytes.NewBufferString("")
	fmt.Println("here")
	end_num := len(data.Scores) - 1
	for i, player := range data.Scores {
		str.WriteString(strconv.Itoa(player.Score))
		fmt.Println("in loop", i)
		str.WriteString(":")
		str.WriteString(player.Name)
		if i != end_num {
			str.WriteString("\n")
		}
	}
	fmt.Println("out of loop")
	err := ioutil.WriteFile("./highscores.txt", str.Bytes(), os.FileMode(0777))
	if err != nil {
		log.Fatal(err)
	}
}

// Function to grab the highscore data from file
func GetArray() (scores TopScores) {
	scores.Scores = make([]PlayerScore, 0)
	content, err := ioutil.ReadFile("./highscores.txt")
	if err != nil {
		log.Fatal(err)
	}
	contents := bytes.Split(content, []byte("\n"))
	contents = contents[0 : len(contents)-1]
	for _, line := range contents {
		values := bytes.Split(line, []byte(":"))
		play_score, err := strconv.Atoi(string(values[0]))
		if err != nil {
			log.Fatal(err)
		}
		scores.Scores = append(scores.Scores, PlayerScore{Name: string(values[1]), Score: play_score})
	}
	return
}

// return list of highscores
func GetData(w http.ResponseWriter, req *http.Request) {
	scores := GetArray()
	encoder := json.NewEncoder(w)
	err := encoder.Encode(scores)
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	http.Handle("/", http.FileServer(http.Dir("../")))
	http.HandleFunc("/getData", GetData)
	http.HandleFunc("/putData", PutData)
	http.ListenAndServe(":8080", nil)
}
