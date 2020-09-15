import React, { useContext, useState, useEffect } from "react";
import MyContext from "../MyContext";

export default function Result() {
  const { userData, userTop } = useContext(MyContext);
  const [top, setTop] = useState([]);
  let topGenres = []
  let topFiveGenres = []




  useEffect(() => {
    setTop(userTop.items);
  }, [userTop]);

   /* if (top) {
   top.map((item)=>{
       topGenres.push(item.genres)
   })
   
   let tmp={}
       for (let i = 0; i<topGenres.length;i++) {
          for (let j = 0; j<topGenres[i].length; j++) {
        if (!tmp[topGenres[i][j]]) {
          tmp[topGenres[i][j]] = 0;
      } 
      tmp[topGenres[i][j]]++;
  }

}

let sortable = [];
for (const genre in tmp) {
  sortable.push([genre,tmp[genre]]);
}

sortable.sort(function(a, b) {
  return a[1] - b[1];
});

sortable.reverse()


for (let i=0;i<5;i++){
  topFiveGenres.push(sortable[i])
}
console.log(topFiveGenres)



}
 */



    
   
  return (
    <div>
        <h1>hello</h1>
      {top &&
        top.map((item) => {
            return (
                <p style={{ color: "white" }}>{item.genres} </p>
            )
        })}
    </div>
  );
}
