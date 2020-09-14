import React, { useContext, useState, useEffect } from "react";
import MyContext from "../MyContext";

export default function Result() {
  const { userData, userTop } = useContext(MyContext);
  const [top, setTop] = useState([]);
  let topGenres = []
  let intersection = null

//   const intersection = array1.filter(element => array2.includes(element));



  useEffect(() => {
    setTop(userTop.items);
  }, [userTop]);

   if (top) {
   top.map((item)=>{
       topGenres.push([item.genres])
   })
   
   console.log(topGenres)
  /*   for (let i = 0; i<topGenres.length;i++) {
        for (let j = 0; j<topGenres.length; i++) {
             intersection = topGenres[i].filter(element=> topGenres[j].includes(element))
        }
    }
    console.log(intersection)
 */
   }

   
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
