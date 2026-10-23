function removeDuplicate(arr){
  let result = []
  for(i = 0; i < arr.length; i++){
    if(!result.includes(arr[i])){
      result.push(arr[i])
    }
  }
  return result
}

console.log(removeDuplicate([1,2,3,2,4,5,1]));
