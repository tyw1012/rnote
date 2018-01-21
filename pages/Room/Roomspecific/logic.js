

function makeRoomArray(floor,roomPerFloor){
    let rooms = [];
    for (let i = 0; i < floor; i ++){
        
        for ( let j = 0; j < roomPerFloor; j ++){
            rooms.push(parseInt(`${i+1}0${j+1}`))
        }
    
    }

    return rooms
}


function chunk (arr, len) {

    var chunks = [],
        i = 0,
        n = arr.length;
  
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
  
    return chunks.sort(function(a,b){return b[0]- a[0]} )
}

 

  for ( var i = 0; i < b.length; i ++){
	c.push(...b[i])
}