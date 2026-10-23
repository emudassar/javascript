function isPalindrome(str){
  let rev = ""
  for(i = str.length - 1; i >= 0; i--){
    rev += str[i]
  }
  return rev === str
}
console.log(isPalindrome("madamm"));
