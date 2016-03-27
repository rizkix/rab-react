package main

import (
	"log"
	"net/http"
	"regexp"
	"rizki/rab/api/model"

	"github.com/gorilla/mux"
)

func main() {
	model.Migrate()

	user := model.User{}
	barang := model.Barang{}

	r := mux.NewRouter()
	//r.HandleFunc("/auth", auth)
	r.HandleFunc("/checkToken", user.CheckToken).Methods("POST")
	r.HandleFunc("/auth", user.Validate).Methods("POST")

	rAuth := r.PathPrefix("/api").Subrouter()

	rAuth.HandleFunc("/user/find/{id:[0-9]+}", user.Find)
	rAuth.HandleFunc("/user", user.List)
	rAuth.HandleFunc("/barang", barang.List)

	//r.Handle("/api", Middleware(rAuth))
	http.Handle("/", (Middleware(r)))
	println("Listen and serve at port 7000")
	log.Fatal(http.ListenAndServe(":7000", nil))
}

func Middleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		matched, _ := regexp.MatchString("/api/.*", r.URL.String())
		if matched {
			log.Println("middleware", r.URL)
			t := r.URL.Query().Get("token")
			println(t)
			user := model.User{}
			validToken := user.ValidateToken(string(t))
			if validToken {
				h.ServeHTTP(w, r)
			} else {
				w.Write([]byte("Invalid Token"))
			}

		} else {
			h.ServeHTTP(w, r)
		}
	})
}
