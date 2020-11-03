useEffect(()=>{
    if (myTop20ArtistNames.length>0) {
      let artistsCreate =  myTop20ArtistNames.map((item) => {
        let result = {
          name: item,
        };
        return result;
      });
      console.log(myTop20ArtistNames);
      fetch("http://localhost:5000/artists", {
        method: "POST",
        body: JSON.stringify(artistsCreate),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.log("is empty");
    }

    if (myAllGenres.length>0) {
      let genresCreate =  myAllGenres.map((item) => {
        let result = {
          genre: item,
        };
        return result;
      });
      fetch("http://localhost:5000/genres", {
        method: "POST",
        body: JSON.stringify(genresCreate),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      console.log("is empty");
    }
  },[userToDatabase.spotifyUserID])